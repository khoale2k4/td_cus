import React, { FC, useState, useRef, useEffect, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AuthOperation } from "@/TDLib/main";
interface OptFieldProps {
    id: string;
    setMessage: any;
    setModal: any;
    setError: any;
}
let currentOTPIndex: number = 0;
const OTPField: FC<OptFieldProps> = ({ id, setMessage, setModal, setError }) => {
    const [otp1, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const authOperation = new AuthOperation();
    const inputRef = useRef<HTMLInputElement>(null)
    const intl = useIntl()
    const handleOnKeyDown = (
        { key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentOTPIndex = index
        if (key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
    };

    const handleOnChange = (
        { target }: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { value } = target;
        if (value && value !== "0" && !Number(value)) {
            // console.log(!Number(value));
            return;
        }
        const newOTP: string[] = [...otp1];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);
        if (!value) setActiveOTPIndex(currentOTPIndex - 1)
        else setActiveOTPIndex(currentOTPIndex + 1);
        setOtp(newOTP);
    }
    useEffect(() => {
        const verify = async () => {
            if (!otp1.some((element) => element === "")) {
                let CheckOtp = otp1.join("");
                const verify = await authOperation.verifyOtp({ id: id, otp: CheckOtp })
                console.log(verify)
                if (!verify.error) {
                    setMessage(intl.formatMessage({ id: "OTP.Message" }))
                    setModal(true)
                    localStorage.setItem("token", verify.data.token)
                }
                else {
                    setError(true)
                    setMessage(intl.formatMessage({ id: "OTP.Message2" }))
                    setModal(true)
                    setOtp(new Array(6).fill(""))
                }
            }
        }
        verify()
    }, [otp1]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    return (
        <>
            <div className="flex flex-col justify-center items-center space-x-2">
                <div className="flex justify-center items-center space-x-1 sm:space-x-2">
                    {otp1.map((_, index) => {
                        return (
                            <React.Fragment key={index}>
                                <input
                                    ref={index === activeOTPIndex ? inputRef : null}
                                    type="tel"
                                    inputMode="numeric"
                                    className="w-12 h-12 sm:w-14 sm:h-14 border-2 dark:border bg-gray-100 rounded-lg outline-none text-center font-semibold text-sm sm:text-2xl spin-button-none focus:border-red-500 dark:bg-[#3a3b3c] dark:text-white focus:text-black text-black transition"
                                    onChange={handleOnChange}
                                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                                    value={otp1[index]}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default OTPField;