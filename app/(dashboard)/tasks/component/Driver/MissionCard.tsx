import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { DriversOperation, ShipmentsOperation, VehicleOperation } from "@/TDLib/tdlogistics";
// import DetailOrder from "./DetailPopup";
import { TbLocation } from "react-icons/tb";
import { MdOutlineMyLocation } from "react-icons/md";
import SubmitPopup from "@/components/submit";
import NotiPopup from "@/components/notification";
import DetailPopup from "@/components/popup";
import { FaLocationArrow, FaMapLocationDot } from "react-icons/fa6";
import DirectPopup from "../Common/DirectPopup";
// import DirectPopup from "../Shipper/DirectPopup";
const TaskCard = ({ data, toggle, keyName, reloadData }: { data: any, toggle: any, keyName: any, reloadData: any }) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [openDirect, setOpenDirect] = useState(false);
    const [userLocation, setUserLocation] = useState<any>({ latitude: null, longitude: null });
    const driverTask = new DriversOperation();
    const shipment = new VehicleOperation();
    const confirmingCompletedTaskInfo = {
        id: parseFloat(data.id)
    };
    const undertakingShipmentInfo = {
        shipment_id: data.shipment_id,
    };
    const intl = useIntl();
    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
            );
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleOpenStatus = () => {
        setMessage(intl.formatMessage({ id: 'TaskCard.ConfirmationMessage' }));
        setOpenStatus(true);
    };

    const handleSubmitTaskComplete = async () => {
        try {
            const response = await driverTask.confirmCompletedTask(confirmingCompletedTaskInfo);
            setOpenStatus(false);
            if (!!response.error || !!response.error.error) {
                setMessage(response.message || response.error.message);
                setOpenError(true);
            } else {
                reloadData()
            }
        } catch (error) {
            setMessage(intl.formatMessage({ id: 'TaskCard.ErrorMessage' }));
            setOpenError(true);
        }
    };

    const handleOpenUndertake = async () => {
        setMessage(intl.formatMessage({ id: 'TaskCard.ConfirmationMessage2' }))
        setOpenConfirm(true)
    };

    const createTime = (time: string) => {
        const moment = require('moment-timezone');
        const standardDatetime = moment(time).tz(moment.tz.guess()).format('DD/MM/YYYY HH:mm:ss');
        return standardDatetime;
    }

    const handleUndertake = async () => {
        try {
            const response = await shipment.undertakeShipment(undertakingShipmentInfo);
            setOpenConfirm(false);
            if (!!response.error || !!response.error.error) {
                setMessage(response.message || response.error.message);
                setOpenError(true);
            } else {
                reloadData()
            }
        } catch (error) {
            setMessage(intl.formatMessage({ id: 'TaskCard.ErrorMessage' }));
            setOpenError(true);
        }
    };

    return (
        <>
            {openStatus && <SubmitPopup onClose={() => { setOpenStatus(false); }} message={message} submit={handleSubmitTaskComplete} />}
            {openConfirm && <SubmitPopup onClose={() => setOpenConfirm(false)} message={message} submit={handleUndertake} />}
            {openError && <NotiPopup onClose={() => { setOpenError(false); }} message={message} />}
            {openDirect && <DirectPopup onClose={() => { setOpenDirect(false) }} dataInitial={data.shipment} toggle={toggle} />}
            {openDetail && data && <DetailPopup onClose={() => { setOpenDetail(false) }} title={intl.formatMessage({ id: "Mission.Detail.Title" })} children={
                <div className="flex flex-row gap-3 text-[#000000] dark:text-white">
                    <div className="w-54 h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info22" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info19" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info21" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info23" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info24" /></span>
                            <span className="font-semibold">:</span>
                            {" "}
                        </p>
                    </div>
                    <div className="w-full h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {data.shipment_id || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {data.shipment?.vehicle_id || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="flex flex-col sm:flex-row sm:gap-2">
                            {data.shipment?.mass || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {createTime(data.shipment?.created_at) || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {createTime(data.shipment?.last_update) || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                    </div>
                </div>
            } />}
            <motion.div
                className={`w-full rounded-lg relative bg-white dark:bg-[#242526] shadow-md font-sans`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                key={keyName}
            >

                <div className={`w-full flex flex-col text-black dark:text-white`}>
                    <div className="flex gap-2">
                        <div className="grow py-4 pl-4">
                            <div className="flex flex-col">
                                <p className="truncate font-bold text-center">{data.shipment_id}</p>
                            </div>
                            <div className="flex flex-row mt-2">
                                <p className="font-bold whitespace-nowrap"><FormattedMessage id="TaskCard.CurrentLocation" />: </p>
                                <p className="truncate pl-2">{userLocation.latitude}</p>
                            </div>
                            <div className="flex flex-row">
                                <p className="font-bold whitespace-nowrap"><FormattedMessage id="TaskCard.Latitude" />: </p>
                                <p className="truncate pl-2">{userLocation.latitude}</p>
                            </div>
                            <div className="flex flex-row">
                                <p className="font-bold whitespace-nowrap"><FormattedMessage id="TaskCard.Longitude" />: </p>
                                <p className="truncate pl-2">{userLocation.longitude}</p>
                            </div>
                        </div>
                        <div>
                            <Button className="border-black flex flex-col h-full gap-1 justify-center rounded-tr-lg" onClick={() => setOpenDirect(true)}>
                                <FaMapLocationDot className="w-5 h-5 dark:text-white text-navy-800" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex w-full h-10 rounded-b-lg border-t dark:border-[#3A3B3C] text-sm">
                        <Button className="w-1/3 h-full rounded-b-lg rounded-r-none border-r dark:border-[#3A3B3C]" onClick={() => setOpenDetail(true)}>
                            <FormattedMessage id="TaskCard.Detail" />
                        </Button>
                        <Button className="w-1/3 h-full rounded-r-none border-r dark:border-[#3A3B3C]" onClick={handleOpenUndertake}>
                            <FormattedMessage id="TaskCard.Undertake" />
                        </Button>
                        <Button className="w-1/3 h-full rounded-b-lg rounded-l-none text-green-500" onClick={handleOpenStatus}>
                            <FormattedMessage id="TaskCard.Complete" />
                        </Button>
                    </div>
                </div>
            </motion.div >
        </>

    );
};

export default TaskCard;
