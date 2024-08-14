'use client';
import Select from "react-select";
import { useThemeContext } from "@/providers/ThemeProvider";
import { FormattedMessage, useIntl } from "react-intl";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { Variants, motion } from 'framer-motion';
interface DetailFormProps {
    formData: {
        selectedOption: number;
        length: number;
        width: number;
        height: number;
        mass: number;
        COD: number;
    };
    setFormData: (data: Partial<DetailFormProps['formData']>) => void;
}

const DetailForm: React.FC<DetailFormProps> = ({
    formData, setFormData
}) => {
    const { selectedOption, length, width, height, mass, COD } = formData;
    const suggestion = [1, 10000, 100000, 1000000];
    const intl = useIntl();
    const { theme } = useThemeContext();

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

    const typesOfDelivery = [
        { value: 0, text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' }) },
        { value: 1, text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' }) },
        { value: 2, text: intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' }) }
    ];

    const increment = (key: keyof DetailFormProps['formData']) => {
        setFormData({ [key]: formData[key] + 1 });
    };

    const decrement = (key: keyof DetailFormProps['formData']) => {
        setFormData({ [key]: Math.max(formData[key] - 1, 0) });
    };

    const handleSelectOption = (selectedOption: any) => {
        setFormData({ selectedOption: selectedOption.value });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = event.target.value.replace(/\D/g, '');
        setFormData({ [key]: parseInt(value) || 0 });
    };

    const tabContentVariants: Variants = {
        initial: { x: 20, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: 20, opacity: 0 },
    };

    return (
        <motion.div variants={tabContentVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.5 }} className="flex flex-col w-full gap-2 pb-12">
            <div className="flex flex-col w-full gap-2 p-4 bg-white dark:bg-[#242526] rounded-xl shadow">
                <h1 className="w-full md:text-lg text-center font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans mb-2">
                    <FormattedMessage id="Orders.Form2.Title" />
                </h1>
                <h1 className="w-full px-1 sm:text-base text-left text-sm font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans">
                    <FormattedMessage id="Orders.Form2.Message" />
                </h1>
                <div className={`flex items-center rounded-full text-navy-800 bg-[#F0F2F5] dark:bg-[#3a3b3c] dark:text-white w-full h-10 ${COD ? "border-navy-800" : "border-gray-500"}`}>
                    <p className="pl-4 pr-3 text-xl">
                        <GiPayMoney className={`h-6 w-4 rotate-180 dark:text-white text-[#4b4b4b]`} />
                    </p>
                    <input
                        value={Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(COD)}
                        onChange={(e) => handleInputChange(e, 'COD')}
                        type="text"
                        placeholder="Value"
                        className={`block h-full w-full rounded-r-full bg-[#F0F2F5] pr-4 text-sm font-sans font-medium text-[#4b4b4b] outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white`}
                    />
                </div>
                <h1 className="w-full px-1 sm:text-base mt-2 text-left text-sm font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans">
                    <FormattedMessage id="Orders.Form2.Message2" />
                </h1>
                <div className="flex flex-col gap-2 w-full">
                    <Select
                        id="locationSelect"
                        instanceId="locationSelect"
                        isSearchable={false}
                        styles={styles}
                        className={`flex items-center bg-[#F0F2F5] text-navy-800 dark:bg-[#3a3b3c] dark:text-white w-full h-10 px-1 rounded-full`}
                        placeholder={intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' })}
                        value={typesOfDelivery.find(option => option.value === selectedOption)}
                        onChange={handleSelectOption}
                        options={typesOfDelivery}
                        formatOptionLabel={(option: { value: number, text: string }) => (
                            <div className="flex items-center space-x-2">
                                <span className="ml-2 text-sm font-medium">{option.text}</span>
                            </div>
                        )}
                    />
                </div>
                <h1 className="w-full px-1 sm:text-base mt-2 text-left text-sm font-bold text-[#4b4b4b] dark:text-white text-nowrap cursor-default font-sans">
                    <FormattedMessage id="Orders.Form2.Message3" />
                </h1>
                <div className="flex flex-col sm:flex-row justify-center place-items-center font-sans font-medium text-[#4b4b4b] dark:text-white">
                    <label htmlFor="mass" className="pb-1 px-1 text-sm leading-5 peer-placeholder-shown:text-sm whitespace-nowrap sm:w-40 text-left w-full">
                        <FormattedMessage id="Orders.Form2.Message4" />
                    </label>
                    <div className="relative self-center w-full my-2">
                        <input id="mass" name="mass" type="text" value={mass} onChange={(e) => handleInputChange(e, 'mass')} className="bg-[#F0F2F5] dark:bg-[#3a3b3c] h-10 rounded-full self-center w-full cursor-default text-center dark:text-white" placeholder="Value" />

                        <button className="absolute top-1/2 h-10 w-10 right-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-r-xl" onClick={() => increment('mass')}>
                            <FaPlus className="flex text-black w-full border-gray-300 dark:border-white border-l" />
                        </button>
                        <button className="absolute top-1/2 h-10 w-10 left-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-l-xl" onClick={() => decrement('mass')}>
                            <FaMinus className="flex text-black w-full border-gray-300 dark:border-white border-r" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center place-items-center font-sans font-medium text-[#4b4b4b] dark:text-white">
                    <label htmlFor="length" className="pb-1 px-1 text-sm leading-5 peer-placeholder-shown:text-sm whitespace-nowrap sm:w-40 text-left w-full">
                        <FormattedMessage id="Orders.Form2.Message5" />
                    </label>
                    <div className="relative self-center w-full my-2">
                        <input id="length" name="length" type="text" value={length} onChange={(e) => handleInputChange(e, 'length')} className="bg-[#F0F2F5] dark:bg-[#3a3b3c] h-10 rounded-full self-center w-full cursor-default text-center dark:text-white" placeholder="Value" />

                        <button className="absolute top-1/2 h-10 w-10 right-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-r-xl" onClick={() => increment('length')}>
                            <FaPlus className="flex text-black w-full border-gray-300 dark:border-white border-l" />
                        </button>
                        <button className="absolute top-1/2 h-10 w-10 left-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-l-xl" onClick={() => decrement('length')}>
                            <FaMinus className="flex text-black w-full border-gray-300 dark:border-white border-r" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center place-items-center font-sans font-medium text-[#4b4b4b] dark:text-white">
                    <label htmlFor="width" className="pb-1 px-1 text-sm leading-5 peer-placeholder-shown:text-sm whitespace-nowrap sm:w-40 text-left w-full">
                        <FormattedMessage id="Orders.Form2.Message6" />
                    </label>
                    <div className="relative self-center w-full my-2">
                        <input id="width" name="width" type="text" value={width} onChange={(e) => handleInputChange(e, 'width')} className="bg-[#F0F2F5] dark:bg-[#3a3b3c] h-10 rounded-full self-center w-full cursor-default text-center dark:text-white" placeholder="Value" />

                        <button className="absolute top-1/2 h-10 w-10 right-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-r-xl" onClick={() => increment('width')}>
                            <FaPlus className="flex text-black w-full border-gray-300 dark:border-white border-l" />
                        </button>
                        <button className="absolute top-1/2 h-10 w-10 left-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-l-xl" onClick={() => decrement('width')}>
                            <FaMinus className="flex text-black w-full border-gray-300 dark:border-white border-r" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center place-items-center font-sans font-medium text-[#4b4b4b] dark:text-white">
                    <label htmlFor="height" className="pb-1 px-1 text-sm leading-5 peer-placeholder-shown:text-sm whitespace-nowrap sm:w-40 text-left w-full">
                        <FormattedMessage id="Orders.Form2.Message7" />
                    </label>
                    <div className="relative self-center w-full my-2">
                        <input id="height" name="height" type="text" value={height} onChange={(e) => handleInputChange(e, 'height')} className="bg-[#F0F2F5] dark:bg-[#3a3b3c] h-10 rounded-full self-center w-full cursor-default text-center dark:text-white" placeholder="Value" />

                        <button className="absolute top-1/2 h-10 w-10 right-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-r-xl" onClick={() => increment('height')}>
                            <FaPlus className="flex text-black w-full border-gray-300 dark:border-white border-l" />
                        </button>
                        <button className="absolute top-1/2 h-10 w-10 left-0 flex items-center pointer-event-stroke -translate-y-1/2 text-xs hover:text-sm rounded-l-xl" onClick={() => decrement('height')}>
                            <FaMinus className="flex text-black w-full border-gray-300 dark:border-white border-r" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DetailForm;
