import React, { useEffect, useState } from "react";
import DetailPopup from "../popup";
import { AdministrativeOperation, AuthOperation, BusinessOperation, CreateBusiness, LoginOption } from "@/TDLib/main";
import { FormattedMessage, useIntl } from "react-intl";
import InputField from "../fields/InputField";
import { Button } from "@nextui-org/react";
import { FaAngleLeft } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useThemeContext } from "@/providers/ThemeProvider";
import Select from "react-select";
import SubmitPopup from "../submit";
import NotiPopup from "../notification";
import { useRouter } from "next/navigation";

type BusinessData = {
    id: string;
    name: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    file: string;
} | null;

interface RegisterPopupProps {
    onClose: () => void;
    data: BusinessData;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose, data }) => {
    const [currentForm, setCurrentForm] = useState(0)
    const [loading, setLoading] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [districts2, setDistricts2] = useState([]);
    const [wards2, setWards2] = useState([]);
    const adminOperation = new AdministrativeOperation();
    const { theme } = useThemeContext();
    const intl = useIntl()
    const [message, setMessage] = useState("")
    const [openError, setOpenError] = useState(false)
    const [openError2, setOpenError2] = useState(false)
    const [openSubmit, setOpenSubmit] = useState(false)
    const phoneNumberRegex = /^[0-9]{1,10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9._-]{1,255}\.[a-zA-Z]{2,4}$/;
    const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,28}[a-zA-Z0-9]$/;
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<any>({
        userFullname: "",
        userPhoneNumber: "",
        userEmail: "",
        userDateOfBirth: "",
        userCccd: "",
        userDetailAddress: "",
        userProvince: "",
        userDistrict: "",
        userTown: "",
        userBank: "",
        userBin: "",
    });

    const [businessInfo, setBusinessInfo] = useState<any>({
        name: "",
        // email: "",
        // phoneNumber: "",
        taxCode: "",
        // detailAddress: "",
        province: "",
        district: "",
        town: "",
        // bank: "",
        // bin: ""
    });

    const [accountInfo, setAccountInfo] = useState<any>({
        username: "",
        password: ""
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            // console.log(imageUrl)
            setSelectedImage(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };


    const styles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: "transparent",
            border: (checkError && !state.hasValue) ? "1px solid #F53939" : (state.isFocused ? "1px solid #2563EB" : theme === "dark" ? "0px solid #E2E8F0" : "1px solid #E2E8F0"),
            borderRadius: "0.75rem",
            boxShadow: "none",
            minHeight: "2.5rem",
            width: "100%",
            "&:hover": {
                border: state.isFocused ? "1px solid #2563EB" : theme === "dark" ? "0px solid #E2E8F0" : "1px solid #E2E8F0",
            },
            color: theme === "dark" ? "#FFFFFF" : "#000000",
        }),
        placeholder: (provided: any, state: any) => ({
            ...provided,
            color: (checkError && !state.hasValue) ? "#F53939" : (theme === "dark" ? "#FFFFFF" : "#A0AEC0"),
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: "2px",
        }),
        input: (provided: any) => ({
            ...provided,
            color: theme === "dark" ? "#FFFFFF" : "#000000",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            backgroundColor: "transparent",
            color: theme === "dark" ? "#FFFFFF" : "#000000",
            marginTop: "2px",
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: theme === "dark" ? "#3A3B3C" : "#FFFFFF",
            borderRadius: "0.75rem",
        }),
        menuList: (provided: any) => ({
            ...provided,
            backgroundColor: "transparent",
            color: theme === "dark" ? "#FFFFFF" : "#3A3B3C",
            maxHeight: "150px",
            borderRadius: "0.75rem",
        }),
        option: (styles: any, { isDisabled, isFocused, isSelected }: any) => ({
            ...styles,
            backgroundColor: isSelected
                ? theme === "dark" ? '#242526' : "#E2E8F0"
                : isFocused
                    ? theme === "dark" ? '#27282a' : "#d1d5db"
                    : "transparent",
            color: isDisabled
                ? theme === "dark" ? '#718096' : '#A0AEC0'
                : theme === "dark" ? '#FFFFFF' : '#3A3B3C',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        }),
        container: (provided: any) => ({
            ...provided,
            fontSize: "0.875rem",
            width: "100%",
        }),
    };

    const handlePhoneNumberChange = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        setBusinessInfo((prev: any) => ({ ...prev, phoneNumber: numericValue }));
    };

    const handlePhoneNumberChange2 = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        setUserInfo((prev: any) => ({ ...prev, userPhoneNumber: numericValue }));
    };

    const fetchProvinces = async () => {
        const response = await adminOperation.get({});
        setProvinces(response.data);
    };

    const fetchDistricts = async (province: string) => {
        const response = await adminOperation.get({ province: province });
        setDistricts(response.data);
        setBusinessInfo({ ...businessInfo, town: '', district: '', province: province })
    };

    const fetchDistricts2 = async (province: string) => {
        const response = await adminOperation.get({ province: province });
        setDistricts2(response.data);
        setUserInfo({ ...userInfo, userTown: '', userDistrict: '', userProvince: province })
    };

    const fetchWards = async (province: string, district: string) => {
        const response = await adminOperation.get({ province: province, district: district });
        setWards(response.data);
        setBusinessInfo({ ...businessInfo, town: '', district: district, province: province })
    };

    const fetchWards2 = async (province: string, district: string) => {
        const response = await adminOperation.get({ province: province, district: district });
        setWards2(response.data);
        setUserInfo({ ...userInfo, userTown: '', userDistrict: district, userProvince: province })
    };

    const fields: Array<{ id: keyof CreateBusiness, type: string, label: string, onChange?: (value: string) => void }> = [
        // { id: "userFullname", type: "text", label: "AddBus.UserFullName" },
        // { id: "userPhoneNumber", type: "text", label: "AddBus.UserPhoneNumber", onChange: handlePhoneNumberChange2 },
        // { id: "userEmail", type: "text", label: "AddBus.UserEmail" },
        // { id: "userDateOfBirth", type: "date", label: "AddBus.UserDateOfBirth" },
        // { id: "userCccd", type: "text", label: "AddBus.UserCccd" },
        // { id: "userDetailAddress", type: "text", label: "AddBus.UserDetailAddress" },
        // { id: "userBank", type: "text", label: "AddBus.UserBank" },
        // { id: "userBin", type: "text", label: "AddBus.UserBin" },
    ];

    const fields2: Array<{ id: keyof CreateBusiness, type: string, label: string, onChange?: (value: string) => void }> = [
        { id: "name", type: "text", label: "AddBus.BusinessName" },
        // { id: "email", type: "text", label: "AddBus.Email" },
        // { id: "phoneNumber", type: "text", label: "AddBus.PhoneNumber", onChange: handlePhoneNumberChange },
        { id: "taxCode", type: "text", label: "AddBus.TaxNumber" },
        { id: "address", type: "text", label: "AddBus.DetailAddress" },
        // { id: "bank", type: "text", label: "AddBus.Bank" },
        // { id: "bin", type: "text", label: "AddBus.Bin" },
    ];

    const fields3: Array<{ id: keyof CreateBusiness, type: string, label: string, onChange?: (value: string) => void }> = [
        // { id: "username", type: "text", label: "AddBus.Username" },
        // { id: "password", type: "password", label: "AddBus.Password" },
    ];

    const handleChange = (field: keyof CreateBusiness, value: string | number) => {
        if (currentForm === 0) {
            setBusinessInfo((prev: any) => ({ ...prev, [field]: value }));
        } else if (currentForm === 1) {
            setUserInfo((prev: any) => ({ ...prev, [field]: value }));
        } else {
            setAccountInfo((prev: any) => ({ ...prev, [field]: value }));
        }
    };

    const handleButtonClick = async () => {
        console.log(businessInfo, Object.values(businessInfo))
        // if (currentForm === 0) {
        //     if (Object.values(businessInfo).some(value => value === "")) {
        //         setMessage(intl.formatMessage({ id: "Register.Message" }))
        //         setOpenError(true)
        //         setCheckError(true)
        //         return
        //     } else {
        //         setCheckError(false)
        //         setCurrentForm(1)
        //     }
        // } else if (currentForm === 1) {
        //     if (Object.values(userInfo).some(value => value === "")) {
        //         setMessage(intl.formatMessage({ id: "Register.Message" }))
        //         setOpenError(true)
        //         setCheckError(true)
        //         return
        //     } else if (!phoneNumberRegex.test(userInfo.userPhoneNumber)) {
        //         setMessage(intl.formatMessage({ id: "Register.Message2" }))
        //         setOpenError(true)
        //         setCheckError(true)

        //         return
        //     } else if (!emailRegex.test(userInfo.userEmail)) {
        //         setMessage(intl.formatMessage({ id: "Register.Message3" }))
        //         setOpenError(true)
        //         setCheckError(true)
        //         return
        //     } else {
        //         setCheckError(false)
        //         setCurrentForm(2)
        //     }
        // } else {
        // if (Object.values(accountInfo).some(value => value === "")) {
        //     setMessage(intl.formatMessage({ id: "Register.Message" }))
        //     setOpenError(true)
        //     setCheckError(true)
        //     return
        // } else if (!usernameRegex.test(accountInfo.username)) {
        //     setMessage(intl.formatMessage({ id: "Register.Message4" }))
        //     setOpenError(true)
        //     setCheckError(true)
        //     return
        // } else {
        setCheckError(false)
        const token = localStorage.getItem("token") ?? ""
        console.log(selectedImage)
        const responseBlob = await fetch(selectedImage ?? "");
        const imageBlob = await responseBlob.blob();
        const info: CreateBusiness = {
            // userFullname: userInfo.userFullname,
            // userPhoneNumber: userInfo.userPhoneNumber,
            // userEmail: userInfo.userEmail,
            // userDateOfBirth: userInfo.userDateOfBirth,
            // userCccd: userInfo.userCccd,
            // userProvince: userInfo.userProvince,
            // userDistrict: userInfo.userDistrict,
            // userTown: userInfo.userTown,
            // userDetailAddress: userInfo.userDetailAddress,
            // userBin: userInfo.userBin,
            // userBank: userInfo.userBank,
            // username: accountInfo.username,
            // password: accountInfo.password,
            name: businessInfo.name,
            // email: businessInfo.email,
            // phoneNumber: businessInfo.phoneNumber,
            taxCode: businessInfo.taxCode,
            province: businessInfo.province,
            district: businessInfo.district,
            town: businessInfo.town,
            address: businessInfo.detailAddress,
            // bin: businessInfo.bin,
            // bank: businessInfo.bank
        };
        const businessOp = new BusinessOperation();
        const authOperation = new AuthOperation();
        if (data) { 
            const response = await businessOp.update(data.id, info, imageBlob, token)
            console.log(response)
            if (response.error) {
                setMessage(response.message ?? response.error.message)
                setOpenError(true)
                return;
            }
        }
        else {
            const response = await businessOp.signUp(info, imageBlob, token)
            console.log(response)
            if (response.error) {
                setMessage(response.message ?? response.error.message)
                setOpenError(true)
                return;
            }
        }
        router.refresh()

        // }
        // }
    };

    const handleButtonClick2 = () => {
        setCurrentForm(currentForm - 1);
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    return (
        <DetailPopup
            onClose={onClose}
            title={intl.formatMessage({ id: "Register.Title" })}
            className2="sm:w-11/12 md:w-2/3"
            button={
                <div className="mt-4 text-white flex gap-2">
                    {currentForm !== 0 && (
                        <Button
                            className="h-10 bg-red-500 w-10 rounded-md"
                            onClick={loading ? () => { } : handleButtonClick2}
                        >
                            <FaAngleLeft />
                        </Button>
                    )}
                    <Button
                        className="h-10 bg-red-500 w-full rounded-md"
                        onClick={loading ? () => { } : handleButtonClick}
                    >
                        {loading ? (
                            <svg
                                aria-hidden="true"
                                className="w-20 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        ) : currentForm !== 2 ? (
                            <>{intl.formatMessage({ id: "Register.Button1" })}</>
                        ) : (
                            <>{intl.formatMessage({ id: "Register.Button2" })}</>
                        )}
                    </Button>
                </div>
            }
        >
            {openSubmit && (
                <SubmitPopup onClose={() => setOpenSubmit(false)} message={message} submit={() => { }} />
            )}
            {openError && (
                <NotiPopup message={message} onClose={() => setOpenError(false)} />
            )}
            {openError2 && (
                <NotiPopup message={message} onClose={() => { setOpenError2(false); router.push("/orders") }} />
            )}
            <AnimatePresence initial={false}>
                {currentForm === 0 && (
                    <motion.div
                        key="form0"
                        initial={{ scale: 0, height: "0" }}
                        animate={{ scale: 1, height: "auto" }}
                        exit={{ scale: 0, height: "0" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="font-bold text-lg w-full text-center text-[#000000] dark:text-white">
                            <FormattedMessage id="Register.Title2" />
                        </div>

                        {fields2.map(({ id, type, label, onChange }) => (
                            <div key={id} className="flex gap-2 w-full flex-col lg:flex-row">
                                <div className='lg:w-44 lg:min-w-[11rem] flex lg:justify-between place-items-center'>
                                    <strong><FormattedMessage id={label} /></strong>:
                                </div>
                                <p className="whitespace-nowrap flex flex-col gap-2 relative w-full">
                                    <InputField
                                        variant="auth1"
                                        id={id}
                                        type={type}
                                        state={checkError && businessInfo[id] as string === "" ? "error" : "none"}
                                        value={businessInfo[id] as string}
                                        setValue={(value: string) => onChange ? onChange(value) : handleChange(id, value)}
                                        className="bg-white dark:!bg-[#3a3b3c] w-full"
                                        extra="w-full"
                                    />
                                </p>
                                {
                                    id == "address" &&
                                    <>
                                        <Select
                                            id="city"
                                            placeholder={intl.formatMessage({
                                                id: "OrderForm.LocationForm.SelectProvince",
                                            })}
                                            aria-label=".form-select-sm"
                                            className={"flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white"}
                                            value={businessInfo.province ? { value: businessInfo.province, label: businessInfo.province } : null}
                                            onChange={(e) => { fetchDistricts(e?.value) }}
                                            //@ts-ignore
                                            options={provinces?.map((city) => ({ value: city, label: city }))}
                                            isSearchable
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            styles={styles}
                                        />
                                        <Select
                                            id="district"
                                            placeholder={intl.formatMessage({
                                                id: "OrderForm.LocationForm.SelectDistrict",
                                            })}
                                            aria-label=".form-select-sm"
                                            className={"flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white"}
                                            value={businessInfo.district ? { value: businessInfo.district, label: businessInfo.district } : null}
                                            onChange={(e) => { fetchWards(businessInfo.province, e?.value) }}
                                            //@ts-ignore
                                            options={districts?.map((district) => ({
                                                value: district,
                                                label: district,
                                            }))}
                                            isSearchable
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            styles={styles}
                                        />
                                        <Select
                                            id="ward"
                                            placeholder={intl.formatMessage({
                                                id: "OrderForm.LocationForm.SelectWard",
                                            })}
                                            aria-label=".form-select-sm"
                                            className={"flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white"}
                                            value={businessInfo.town ? { value: businessInfo.town, label: businessInfo.town } : null}
                                            onChange={(e) => setBusinessInfo({ ...businessInfo, town: e?.value })}
                                            //@ts-ignore
                                            options={wards?.map((ward) => ({ value: ward, label: ward }))}
                                            isSearchable
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            styles={styles}
                                        />
                                    </>
                                }
                            </div>
                        ))}

                        <div className="flex flex-col gap-4 mt-4">
                            <label className="font-bold text-lg text-[#000000] dark:text-white">
                                <FormattedMessage id="Register.UploadImage" />
                            </label>
                            {!selectedImage && <label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer w-max">
                                <span>Chọn File giấy phép kinh doanh</span>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>}

                            {selectedImage && (
                                <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                                    <button
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                        onClick={handleRemoveImage}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {currentForm === 1 && (
                    <motion.div
                        key="form1"
                        initial={{ scale: 0, height: "0" }}
                        animate={{ scale: 1, height: "auto" }}
                        exit={{ scale: 0, height: "0" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="font-bold text-lg w-full text-center text-[#000000] dark:text-white">
                            <FormattedMessage id="Register.Title3" />
                        </div>
                        {fields.map(({ id, type, label, onChange }) => (
                            <div key={id} className="flex gap-2 w-full flex-col lg:flex-row">
                                <div className='lg:w-44 lg:min-w-[11rem] flex lg:justify-between place-items-center'>
                                    <strong><FormattedMessage id={label} /></strong>:
                                </div>
                                <p className="whitespace-nowrap flex flex-col gap-2 relative w-full">
                                    <InputField
                                        variant="auth1"
                                        id={id}
                                        type={type}
                                        state={checkError && userInfo[id] as string === "" ? "error" : "none"}
                                        value={userInfo[id] as string}
                                        setValue={(value: string) => onChange ? onChange(value) : handleChange(id, value)}
                                        className="bg-white dark:!bg-[#3a3b3c] w-full"
                                        extra="w-full"
                                    />
                                </p>
                                {
                                    // id == "userDetailAddress" &&
                                    // <>
                                    //     <Select
                                    //         id="city2"
                                    //         placeholder={intl.formatMessage({
                                    //             id: "OrderForm.LocationForm.SelectProvince",
                                    //         })}
                                    //         aria-label=".form-select-sm"
                                    //         className={`flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white`}
                                    //         value={userInfo.userProvince ? { value: userInfo.userProvince, label: userInfo.userProvince } : null}
                                    //         onChange={(e) => { fetchDistricts2(e?.value) }}
                                    //         //@ts-ignore
                                    //         options={provinces?.map((city) => ({ value: city, label: city }))}
                                    //         isSearchable
                                    //         components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    //         styles={styles}
                                    //     />
                                    //     <Select
                                    //         id="district2"
                                    //         placeholder={intl.formatMessage({
                                    //             id: "OrderForm.LocationForm.SelectDistrict",
                                    //         })}
                                    //         aria-label=".form-select-sm"
                                    //         className={`flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white`}
                                    //         value={userInfo.userDistrict ? { value: userInfo.userDistrict, label: userInfo.userDistrict } : null}
                                    //         onChange={(e) => { fetchWards2(userInfo.userProvince, e?.value) }}
                                    //         //@ts-ignore
                                    //         options={districts2?.map((district) => ({
                                    //             value: district,
                                    //             label: district,
                                    //         }))}
                                    //         isSearchable
                                    //         components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    //         styles={styles}
                                    //     />
                                    //     <Select
                                    //         id="ward2"
                                    //         placeholder={intl.formatMessage({
                                    //             id: "OrderForm.LocationForm.SelectWard",
                                    //         })}
                                    //         aria-label=".form-select-sm"
                                    //         className={`flex items-center h-10 text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full rounded-xl bg-white`}
                                    //         value={userInfo.userTown ? { value: userInfo.userTown, label: userInfo.userTown } : null}
                                    //         onChange={(e) => setUserInfo({ ...userInfo, userTown: e?.value })}
                                    //         //@ts-ignore
                                    //         options={wards2?.map((ward) => ({ value: ward, label: ward }))}
                                    //         isSearchable
                                    //         components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    //         styles={styles}
                                    //     />
                                    // </>
                                }
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {currentForm === 2 && (
                    <motion.div
                        key="form2"
                        initial={{ scale: 0, height: "0" }}
                        animate={{ scale: 1, height: "auto" }}
                        exit={{ scale: 0, height: "0" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="font-bold text-lg w-full text-center text-[#000000] dark:text-white">
                            <FormattedMessage id="Register.Title4" />
                        </div>
                        {fields3.map(({ id, type, label, onChange }) => (
                            <div key={id} className="flex gap-2 w-full flex-col lg:flex-row">
                                <div className='lg:w-44 lg:min-w-[11rem] flex lg:justify-between place-items-center'>
                                    <strong><FormattedMessage id={label} /></strong>:
                                </div>
                                <p className="whitespace-nowrap flex flex-row gap-2 relative w-full">
                                    <InputField
                                        variant="auth1"
                                        id={id}
                                        type={type}
                                        state={checkError && accountInfo[id] as string === "" ? "error" : "none"}
                                        value={accountInfo[id] as string}
                                        setValue={(value: string) => onChange ? onChange(value) : handleChange(id, value)}
                                        className="bg-white dark:!bg-[#3a3b3c] w-full"
                                        extra="w-full"
                                    />
                                </p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </DetailPopup>
    );
}

export default RegisterPopup;
