import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from "react-intl";
import { OrdersOperation, ShippersOperation } from "@/TDLib/tdlogistics";
import SubmitPopup from "@/components/submit";
import NotiPopup from "@/components/notification";
import { FaMapLocationDot } from "react-icons/fa6";
import DirectPopup from "../Common/DirectPopup";
import DetailPopup from "@/components/popup";
import SignaturePad from "./SignaturePad";
import Dropzone, { FileWithPreview } from "./Dropzone";
import { UpdatingOrderImageCondition } from "@/TDLib/tdlogistcs";
import DetailOrder from "./DetailOrder";
const MissionCard = ({ data, toggle, keyName, reloadData }: { data: any, toggle: any, keyName: any, reloadData: any }) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [message, setMessage] = useState("");
    const [openDirect, setOpenDirect] = useState(false);
    const [openSign, setOpenSign] = useState(false);
    const [savedSignature, setSavedSignature] = useState<Blob | null>(null);
    const shipper = new ShippersOperation();
    const [option, setOption] = useState(0)
    const [openConfirm, setOpenConfirm] = useState(false)
    const ordersOperation = new OrdersOperation();
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [openImg, setOpenImg] = useState(false);

    const confirmingCompletedTaskInfo = {
        id: parseFloat(data.id)
    };
    const intl = useIntl();

    const handleOpenStatus = () => {
        setMessage(intl.formatMessage({ id: 'TaskCard.ConfirmationMessage' }));
        setOpenStatus(true);
    };

    const handleSubmitTaskComplete = async () => {
        try {
            const response = await shipper.confirmCompletedTask(confirmingCompletedTaskInfo);
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

    const createTime = (time: string) => {
        const moment = require('moment-timezone');
        const standardDatetime = moment(time).tz(moment.tz.guess()).format('DD/MM/YYYY HH:mm:ss');
        return standardDatetime;
    }

    const handleSendSignature = async () => {
        const confirmingUpdateTaskInfo = {
            order_id: data.order_id,
            type: option !== 1 ? "send" : "receive"
        };
        const imageData = { signature: savedSignature };
        const response = await ordersOperation.updateSignature(imageData, confirmingUpdateTaskInfo);
        setOpenConfirm(false)
        if (response.error || response.error.error) {
            setMessage(intl.formatMessage({ id: 'TaskCard.ErrorMessage' }));
            setOpenError(true)
        } else {
            setMessage(intl.formatMessage({ id: 'Mission.Detail.Alert5' }))
            setOpenError(true)
        }
    }

    const handleSubmitClick = () => {
        if (openSign) {
            if (savedSignature) {
                setMessage(intl.formatMessage({ id: 'Mission.Signature.Confirm' }));
                setOpenConfirm(true);
            } else {
                setMessage(intl.formatMessage({ id: 'Mission.Signature.Add' }));
                setOpenError(true);
            }
        }
        else if (openImg) {
            if (files.length != 0) {
                setMessage(intl.formatMessage({ id: 'Mission.Img.Confirm' }));
                setOpenConfirm(true);
            } else {
                setMessage(intl.formatMessage({ id: 'Mission.Img.Add' }));
                setOpenError(true);
            }
        }
    };

    const handleSubmitImg = async () => {

        if (!files) {
            setMessage(intl.formatMessage({ id: "Mission.Detail.Alert4" }));
            setOpenError(true)
            return;
        }
        let updatingOrderCondition: UpdatingOrderImageCondition = {
            order_id: data.order_id,
            type: option == 1 ? "send" : "receive",
        };

        let updatingOrderInfo = {
            files: files
        }

        try {
            const result = await ordersOperation.updateImage(updatingOrderInfo, updatingOrderCondition);
            console.log(result.error)
            if (!!result.error || !!result.error.error) {
                setMessage(result.message || result.error.message)
                setOpenConfirm(false)
                setOpenError(true)
            } else {
                setMessage(intl.formatMessage({ id: "Mission.Detail.Alert3" }))
                setOpenConfirm(false)
                setOpenError(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <>
            {openConfirm && <SubmitPopup onClose={() => { setOpenConfirm(false); }} message={message} submit={openSign ? handleSendSignature : (openImg ? handleSubmitImg : () => { })} />}
            {openStatus && <SubmitPopup onClose={() => { setOpenStatus(false); }} message={message} submit={handleSubmitTaskComplete} />}
            {openError && <NotiPopup onClose={() => { setOpenError(false); }} message={message} />}
            {openDirect && <DirectPopup onClose={() => { setOpenDirect(false) }} dataInitial={data.order} toggle={toggle} />}
            {openDetail && <DetailOrder onClose={() => setOpenDetail(false)} dataInitial={data} reloadData={reloadData} />}
            {openSign && <DetailPopup onClose={() => { setOpenSign(false); setOption(0); setSavedSignature(null) }} className="pt-0" title={intl.formatMessage({ id: "Mission.Signature.Title" })} children={
                <div className="relative flex flex-col rounded-b-3xl">
                    <div className="sticky top-0 w-full flex bg-white dark:bg-[#242526] mb-2">
                        <Button className={`w-full flex flex-row p-2 ${option === 0 ? "text-red-500 font-semibold" : "text-black"}`} onClick={() => setOption(0)}>
                            <span className="text-sm sm:text-base"><FormattedMessage id="Mission.Pickup" /></span>
                        </Button>
                        <Button className={`w-full flex flex-row p-2 ${option === 1 ? "text-red-500 font-semibold" : "text-black"}`} onClick={() => setOption(1)}>
                            <span className="text-sm sm:text-base"><FormattedMessage id="Mission.Receive" /></span>
                        </Button>
                        <motion.div
                            className={`w-1/2 bg-red-500 bottom-0 h-[2px] ${option === 1 ? "right-0" : "left-0"} absolute`}
                            initial={{ width: 0 }}
                            animate={{ width: "50%" }}
                            exit={{ width: 0 }}
                            transition={{ duration: 0.3 }}
                            variants={{
                                left: { width: "50%", left: 0, right: "auto" },
                                right: { width: "50%", left: "auto", right: 0 }
                            }}
                            //@ts-ignore
                            initial="left"
                            animate={option === 1 ? "right" : "left"}
                            exit="left"
                        />
                    </div>
                    <SignaturePad savedSignature={savedSignature} setSavedSignature={setSavedSignature} />
                    <div className="w-full flex sticky bottom-0 bg-white dark:bg-[#242526] pt-2">
                        <Button
                            onClick={handleSubmitClick}
                            className="w-full rounded-lg py-1.5 sm:py-2 text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                        >
                            <span><FormattedMessage id="Mission.Direct.Button" /></span>
                        </Button>
                    </div>
                </div>

            } />}
            {openImg && <DetailPopup onClose={() => { setOpenImg(false); setOption(0); setFiles([]) }} className="pt-0" title={intl.formatMessage({ id: "TaskCard.Img" })} children={
                <div className="relative flex flex-col rounded-b-3xl">
                    <div className="sticky top-0 w-full flex bg-white dark:bg-[#242526] mb-2">
                        <Button className={`w-full flex flex-row p-2 ${option === 0 ? "text-red-500 font-semibold" : "text-black"}`} onClick={() => setOption(0)}>
                            <span className="text-sm sm:text-base"><FormattedMessage id="Mission.Pickup" /></span>
                        </Button>
                        <Button className={`w-full flex flex-row p-2 ${option === 1 ? "text-red-500 font-semibold" : "text-black"}`} onClick={() => setOption(1)}>
                            <span className="text-sm sm:text-base"><FormattedMessage id="Mission.Receive" /></span>
                        </Button>
                        <motion.div
                            className={`w-1/2 bg-red-500 bottom-0 h-[2px] ${option === 1 ? "right-0" : "left-0"} absolute`}
                            initial={{ width: 0 }}
                            animate={{ width: "50%" }}
                            exit={{ width: 0 }}
                            transition={{ duration: 0.3 }}
                            variants={{
                                left: { width: "50%", left: 0, right: "auto" },
                                right: { width: "50%", left: "auto", right: 0 }
                            }}
                            //@ts-ignore
                            initial="left"
                            animate={option === 1 ? "right" : "left"}
                            exit="left"
                        />
                    </div>
                    <Dropzone files={files} setFiles={setFiles} className="px-4 mt-4" />
                    <div className="w-full flex sticky bottom-0 bg-white dark:bg-[#242526] pt-2">
                        <Button
                            onClick={handleSubmitClick}
                            className="w-full rounded-lg py-1.5 sm:py-2 text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                        >
                            <span><FormattedMessage id="Mission.Direct.Button" /></span>
                        </Button>
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
                                <p className="truncate font-bold text-center">{data.order_id}</p>
                            </div>
                            <div className="flex flex-col mt-2">
                                <p className="font-bold whitespace-nowrap"><FormattedMessage id="Mission.Detail.Info25" />: </p>
                                <p className="line-clamp-1">{`${data.order.detail_source}, ${data.order.ward_source}, ${data.order.district_source}, ${data.order.province_source}`}</p>
                            </div>
                            <div className="flex flex-col mt-1">
                                <p className="font-bold whitespace-nowrap"><FormattedMessage id="Mission.Detail.Info26" />: </p>
                                <p className="line-clamp-1">{`${data.order.detail_dest}, ${data.order.ward_dest}, ${data.order.district_dest}, ${data.order.province_dest}`}</p>
                            </div>
                        </div>
                        <div>
                            <Button className="border-black flex flex-col h-full gap-1 justify-center rounded-tr-lg" onClick={() => setOpenDirect(true)}>
                                <FaMapLocationDot className="w-5 h-5 dark:text-white text-navy-800" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex w-full h-10 rounded-b-lg border-t dark:border-[#3A3B3C] text-sm">
                        <Button className="w-1/2 h-full border-r dark:border-[#3A3B3C]" onClick={() => setOpenDetail(true)}>
                            <FormattedMessage id="TaskCard.Detail" />
                        </Button>
                        <Button className="w-1/2 h-full border-r dark:border-[#3A3B3C]" onClick={() => setOpenSign(true)}>
                            <FormattedMessage id="TaskCard.Sign" />
                        </Button>
                        <Button className="w-1/2 h-full" onClick={() => setOpenImg(true)}>
                            <FormattedMessage id="TaskCard.Img" />
                        </Button>
                    </div>
                    <div className="flex w-full h-10 rounded-b-lg border-t dark:border-[#3A3B3C] text-sm">
                        <Button className="w-full h-full rounded-b-lg rounded-l-none text-green-500" onClick={handleOpenStatus}>
                            <FormattedMessage id="TaskCard.Complete" />
                        </Button>
                    </div>
                </div>
            </motion.div >
        </>

    );
};

export default MissionCard;
