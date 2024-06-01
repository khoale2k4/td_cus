import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { FormattedMessage, useIntl } from "react-intl";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import DetailPopup from "@/components/popup";


interface DirectPopupProps {
    onClose: () => void;
    dataInitial: any;
    toggle: () => void;
}

const DirectPopup: React.FC<DirectPopupProps> = ({ onClose, dataInitial, toggle }) => {
    const [option, setOption] = useState("source");
    //@ts-ignore
    const { source, setSource } = useContext(SourceContext);
    //@ts-ignore
    const { destination, setDestination } = useContext(DestinationContext);
    const intl = useIntl()
    const handleSubmitClick = () => {
        toggle();
        if (option == "source") {
            myLocation()
            if (dataInitial.lat_source && dataInitial.long_source) {
                setDestination({
                    lat: dataInitial.lat_source,
                    lng: dataInitial.long_source,
                    label: `${dataInitial.detail_source}, ${dataInitial.ward_source}, ${dataInitial.district_source}, ${dataInitial.province_source}`,
                    name: `${dataInitial.detail_source}, ${dataInitial.ward_source}, ${dataInitial.district_source}, ${dataInitial.province_source}`
                })
            } else setDestination(null)
        } else if (option == "destination") {
            myLocation()
            if (dataInitial.lat_destination && dataInitial.long_destination) {
                setDestination({
                    lat: dataInitial.lat_destination,
                    lng: dataInitial.long_destination,
                    label: `${dataInitial.detail_dest}, ${dataInitial.ward_dest}, ${dataInitial.district_dest}, ${dataInitial.province_dest}`,
                    name: `${dataInitial.detail_dest}, ${dataInitial.ward_dest}, ${dataInitial.district_dest}, ${dataInitial.province_dest}`
                })
            } else setDestination(null)
        }
        onClose();
    };


    const myLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setSource({
                        lat: latitude,
                        lng: longitude,
                        label: intl.formatMessage({ id: "TaskCard.CurrentLocation" }),
                        name: intl.formatMessage({ id: "TaskCard.CurrentLocation" })
                    })
                },
                (error) => {
                    console.error("Error getting current position:", error);
                }
            );
        }
    };

    const handleDirect = (type: string) => {
        setOption(type)
    };

    return (
        <DetailPopup children={<>
            <div className="grow relative flex flex-col bg-clip-border w-full rounded-sm gap-1">
                <div className="w-full px-10 flex flex-col gap-2">
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2 " onClick={() => handleDirect("source")}>
                        <span className="pr-2 text-sm sm:text-base font-semibold font-sans"><FormattedMessage id="Mission.Direct.Option1" /></span>
                        {option === "source" ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                    <Button className="w-full rounded-xl flex flex-row justify-between p-2 " onClick={() => handleDirect("destination")}>
                        <span className="pr-2 text-sm sm:text-base font-semibold font-sans"><FormattedMessage id="Mission.Direct.Option2" /></span>
                        {option === "destination" ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                    </Button>
                </div>
            </div>

            <div className="w-full flex h-14 sm:h-[60px]">
                <Button
                    className="w-full rounded-lg mt-4 sm:mt-4 py-1.5 sm:py-2 text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                    onClick={handleSubmitClick}
                >
                    <span><FormattedMessage id="Mission.Direct.Button" /></span>
                </Button>
            </div>
        </>} onClose={onClose} title={intl.formatMessage({ id: "TaskCard.Direction" })} />

    );
};

export default DirectPopup;