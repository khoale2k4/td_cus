'use client'
import { QRCodeCanvas } from "qrcode.react";
import React, { useState, useEffect, useContext } from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaRegCheckCircle } from "react-icons/fa";
import { useCollapseContext } from '../context/CollapseContext';
import { PassDataContext, usePassDataContext } from '@/providers/PassedData';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { FormattedMessage, useIntl } from 'react-intl';
import SearchBox from './LocationForm';
import { AdministrativeOperation, CargoInsuranceOperation, GiftOrderTopicOperation, MapOperation, OrdersOperation, ShippingBillOperation } from '@/TDLib/main'; // Import AdministrativeOperation
import { Variants, motion } from 'framer-motion';
import NotiPopup from '@/components/notification';
import DetailForm from './DetailForm';
import Image from 'next/image';
import SubmitPopup from '@/components/submit';
import { useSourceContext } from '../context/SourceContext';
import { useDestinationContext } from '../context/DestinationContext';
import Switch from '@/components/switch';
import VoucherPopup from './VoucherPopup';

interface PersonalInfo {
    name: string;
    phoneNumber: string;
    detailAddress: string;
    selectedWard: string;
    selectedDistrict: string;
    selectedProvince: string;
}

const AddPanel: React.FC = () => {
    const { passData, setPassData } = usePassDataContext()
    const { isCollapsed, setIsCollapsed } = useCollapseContext();
    const [sourceInfo, setSourceInfo] = useState<PersonalInfo>({
        name: '',
        phoneNumber: '',
        detailAddress: '',
        // selectedWard: 'Thành phố Hồ Chí Minh',
        // selectedDistrict: 'Thành phố Thủ Đức',
        // selectedProvince: 'Phường Linh Trung',
        selectedWard: '',
        selectedDistrict: '',
        selectedProvince: '',
    });
    const [destinationInfo, setDestinationInfo] = useState<PersonalInfo>({
        name: '',
        phoneNumber: '',
        detailAddress: '',
        selectedWard: '',
        selectedDistrict: '',
        selectedProvince: '',
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [currentForm, setCurrentForm] = useState<number>(0);
    const [districts2, setDistricts2] = useState([]);
    const [wards2, setWards2] = useState([]);
    const [message, setMessage] = useState("")
    const [openError, setOpenError] = useState(false)
    const [openSubmit, setOpenSubmit] = useState(false)
    const adminOperation = new AdministrativeOperation();
    const orderOperation = new OrdersOperation();
    const shippingBillOperation = new ShippingBillOperation();
    const cargoInsuranceOperation = new CargoInsuranceOperation();
    const [fee, setFee] = useState<any>(null)
    const { source, setSource } = useSourceContext()
    const { destination, setDestination } = useDestinationContext();
    const [qrCode, setQrCode] = useState<string>("");
    const [formData, setFormData] = useState({
        selectedOption: 0,
        length: 1,
        width: 1,
        height: 1,
        mass: 1,
        COD: 10000,
        paymentMethod: 0
    });
    const [voucherId, setVoucherId] = useState<string | null>(null);
    const [openVoucher, setOpenVoucher] = useState(false);
    const [additionData, setAdditionData] = useState({
        insurance: false,
        doorToDoor: false,
        gift: false,
        receiverWillPay: false,
        isBulkyGood: false,
    });
    const [giftData, setGiftData] = useState({
        id: "",
        name: "",
    });
    const [insuranceData, setInsuranceData] = useState({
        companyName: "",
        companyAddress: "",
        companyPhone: "",
        companyEmail: "",
        companyTaxCode: ""
    });

    const [images, setImages] = useState<File[]>([]);

    const [firstLoad, setFirstLoad] = useState(true)
    const [loading, setLoading] = useState(false)
    const intl = useIntl()

    const handleFormDataChange = (newData: any) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    const handleAdditionDataChange = (newData: any) => {
        setAdditionData((prevData) => ({ ...prevData, ...newData }));
    };

    const handleGiftDataChange = (newData: any) => {
        setGiftData((prevData) => ({ ...prevData, ...newData }));
    }

    const handleInsuranceDataChange = (newData: any) => {
        setInsuranceData((prevData) => ({ ...prevData, ...newData }));
    }

    const handleImagesChange = (newData: any) => {
        setImages([...images, newData]);
    }

    const fetchProvinces = async () => {
        const response = await adminOperation.get({});
        setProvinces(response.data);
    };

    const fetchDistricts = async (province: string) => {
        const response = await adminOperation.get({ province: province });
        setDistricts(response.data);
        setSourceInfo({ ...sourceInfo, selectedWard: '', selectedDistrict: '', selectedProvince: province })
    };

    const fetchDistricts2 = async (province: string) => {
        const response = await adminOperation.get({ province: province });
        setDistricts2(response.data);
        setDestinationInfo({ ...destinationInfo, selectedWard: '', selectedDistrict: '', selectedProvince: province })
    };

    const fetchWards = async (province: string, district: string) => {
        const response = await adminOperation.get({ province: province, district: district });
        setWards(response.data);
        setSourceInfo({ ...sourceInfo, selectedWard: '', selectedDistrict: district, selectedProvince: province })
    };

    const fetchWards2 = async (province: string, district: string) => {
        const response = await adminOperation.get({ province: province, district: district });
        setWards2(response.data);
        setDestinationInfo({ ...destinationInfo, selectedWard: '', selectedDistrict: district, selectedProvince: province })
    };


    useEffect(() => {
        fetchProvinces();
        setIsCollapsed(false);
        return () => {
            setIsCollapsed(true);
        };
    }, []);


    useEffect(() => {
        console.log("passData add", passData);
        if (passData && firstLoad) {
            setSourceInfo({
                name: passData.firstName ? passData.firstName + " " + passData.lastName : "",
                detailAddress: passData.detailAddress ? passData.detailAddress : "",
                selectedDistrict: passData.district ? passData.district : "",
                phoneNumber: passData.phoneNumber ? passData.phoneNumber : "",
                selectedProvince: passData.province ? passData.province : "",
                selectedWard: passData.ward ? passData.ward : passData.town ? passData.town : ""
            })
            setFirstLoad(false)
        }
    }, [passData]);

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSourceChange = (field: keyof PersonalInfo, value: any) => {
        setSourceInfo((prev) => ({ ...prev, [field]: value }));
        if (field === 'selectedProvince') fetchDistricts(value);
        if (field === 'selectedDistrict') fetchWards(sourceInfo.selectedProvince, value);
    };

    const handleDestinationChange = (field: keyof PersonalInfo, value: any) => {
        if (field === 'selectedProvince') fetchDistricts2(value);
        else if (field === 'selectedDistrict') fetchWards2(destinationInfo.selectedProvince, value);
        else { setDestinationInfo((prev) => ({ ...prev, [field]: value })); }
    };

    const handleCalculateFee = async () => {
        setLoading(true)
        const token = localStorage.getItem("token");
        if (!token) return;
        const map = new MapOperation();
        const sourceCoor = await map.getCoordinates(sourceInfo.detailAddress + sourceInfo.selectedWard + sourceInfo.selectedDistrict + sourceInfo.selectedProvince, process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "");
        setSource(sourceCoor)
        const destCoor = await map.getCoordinates(destinationInfo.detailAddress + destinationInfo.selectedWard + destinationInfo.selectedDistrict + destinationInfo.selectedProvince, process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "");
        setSource(destCoor)
        const response = await orderOperation.calculateFee({
            serviceType: formData.selectedOption == 0 ? "Siêu nhanh" : (formData.selectedOption == 1 ? "Siêu rẻ" : 'Chuyển phát hỏa tốc'),
            latSource: sourceCoor?.lat ?? 10.01344,
            longSource: sourceCoor?.lng ?? 106.13123,
            latDestination: destCoor?.lat ?? 10.0123231,
            longDestination: destCoor?.lng ?? 106.424324,
            cod: formData.COD,
            mass: formData.mass,
            provinceDest: destinationInfo.selectedProvince,
            provinceSource: sourceInfo.selectedProvince,
            voucherId: voucherId
        }, token)
        if (response.error) {
            setMessage(response.message ? response.message : response.error.message ?? intl.formatMessage({ id: "Orders.Message" }))
            setOpenError(true)
        } else {
            setFee(response.data.value)
            setCurrentForm(2)
        }
        setLoading(false)
    };

    const handleShippingBillButton = async (save: Boolean) => {
        // console.log(passData)
        const token = localStorage.getItem("token") ?? "";
        if (save) {
            const shippingBillResponse = await shippingBillOperation.create({
                companyName: insuranceData.companyName,
                companyAddress: insuranceData.companyAddress,
                email: insuranceData.companyEmail,
                taxCode: insuranceData.companyTaxCode
            }, token);

            console.log((shippingBillResponse))
            // thông báo kết quả tạo hoá đơn cước phí
            setMessage(shippingBillResponse.message);
            setOpenError(true);
        } else {
            console.log(passData);
            const shippingBillResponse = await shippingBillOperation.getByCustomerId(passData.id, token);
            if (shippingBillResponse.success) {
                const shippingBillData = shippingBillResponse.data;
                console.log({ ...shippingBillData, companyTaxCode: shippingBillData.taxCode, companyEmail: shippingBillData.email });
                handleInsuranceDataChange({ ...shippingBillData, companyTaxCode: shippingBillData.taxCode, companyEmail: shippingBillData.email });
            }
        }
    }

    const handleCreateOrder = async () => {
        const token = localStorage.getItem("token") ?? "";

        console.log("additionData.insurance", additionData.insurance)
        var shippingBillId = "";
        if (additionData.insurance) {
            const shippingBillResponse = await shippingBillOperation.create({
                companyName: insuranceData.companyName,
                companyAddress: insuranceData.companyAddress,
                email: insuranceData.companyEmail,
                taxCode: insuranceData.companyTaxCode
            }, token);
            shippingBillId = shippingBillResponse.data.id;
        }

        const orderResponse = await orderOperation.create({
            serviceType: formData.selectedOption == 0 ? "Siêu nhanh" : (formData.selectedOption == 1 ? "Siêu rẻ" : "HTT"),
            nameSender: sourceInfo.name,
            nameReceiver: destinationInfo.name,
            phoneNumberReceiver: destinationInfo.phoneNumber,
            mass: formData.mass,
            height: formData.height,
            width: formData.width,
            length: formData.length,
            provinceSource: sourceInfo.selectedProvince,
            districtSource: sourceInfo.selectedDistrict,
            wardSource: sourceInfo.selectedWard,
            detailSource: sourceInfo.detailAddress,
            provinceDest: destinationInfo.selectedProvince,
            districtDest: destinationInfo.selectedDistrict,
            wardDest: destinationInfo.selectedWard,
            detailDest: destinationInfo.detailAddress,
            longSource: source?.lng ?? 107.271563,
            latSource: source?.lat ?? 10.477812,
            longDestination: destination?.lng ?? 105.442062,
            latDestination: destination?.lat ?? 10.377187,
            cod: formData.COD,
            phoneNumberSender: sourceInfo.phoneNumber,
            fromMass: 0,
            toMass: 0,
            goodType: 'OTHER',
            receiverWillPay: additionData.receiverWillPay,
            deliverDoorToDoor: additionData.doorToDoor,
            isBulkyGood: additionData.isBulkyGood,
            note: "",
            paymentMethod: formData.selectedOption === 0 ? 'BY_CASH' : 'BY_BANK_TRANSFER',
            willExportInvoice: additionData.insurance
        }, token ?? "");
        if (additionData.insurance) {
            const cargoInsuranceResponse = await cargoInsuranceOperation.create({
                hasDeliveryCare: true,
                note: "",
                shippingBillId: shippingBillId
            }, orderResponse.data.id, token);
            console.log(cargoInsuranceResponse)
        }
        if (orderResponse.error) {
            setOpenSubmit(false)
            setMessage(orderResponse.error.message ? orderResponse.error.message : (orderResponse.message ? orderResponse.message : intl.formatMessage({ id: "Orders.Message13" })))
            setOpenError(true)
            if (orderResponse.message == "Xin lỗi quý khách. Khu vực của quý khách hiện chưa có shipper nào phục vụ." || orderResponse.error.message == "Xin lỗi quý khách. Khu vực của quý khách hiện chưa có shipper nào phục vụ.") setCurrentForm(0)
        } else {
            setOpenSubmit(false)
            setMessage(intl.formatMessage({ id: "Orders.Message2" }))
            setOpenError(true)
            setQrCode(orderResponse.data.qrcode);
            setCurrentForm(formData.paymentMethod === 0 ? 0 : 4);
        }
    };

    const handleButtonClick = () => {
        if (currentForm === 0) {
            const allFieldsFilled = (info: PersonalInfo) => {
                return Object.values(info).every(value => value !== '');
            };

            if (allFieldsFilled(sourceInfo) && allFieldsFilled(destinationInfo)) {
                const REGEX_NAME = /^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-VXYỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-VXYỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ]+){1,})$/;
                const REGEX_PHONE_NUMBER = /^[0-9]{1,10}$/;

                if (!REGEX_NAME.test(sourceInfo.name)) {
                    setMessage(intl.formatMessage({ id: "Orders.Message3" }));
                    setOpenError(true);
                    return;
                }

                if (!REGEX_PHONE_NUMBER.test(sourceInfo.phoneNumber)) {
                    setMessage(intl.formatMessage({ id: "Orders.Message4" }));
                    setOpenError(true);
                    return;
                }

                if (!REGEX_NAME.test(destinationInfo.name)) {
                    setMessage(intl.formatMessage({ id: "Orders.Message5" }));
                    setOpenError(true);
                    return;
                }

                if (!REGEX_PHONE_NUMBER.test(destinationInfo.phoneNumber)) {
                    setMessage(intl.formatMessage({ id: "Orders.Message6" }));
                    setOpenError(true);
                    return;
                }

                setCurrentForm(1);
            } else {
                setMessage(intl.formatMessage({ id: "Orders.Message7" }));
                setOpenError(true);
                return;
            }
        } else if (currentForm === 1) {
            if (formData.length > 0 && formData.width > 0 && formData.height > 0 && formData.mass > 0) {
                handleCalculateFee()
            } else {
                if (formData.mass === 0) {
                    setMessage(intl.formatMessage({ id: "Orders.Message8" }));
                } else if (formData.length === 0) {
                    setMessage(intl.formatMessage({ id: "Orders.Message9" }));
                } else if (formData.width === 0) {
                    setMessage(intl.formatMessage({ id: "Orders.Message10" }));
                } else if (formData.height === 0) {
                    setMessage(intl.formatMessage({ id: "Orders.Message11" }));
                } else
                    setOpenError(true);
                return;
            }
        } else if (currentForm === 2) {
            setMessage(intl.formatMessage({ id: "Orders.Message12" }))
            setOpenSubmit(true)
        }
    };

    const handleButtonClick2 = () => {
        setCurrentForm(currentForm - 1)
    };

    const tabContentVariants: Variants = {
        initial: { x: -20, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 },
    };

    return (
        <>
            {openSubmit && (
                <SubmitPopup onClose={() => setOpenSubmit(false)} message={message} submit={handleCreateOrder} />
            )}
            {openError && (
                <NotiPopup message={message} onClose={() => setOpenError(false)} />
            )}
            {openVoucher && (
                <VoucherPopup isOpen={openVoucher} onClose={() => setOpenVoucher(false)} onSelect={(id) => { setVoucherId(id); handleCalculateFee(); }} />
            )}
            <div className={`relative ${isCollapsed ? 'w-full h-8 sm:w-8 sm:h-full' : ' w-full h-[calc(100dvh-158px)] md:h-[calc(100dvh-128px)] sm:w-2/3 md:w-[550px]'} sticky z-[40] duration-500 transition-colors-none ease-in-out`}>
                <div className={`border-8 relative overflow-clip border-white dark:border-[#242526] shadow-xl shadow-shadow-500 dark:shadow-none rounded-xl sm:rounded-tr-none sm:rounded-l-xl duration-500 ${isCollapsed ? 'opacity-0 h-8' : 'opacity-100 h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)]'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '200ms' }}>
                    <div className={`relative bg-white/10 backdrop-blur-sm dark:bg-[#1f1f1f4d] h-full rounded-[4px] sm:rounded-tr-none sm:rounded-l-[4px] duration-200 border-b-2 dark:border-b border-white/10 p-1.5 dark:border-white/30 flex flex-col gap-1.5 overflow-y-scroll no-scrollbar ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '400ms' }}>
                        {!loading ? <>
                            {currentForm == 0 &&
                                <motion.div
                                    variants={tabContentVariants}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                    className='flex flex-col gap-1.5'
                                >
                                    <SearchBox
                                        type="source"
                                        name={sourceInfo.name}
                                        setName={(value) => handleSourceChange('name', value)}
                                        phoneNumber={sourceInfo.phoneNumber}
                                        setPhoneNumber={(value) => handleSourceChange('phoneNumber', value)}
                                        detailAddress={sourceInfo.detailAddress}
                                        setDetailAddress={(value) => handleSourceChange('detailAddress', value)}
                                        selectedWard={sourceInfo.selectedWard}
                                        setSelectedWard={(value) => handleSourceChange('selectedWard', value)}
                                        selectedDistrict={sourceInfo.selectedDistrict}
                                        setSelectedDistrict={(value) => handleSourceChange('selectedDistrict', value)}
                                        selectedProvince={sourceInfo.selectedProvince}
                                        setSelectedProvince={(value) => handleSourceChange('selectedProvince', value)}
                                        provinces={provinces}
                                        districts={districts}
                                        wards={wards}
                                    />
                                    <SearchBox
                                        type="destination"
                                        name={destinationInfo.name}
                                        setName={(value) => handleDestinationChange('name', value)}
                                        phoneNumber={destinationInfo.phoneNumber}
                                        setPhoneNumber={(value) => handleDestinationChange('phoneNumber', value)}
                                        detailAddress={destinationInfo.detailAddress}
                                        setDetailAddress={(value) => handleDestinationChange('detailAddress', value)}
                                        selectedWard={destinationInfo.selectedWard}
                                        setSelectedWard={(value) => handleDestinationChange('selectedWard', value)}
                                        selectedDistrict={destinationInfo.selectedDistrict}
                                        setSelectedDistrict={(value) => handleDestinationChange('selectedDistrict', value)}
                                        selectedProvince={destinationInfo.selectedProvince}
                                        setSelectedProvince={(value) => handleDestinationChange('selectedProvince', value)}
                                        provinces={provinces}
                                        districts={districts2}
                                        wards={wards2}
                                    />
                                </motion.div>}
                            {currentForm == 1 && <DetailForm
                                formData={formData}
                                additionData={additionData}
                                setFormData={handleFormDataChange}
                                setAdditionData={handleAdditionDataChange}
                                giftData={giftData}
                                setGiftData={handleGiftDataChange}
                                insuranceData={insuranceData}
                                setInsuranceData={handleInsuranceDataChange}
                                images={images}
                                setImages={handleImagesChange}
                                shippingBillButton={handleShippingBillButton}
                            />}
                            {currentForm == 2 &&
                                <motion.div variants={tabContentVariants}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    transition={{ duration: 0.5 }} className="flex flex-col w-full gap-2 pb-12">
                                    <div className="flex flex-col w-full justify-center place-items-center gap-2 p-4 bg-white dark:bg-[#242526] rounded-xl shadow">
                                        <h1 className="w-full md:text-lg uppercase text-center font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans mb-2">
                                            <FormattedMessage id="Orders.Form3.Title" />
                                        </h1>
                                        <div className={`flex flex-col items-center relative w-[210px] mb-2`}>
                                            <Image src="/Logo_horizontal.png" alt="Your image" width={210} height={210} />
                                        </div>
                                        <h1 className="w-full md:text-lg flex gap-2 font-bold place-items-center justify-center text-center text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans mb-2">
                                            <div className='text-[#74bc42]'><FormattedMessage id="fee" />:</div>
                                            <span>{parseFloat(fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            <button
                                                className="ml-4 px-2 py-1 text-white bg-red-400 rounded-md hover:bg-red-600 transition"
                                                onClick={() => setOpenVoucher(true)}
                                            >
                                                <FormattedMessage id="ChooseVoucher" defaultMessage={voucherId ?? "Chọn voucher"} />
                                            </button>
                                        </h1>

                                        <div className="w-full text-[#4b4b4b] dark:text-white">
                                            <div className="flex flex-col gap-2">
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.NameSender" /></strong>:</div> {sourceInfo.name}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.PhoneNumSender" /></strong>:</div> {sourceInfo.phoneNumber}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.NameReceiver" /></strong>:</div> {destinationInfo.name}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.PhoneNumReceiver" /></strong>:</div> {destinationInfo.phoneNumber}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.SenderAddr" /></strong>:</div> {`${sourceInfo.detailAddress}, ${sourceInfo.selectedWard}, ${sourceInfo.selectedDistrict}, ${sourceInfo.selectedProvince}`}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.ReceiverAddr" /></strong>:</div> {`${destinationInfo.detailAddress}, ${destinationInfo.selectedWard}, ${destinationInfo.selectedDistrict}, ${destinationInfo.selectedProvince}`}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.Mass" /></strong>:</div> {formData.mass}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.Height" /></strong>:</div> {formData.height}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.Width" /></strong>:</div> {formData.width}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.Length" /></strong>:</div> {formData.length}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.COD" /></strong>:</div> {formData.COD}</div>
                                                <div className='flex gap-2'><div className='w-32 min-w-[128px] flex justify-between'><strong><FormattedMessage id="History.ServiceType" /></strong>:</div> {formData.selectedOption === 0 ?
                                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' })
                                                    : formData.selectedOption === 1 ?
                                                        intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' })
                                                        :
                                                        intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' })}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            }
                            {currentForm == 4 &&
                                <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                    <QRCodeCanvas
                                        value={qrCode}
                                        size={180}
                                        bgColor="transparent"
                                        className="rounded-lg border border-gray-300 dark:border-gray-700"
                                    />
                                    <FormattedMessage id="Orders.QrScan" />
                                </div>}
                        </> :
                            <div className="flex justify-center place-items-center w-full h-[calc(100%-48px)] gap-2 p-4 bg-white dark:bg-[#242526] rounded-xl shadow">
                                <svg aria-hidden="true" className="w-20 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                        }
                    </div>
                    <div
                        className={`absolute bottom-0 text-white bg-white w-full dark:bg-[#242526] pt-2
                    hover:cursor-pointer flex gap-2 dark:outline-navy-900 transition-all duration-400 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}

                        style={{ transitionDelay: isCollapsed ? '0ms' : '400ms', outlineOffset: '-1px' }}>
                        {currentForm != 0 && currentForm < 4 &&
                            <Button
                                className='h-10 bg-red-500 w-10 rounded-md'
                                onClick={loading ? () => { } : handleButtonClick2}
                            >
                                <FaAngleLeft />
                            </Button>}
                        <Button
                            className='h-10 bg-red-500 w-full rounded-md'
                            onClick={loading ? () => { } : currentForm === 4 ? () => setCurrentForm(0): handleButtonClick}
                        >
                            {loading ? <svg aria-hidden="true" className="w-20 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg> : currentForm != 2 ? currentForm === 4 ? <FormattedMessage id="Orders.ToHome" /> : <FormattedMessage id="Orders.Button1" /> : <FormattedMessage id="Orders.Button1" />}
                        </Button>
                    </div>
                </div>
                <Button
                    className={`absolute -bottom-3 sm:top-[20.3px] dark:text-white text-gray-400
                hover:cursor-pointer rounded-full flex focus:outline-none
                ${isCollapsed ? 'transform -translate-y-1/2 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 shadow h-8 w-8 bg-white dark:bg-[#242526]' :
                            'transform right-1/2 translate-x-1/2 sm:-translate-y-[calc(50%)] sm:translate-x-0 bottom-10 sm:border-none h-8 w-8 sm:-right-5 sm:w-14 sm:h-10 sm:justify-end'}`}
                    onClick={handleToggleCollapse}
                >
                    <div className='absolute w-full top-0 h-1/3 bg-white dark:bg-[#242526] sm:hidden'></div>
                    <FaAngleDoubleLeft className={`absolute bg-white text-navy-800 dark:text-gray-300 dark:bg-[#242526] h-10 text-sm ${isCollapsed ? "-rotate-90 sm:rotate-180" : "rotate-90 sm:rotate-0 mb-2 sm:mb-0 sm:pr-3 sm:-right-1 sm:w-[45%]"}`} />
                </Button>
            </div >
        </>
    );
};

export default AddPanel;
