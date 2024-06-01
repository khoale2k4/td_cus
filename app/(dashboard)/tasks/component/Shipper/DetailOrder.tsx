import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import DetailPopup from "@/components/popup";
import { OrdersOperation } from "@/TDLib/tdlogistics";
import { UpdatingOrderImageCondition } from "@/TDLib/tdlogistcs";
import { Button } from "@nextui-org/react";
import { CarouselSlider } from "@/components/slider";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import qr from 'qrcode';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from 'next/image'
import ImageView from "@/components/image";
import { useReactToPrint } from "react-to-print";
import PrintOrderDetails from "./PrintOrderDetail";
import { FaPen, FaPrint } from "react-icons/fa6";
import InputWithError from "./InputWError";
import { FaSave } from "react-icons/fa";
import SubmitPopup from "@/components/submit";
import NotiPopup from "@/components/notification";
interface UpdatingOrderCondition {
    order_id: string,
}

interface UpdatingOrderInfo {
    mass: number,
    height: number,
    width: number,
    length: number,
    COD: number,
    status_code: number,
}
interface DetailPopupProps {
    onClose: () => void;
    dataInitial: any;
    reloadData: () => void;
}

const DetailOrder: React.FC<DetailPopupProps> = ({ onClose, dataInitial, reloadData }) => {
    const [openError, setOpenError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const [data2, setData2] = useState({
        order_id: "",
        name_sender: "",
        detail_source: "",
        ward_source: "",
        district_source: "",
        province_source: "",
        phone_number_sender: "",
        name_receiver: "",
        detail_dest: "",
        ward_dest: "",
        district_dest: "",
        province_dest: "",
        fee: "",
        COD: "",
        mass: "",
        length: "",
        width: "",
        height: "",
        status_code: "",
        qrcode: "",
        phone_number_receiver: ""
    })
    const [data, setData] = useState({
        order_id: "",
        name_sender: "",
        detail_source: "",
        ward_source: "",
        district_source: "",
        province_source: "",
        phone_number_sender: "",
        name_receiver: "",
        detail_dest: "",
        ward_dest: "",
        district_dest: "",
        province_dest: "",
        fee: "",
        COD: "",
        mass: "",
        length: "",
        width: "",
        height: "",
        status_code: "",
        qrcode: "",
        phone_number_receiver: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrls2, setImageUrls2] = useState<string[]>([]);
    const [option, setOption] = useState<null | number>(0);
    const [reload, setReload] = useState(false)
    const [errors, setErrors] = useState({
        height: "",
        length: "",
        width: "",
        mass: "",
    });
    const [urlState, setUrlState] = useState<null | string>(null)
    const [openModal, setIsOpenModal] = useState(false)
    const intl = useIntl();
    const [qrCodeImageUrl, setQRCodeImageUrl] = useState('');
    const ordersOperation = new OrdersOperation();
    const [loading, setLoading] = useState(false)
    const handleFetchOrder = async () => {
        const response = await ordersOperation.get({ order_id: dataInitial.order_id })
        if (!response.error) {
            setData(response.data[0])
            setData2(response.data[0])
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
        const heightInput = document.getElementById("heightInput");
        if (heightInput) {
            heightInput.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const printRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Order Details",
    });

    const handleOpenImgClick = (url: any) => {
        setUrlState(url);
        setIsOpenModal(true);
    };

    const handleSaveClick = async () => {
        const tempErrors = { ...errors };
        let hasError = false;
        if (data.height === "" || data.height === "0") {
            tempErrors.height = intl.formatMessage({ id: 'Mission.Detail.Error1' });
            hasError = true;
        }
        if (data.length === "" || data.length === "0") {
            tempErrors.length = intl.formatMessage({ id: 'Mission.Detail.Error2' });
            hasError = true;
        }
        if (data.width === "" || data.width === "0") {
            tempErrors.width = intl.formatMessage({ id: 'Mission.Detail.Error3' });
            hasError = true;
        }
        if (data.mass === "" || data.mass === "0") {
            tempErrors.mass = intl.formatMessage({ id: 'Mission.Detail.Error4' });
            hasError = true;
        }

        if (hasError) {
            setErrors(tempErrors);
            return;
        } else {
            setErrors({
                height: "",
                length: "",
                width: "",
                mass: "",
            });

            if (data.COD != data2.COD || data.mass != data2.mass || data.height != data2.height ||
                data.length != data2.length || data.width != data2.width
            ) {
                setMessage(intl.formatMessage({ id: 'Mission.Detail.Alert2' }));
                setOpenConfirm(true)
            } else {
                setIsEditing(false)
            }
        }
    };

    useEffect(() => {
        handleFetchOrder()
        const fetchImages = async () => {
            try {
                const condition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "send"
                };
                const urls = await ordersOperation.getImage(condition);
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        const fetchImages2 = async () => {
            try {
                const condition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "receive"
                };
                const urls2 = await ordersOperation.getImage(condition);
                setImageUrls2(urls2);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
        fetchImages2();

    }, []);

    useEffect(() => {
        if (data.qrcode != "") {
            qr.toDataURL(data.qrcode, function (err: any, url: string) {
                if (err) {
                    console.error(err);
                    return;
                }
                setQRCodeImageUrl(url);
            });
        }
    }, [data.qrcode])

    useEffect(() => {
        if (data.height !== "" && data.height !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, height: "" }));
        }
        if (data.length !== "" && data.length !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, length: "" }));
        }
        if (data.width !== "" && data.width !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, width: "" }));
        }
        if (data.mass !== "" && data.mass !== "0") {
            setErrors(prevErrors => ({ ...prevErrors, mass: "" }));
        }
    }, [data]);

    const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setData({ ...data, [name]: value });
        }
    };

    const handleConfirmUpdate = async () => {
        let updatingOrderInfo: UpdatingOrderInfo = {
            mass: parseFloat(data.mass),
            height: parseFloat(data.height),
            width: parseFloat(data.width),
            length: parseFloat(data.length),
            COD: data.COD ? parseFloat(data.COD) : 0,
            status_code: parseFloat(data.status_code)
        };

        let updatingOrderCondition: UpdatingOrderCondition = {
            order_id: data.order_id,
        };
        setLoading(true)
        const response = await ordersOperation.update(updatingOrderInfo, updatingOrderCondition);
        setOpenConfirm(false)
        if (response.error) {
            setMessage(response.message);
            setOpenError(true)
        } else {
            setData({ ...data, order_id: "" });
            handleFetchOrder()
            setIsEditing(false);
            setReload(true)
            setMessage(intl.formatMessage({ id: 'Mission.Detail.Alert1' }));
            setOpenError(true)
        }
        setLoading(false)
    }
    return (
        <DetailPopup className="pt-0" children={
            <div className="relative flex flex-col w-full">
                {openConfirm && <SubmitPopup onClose={() => setOpenConfirm(false)} message={message} submit={handleConfirmUpdate} />}
                {openError && <NotiPopup onClose={() => { setOpenError(false); }} message={message} />}
                {openModal && <ImageView url={urlState ? urlState : ""} onClose={() => setIsOpenModal(false)} />}
                <div className="sticky top-0 w-full flex bg-white dark:bg-[#242526] mb-2 z-10">
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
                <div className="flex flex-col w-full px-2 mb-4">
                    {imageUrls && option === 0 && <div className="relative"><CarouselSlider ObjUrls={imageUrls} /></div>}
                    {imageUrls2 && option === 1 && <div className="relative"><CarouselSlider ObjUrls={imageUrls2} /></div>}
                </div>

                <div className="flex flex-row gap-3 text-[#000000] dark:text-white w-full">
                    {data.order_id != "" && !loading ? <div className="w-full">

                        <div className="flex flex-col gap-5 overflow-y-scroll no-scrollbar p-4 rounded-xl md:mr-2 mb-2 w-full">

                            <div className="flex place-items-center justify-center">
                                {qrCodeImageUrl && <Image
                                    onClick={() => handleOpenImgClick(qrCodeImageUrl)}
                                    src={qrCodeImageUrl}
                                    alt={`Qrcode`}
                                    width={10000}
                                    height={10000}
                                    className='rounded-md object-contain h-32 w-32 lg:h-40 lg:w-40'
                                />}
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info1" />:</div>
                                <div className="w-1/2 pl-2">{data.order_id}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info9" />:</div>
                                <div className="w-1/2 pl-2">{data.name_sender}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                                <div className="w-1/2 pl-2">{`${data.detail_source}, ${data.ward_source}, ${data.district_source}, ${data.province_source}`}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info10" />:</div>
                                <div className="w-1/2 pl-2">{data.phone_number_sender}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info11" />:</div>
                                <div className="w-1/2 pl-2">{data.name_receiver}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info3" />:</div>
                                <div className="w-1/2 pl-2">{`${data.detail_dest}, ${data.ward_dest}, ${data.district_dest}, ${data.province_dest}`}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info12" />:</div>
                                <div className="w-1/2 pl-2">{data.phone_number_receiver}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info13" />:</div>
                                <div className="w-1/2 pl-2">{parseFloat(data.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            </div>
                            {!isEditing ? (
                                <div className="flex">
                                    <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info4" />:</div>
                                    <div className="w-1/2 pl-2">{parseFloat(data.COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                            ) :
                                <InputWithError id="COD" error={""} label={intl.formatMessage({ id: "Mission.Detail.Info4" })} onChange={handleNumericInputChange} value={data.COD} />
                            }
                            {!isEditing ? (
                                <div className="flex">
                                    <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info5" />:</div>
                                    <div className="w-1/2 pl-2">{data.mass}</div>
                                </div>
                            ) :
                                <InputWithError id="mass" error={errors.mass} label={intl.formatMessage({ id: "Mission.Detail.Info5" })} onChange={handleNumericInputChange} value={data.mass} />
                            }
                            {!isEditing ? (
                                <div className="flex">
                                    <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info6" />:</div>
                                    <div className="w-1/2 pl-2">{data.length}</div>
                                </div>
                            ) :
                                <InputWithError id="length" error={errors.length} label={intl.formatMessage({ id: "Mission.Detail.Info6" })} onChange={handleNumericInputChange} value={data.length} />
                            }
                            {!isEditing ? (
                                <div className="flex">
                                    <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info7" />:</div>
                                    <div className="w-1/2 pl-2">{data.width}</div>
                                </div>
                            ) :
                                <InputWithError id="width" error={errors.width} label={intl.formatMessage({ id: "Mission.Detail.Info7" })} onChange={handleNumericInputChange} value={data.width} />
                            }
                            {!isEditing ? (
                                <div className="flex" id="heightInput">
                                    <div className="w-1/2 font-bold text-base"><FormattedMessage id="Mission.Detail.Info8" />:</div>
                                    <div className="w-1/2 pl-2">{data.height}</div>
                                </div>
                            ) :
                                <InputWithError id="height" error={errors.height} label={intl.formatMessage({ id: "Mission.Detail.Info8" })} onChange={handleNumericInputChange} value={data.height} />
                            }
                        </div>
                        <div className="w-full sm:h-4"></div>
                    </div> : <div className="h-full w-full rounded-xl min-h-[250px] flex justify-center place-items-center">
                        <svg aria-hidden="true" className="w-14 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>}
                </div>
                <div style={{ display: "none" }}>
                    <PrintOrderDetails ref={printRef} data={data} qrCodeImageUrl={qrCodeImageUrl} />
                </div>
                <div className="w-full flex sticky bottom-0 bg-white dark:bg-[#242526] pt-2 gap-2">
                    <Button
                        onClick={handlePrint}
                        className="rounded-lg py-1.5 sm:py-2 text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                    >
                        <FaPrint />
                    </Button>
                    <Button
                        onClick={!isEditing ? handleEditClick : handleSaveClick}
                        className="w-full rounded-lg py-1.5 sm:py-2 text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
                    >
                        {!isEditing ?
                            <>
                                <FaPen />
                                <span>
                                    <FormattedMessage id="Mission.Detail.Button1" />
                                </span>
                            </> :
                            <>
                                <FaSave />
                                <span>
                                    <FormattedMessage id="Mission.Detail.Button2" />
                                </span>
                            </>}
                    </Button>
                </div>
            </div>} onClose={reload ? reloadData : onClose} title={intl.formatMessage({ id: "Mission.Detail.Info18" })} />

    );
};

export default DetailOrder;