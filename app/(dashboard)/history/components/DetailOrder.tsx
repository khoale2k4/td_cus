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
    const [shipper, setShipper] = useState<{id: string, fullname: string, phoneNumber: string} | null>(null);
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

    const fetchShipper = async () => {
        const token = localStorage.getItem('token');
        if(!token) return;
        const response = await orderOperation.getShipperWhoTakenOrder(dataInitial.id, token);
        console.log(response);
        if(response.success) {
            setShipper(response.data)
        }
    }

    const getAdditionServices = ({ door, gift, bulky }: { door: boolean, gift: boolean, bulky: boolean }) => {
        const services = [];
        if (door) services.push(intl.formatMessage({ id: "History.DoorToDoor" }));
        if (gift) services.push(intl.formatMessage({ id: "History.GiftOrder" }));
        if (bulky) services.push(intl.formatMessage({ id: "History.Bulky" }));
        return services.join(' + ');
    }

    const getTitle = (id: string) => {
        return (<strong style={{ color: "red" }}><FormattedMessage id={id} />:</strong>);
    }

    const getDetail = (id: string, data: string | null) => {
        return (
            <div className='flex gap-2'>
                <div className='w-32 min-w-[128px] flex justify-between'>
                    <strong><FormattedMessage id={id} /></strong>
                    :</div> {data ?? intl.formatMessage({ id: "Login.Message15" })}</div>
        );
    }

    const getDivider = ({ vertical = false }: { vertical: boolean }) => {
        if (vertical) {
            return (<div className="w-full h-px bg-gray-300 dark:bg-gray-600 my-4"></div>);
        } else {
            return (<div className="w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>);
        }
    }

    useEffect(()=>{
        fetchShipper();
    }, [])

    return (
        <DetailPopup className2="sm:w-fit" children={
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <JourneyTimeline journey={parseJourney} />
                <div className="w-full text-[#4b4b4b] dark:text-white">
                    <div className="flex flex-row w-full">
                        <div className="flex flex-1 flex-col gap-2">
                            {getDetail("History.TrackingNumber", dataInitial.trackingNumber)}
                            {getDetail("History.ID", dataInitial.id)}
                            {getDetail("History.createdAt", new Date(dataInitial.createdAt).toLocaleString())}
                            {getDetail("History.status", dataInitial.statusCode)}
                            {getDetail("History.ServiceType",
                                dataInitial.serviceType === "CPN" ?
                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' })
                                    : dataInitial.serviceType === "TTk" ?
                                        intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' })
                                        :
                                        intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' })
                            )}
                            {getDetail("History.additionServices", getAdditionServices({ bulky: dataInitial.isBulkyGood, door: dataInitial.deliverDoorToDoor, gift: dataInitial.giftOrder }))}

                            {getDivider({ vertical: true })}
                            {getTitle("History.Detail.Sender")}
                            {getDetail("History.NameSender", dataInitial.nameSender)}
                            {getDetail("History.PhoneNumSender", dataInitial.phoneNumberSender)}
                            {getDetail("History.SenderAddr", `${dataInitial.detailSource}, ${dataInitial.wardSource}, ${dataInitial.districtSource}, ${dataInitial.provinceSource}`)}
                            {getDivider({ vertical: true })}
                            {getTitle("History.Detail.Receiver")}
                            {getDetail("History.NameReceiver", dataInitial.nameReceiver)}
                            {getDetail("History.PhoneNumReceiver", dataInitial.phoneNumberReceiver)}
                            {getDetail("History.ReceiverAddr", `${dataInitial.detailDest}, ${dataInitial.wardDest}, ${dataInitial.districtDest}, ${dataInitial.provinceDest}`)}
                        </div>
                        {getDivider({ vertical: false })}
                        <div className="flex flex-1 flex-col gap-2">
                            {getTitle("History.Detail.FeeAndCost")}
                            {getDetail("History.Detail.ReceiverPay", dataInitial.receiverWillPay ? intl.formatMessage({ id: "History.Detail.ReceiverPay"}): intl.formatMessage({ id: "History.Detail.SenderPay"}))}
                            {getDetail("History.Detail.Paid", dataInitial.paid ? intl.formatMessage({ id: "History.Detail.Paid"}): intl.formatMessage({ id: "History.Detail.UnPaid"}))}
                            {/* {getDetail("History.Detail.Fee", ((dataInitial.fee - dataInitial.cod) < 0 ? 0 : dataInitial.fee - dataInitial.cod).toString())} */}
                            {getDetail("History.COD", dataInitial.cod)}
                            {getDetail("History.Detail.Fee", dataInitial.fee ?? 0)}

                            {getDivider({ vertical: true })}
                            {getTitle("History.Detail.OrderDetail")}
                            {getDetail("History.Mass", dataInitial.mass ?? `${dataInitial.fromMass} - ${dataInitial.toMass} (g)`)}
                            {getDetail("History.Size", `${dataInitial.width}x${dataInitial.height}x${dataInitial.length} (cm)`)}
                            {getDetail("History.Value", dataInitial.value)}
                            {getDetail("History.GoodType", dataInitial.goodType)}

                            {getDivider({ vertical: true })}
                            {getTitle("History.Detail.Note")}
                            {getDetail("History.Note", dataInitial.note)}

                            {getDivider({ vertical: true })}
                            {getTitle("History.Detail.Shipper")}
                            {!shipper ? (
                                getDetail("History.Shipper", null)
                            ) : (
                                <>
                                    {getDetail("History.ShipperName", shipper.fullname)}
                                    {getDetail("History.ShipperPhone", shipper.phoneNumber)}
                                    {/* {getDetail("History.ShipperID", shipper.id)} */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        }
            onClose={onClose} title={intl.formatMessage({ id: "History.Detail.Title" })} />
    );

    {/* <div className="flex flex-col md:flex-row gap-4 md:gap-8">
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
    </div> */}
};

export default DetailOrder;
