import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DetailPopup from "@/components/popup";
import JourneyTimeline from "./Timeline";
import { OrdersOperation } from "@/TDLib/main";
import { Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Polyline, useJsApiLoader } from "@react-google-maps/api";

interface DetailOrderProps {
    onClose: () => void;
    dataInitial: any;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
    const intl = useIntl()
    const orderOperation = new OrdersOperation();
    const [showMap, setShowMap] = useState(false);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    });
    const [coordinates, setCoordinates] = useState<{ lat: number, lng: number }[]>([]);
    useEffect(() => {
        const handleFetchData = async () => {
            const token = localStorage.getItem('token') ?? "";
            const response = await orderOperation.getOrderJourney(dataInitial.id, token);
            console.log(response.data);
        };
        handleFetchData();
    }, []);
    useEffect(() => {
        const handleFetchData = async () => {
            const token = localStorage.getItem("token") ?? "";
            const response = await orderOperation.getOrderJourney(dataInitial.id, token);
            console.log(response.data);
            if (!response.error && response.data) {
                const parsedCoordinates = response.data.map((point: any) => ({
                    lat: point[0],
                    lng: point[1]
                }));
                setCoordinates(parsedCoordinates);
            }
        };
        handleFetchData();
    }, [dataInitial.id]);
    console.log(dataInitial)
    const parseJourney = [...dataInitial.journies].reverse().map((item: any) => {
        return { time: new Date(item.time).toLocaleString(), title: item.message };
    });

    return (
        <DetailPopup className2="sm:w-fit" children={
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <JourneyTimeline journey={parseJourney} />
                <div className="w-full text-[#4b4b4b] dark:text-white">
                    <div className="flex flex-col gap-2">
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.NameSender" /></strong>
                                :</div> {dataInitial.nameSender}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.PhoneNumSender" /></strong>
                                :</div> {dataInitial.phoneNumberSender}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.NameReceiver" /></strong>
                                :</div> {dataInitial.nameReceiver}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.PhoneNumReceiver" /></strong>
                                :</div> {dataInitial.phoneNumberReceiver}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.SenderAddr" /></strong>
                                :</div> {`${dataInitial.detailSource}, ${dataInitial.wardSource}, ${dataInitial.districtSource}, ${dataInitial.provinceSource}`}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.ReceiverAddr" /></strong>
                                :</div> {`${dataInitial.detailDest}, ${dataInitial.wardDest}, ${dataInitial.districtDest}, ${dataInitial.provinceDest}`}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.Mass" /></strong>
                                :</div> {dataInitial.mass}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.Height" /></strong>
                                :</div> {dataInitial.height}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.Width" /></strong>
                                :</div> {dataInitial.width}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.Length" /></strong>
                                :</div> {dataInitial.length}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.COD" /></strong>
                                :</div> {dataInitial.cod}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong><FormattedMessage id="History.ServiceType" /></strong>
                                :</div>
                            {dataInitial.serviceType === "CPN" ?
                                intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' })
                                : dataInitial.serviceType === "TTk" ?
                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' })
                                    :
                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="w-full text-[#4b4b4b] dark:text-white">
                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={() => setShowMap(!showMap)}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            >
                                {showMap ? intl.formatMessage({ id: "History.HideMap" }) : intl.formatMessage({ id: "History.ShowMap" })}
                            </Button>
                            {showMap && isLoaded && (
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "400px" }}
                                    center={coordinates.length > 0 ? coordinates[0] : { lat: 0, lng: 0 }}
                                    zoom={12}
                                >
                                    {coordinates.length > 1 && (
                                        <Polyline
                                            path={coordinates}
                                            options={{
                                                strokeColor: "#FF0000",
                                                strokeOpacity: 0.8,
                                                strokeWeight: 4,
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            } 
            onClose={onClose} title={intl.formatMessage({ id: "History.Detail.Title" })} />
    );
};

export default DetailOrder;
