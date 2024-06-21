'use client'
import { useEffect } from "react";
import { IoPerson, IoCarSport } from "react-icons/io5";
import { MdPhonelinkRing } from "react-icons/md";
import Select from "react-select";
import { useThemeContext } from "@/providers/ThemeProvider";
import { useIntl } from "react-intl";
import { FaLocationDot } from "react-icons/fa6";
import { debounce } from "lodash";
import { getCoordinates } from "./GetCoor";
import { useSourceContext } from "../context/SourceContext";
import { useDestinationContext } from "../context/DestinationContext";
interface LocationFormProps {
    type: 'source' | 'destination';
    name: string;
    setName: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    detailAddress: string;
    setDetailAddress: (value: string) => void;
    selectedWard: string | null;
    setSelectedWard: (value: string | null) => void;
    selectedDistrict: string | null;
    setSelectedDistrict: (value: string | null) => void;
    selectedProvince: string | null;
    setSelectedProvince: (value: string | null) => void;
    provinces: string[];
    districts: string[];
    wards: string[];
}

const LocationForm: React.FC<LocationFormProps> = ({
    type,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    detailAddress,
    setDetailAddress,
    selectedWard,
    setSelectedWard,
    selectedDistrict,
    setSelectedDistrict,
    selectedProvince,
    setSelectedProvince,
    provinces,
    districts,
    wards
}) => {
    const { theme } = useThemeContext();
    const intl = useIntl();
    const { source, setSource } = useSourceContext()
    const { destination, setDestination } = useDestinationContext()
    const styles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
            "&:hover": {
                border: "none",
            },
            color: "#4a5568",
            display: "flex",
            alignItems: "center",
            paddingLeft: "0.25rem", // pl-1
            height: "2.5rem", // h-10
            width: "100%", // w-full
            borderRadius: "0.25rem", // rounded
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: theme === "dark" ? "#FFFFFF" : "#a0aec0",
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
        }),
        menuList: (provided: any) => ({
            ...provided,
            backgroundColor: "transparent",
            color: theme === "dark" ? "#ffffff" : "#3A3B3C",
            marginTop: "2px",
            maxHeight: "150px",
        }),
        option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? theme === "dark" ? '#242526' : "#E2E8F0"  // Color for selected option
                    : isFocused
                        ? theme === "dark" ? '#27282a' : "#d1d5db"  // Color for focused option
                        : "transparent",
                color: isDisabled
                    ? theme === "dark" ? '#718096' : '#A0AEC0' // Disabled option text color
                    : theme === "dark" ? '#ffffff' : '#3A3B3C', // Default option text color
            };
        },
        container: (provided: any, state: any) => ({
            ...provided,
            color: "#4a5568",
            display: "flex",
            alignItems: "center",
            height: "2.5rem", // h-10
            width: "100%", // w-full
            fontSize: "0.875rem",
        }),
    };

    useEffect(() => {
        const fetchCoordinates = debounce(() => {
            if (
                detailAddress && selectedWard && selectedDistrict && selectedProvince
            ) {
                getCoordinates(
                    `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`
                )
                    .then((coordinates: any) => {
                        if (coordinates) {
                            type == "source" ?
                                setSource({
                                    lat: coordinates.lat,
                                    lng: coordinates.lng,
                                    name: `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
                                    label: `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
                                })
                                :
                                setDestination({
                                    lat: coordinates.lat,
                                    lng: coordinates.lng,
                                    name: `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
                                    label: `${detailAddress}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince}`,
                                });
                        } else {
                            type == "source" ? setSource(null) : setDestination(null);
                        }
                    })
                    .catch((error) => {
                        console.error("Đã xảy ra lỗi khi tìm kiếm tọa độ:", error);
                    });
            } else {
                type == "source" ? setSource(null) : setDestination(null);
            }
        }, 1000);

        fetchCoordinates();

        return () => {
            fetchCoordinates.cancel();
        };
    }, [detailAddress, selectedWard, selectedDistrict, selectedProvince]);

    return (
        <div className={`flex flex-col w-full gap-2 ${type == "destination" ? "pb-48" : ""}`}>
            <div className="flex flex-col w-full gap-2 p-4 bg-white dark:bg-[#242526] rounded-xl shadow">
                <h1 className="w-full md:text-lg text-center font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans mb-2">
                    {type === 'source' ? "Nhập thông tin người gửi" : "Nhập thông tin người nhận"}
                </h1>
                <div className="flex gap-2">
                    <div className={`flex items-center rounded-tl-lg bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 ${name ? "border-navy-800" : "border-gray-500"}`}>
                        <p className="pl-4 pr-3 text-xl">
                            <IoPerson className={`h-4 w-4 dark:text-white ${name ? "text-[#4b4b4b]" : "text-gray-400"}`} />
                        </p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder={"Họ và tên"}
                            className={`block h-full w-full rounded-r-full bg-[#F0F2F5] pr-4 text-sm font-sans font-medium text-[#4b4b4b] outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white`}
                        />
                    </div>
                    <div className={`flex items-center rounded-tr-lg bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 ${phoneNumber ? "border-navy-800" : "border-gray-500"}`}>
                        <p className="pl-4 pr-3 text-xl">
                            <MdPhonelinkRing className={`h-4 w-4 dark:text-white ${phoneNumber ? "text-[#4b4b4b]" : "text-gray-400"}`} />
                        </p>
                        <input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text"
                            placeholder={"Số điện thoại"}
                            className={`block h-full w-full rounded-r-full bg-[#F0F2F5] pr-4 text-sm font-sans font-medium text-[#4b4b4b] outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white`}
                        />
                    </div>
                </div>
                <div className={`flex items-center text-navy-800 bg-[#F0F2F5] dark:bg-[#3a3b3c] dark:text-white w-full h-10 ${detailAddress ? "border-navy-800" : "border-gray-500"}`}>
                    <p className="pl-4 pr-3 text-xl">
                        {type == "source" ? <IoCarSport className={`h-4 w-4 mt-1 dark:text-white ${detailAddress ? "text-[#4b4b4b]" : "text-gray-400"}`} />
                            : <FaLocationDot className={`h-4 w-4 dark:text-white ${detailAddress ? "text-[#4b4b4b]" : "text-gray-400"}`} />}
                    </p>
                    <input
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                        type="text"
                        placeholder={"Địa chỉ chi tiết"}
                        className={`block h-full w-full rounded-r-full bg-[#F0F2F5] pr-4 text-sm font-sans font-medium text-[#4b4b4b] outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white`}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-2 font-sans font-medium">
                    <Select
                        id="province"
                        placeholder={intl.formatMessage({
                            id: "OrderForm.LocationForm.SelectProvince",
                        })}
                        aria-label=".form-select-sm"
                        className={`flex items-center md:rounded-bl-lg bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 px-1`}
                        value={selectedProvince ? { value: selectedProvince, label: selectedProvince } : null}
                        onChange={(option) => setSelectedProvince(option ? option.value : null)}
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
                        className={`flex items-center bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 px-1`}
                        value={selectedDistrict ? { value: selectedDistrict, label: selectedDistrict } : null}
                        onChange={(option) => setSelectedDistrict(option ? option.value : null)}
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
                        className={`flex items-center rounded-b-lg md:rounded-bl-none bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 px-1`}
                        value={selectedWard ? { value: selectedWard, label: selectedWard } : null}
                        onChange={(option) => setSelectedWard(option ? option.value : null)}
                        options={wards?.map((ward) => ({ value: ward, label: ward }))}
                        isSearchable
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        styles={styles}
                    />
                </div>
            </div>
        </div>
    );
};

export default LocationForm;
