'use client'
import { useState, useEffect } from "react";
import { HTMLInputTypeAttribute } from "react";
import { FiEye, FiEyeOff, FiCalendar } from "react-icons/fi";

type Props = {
  value?: any;
  setValue?: any;
  label?: string;
  id?: string;
  extra?: any;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  variant?: any;
  state?: "error" | "success" | string;
  disabled?: boolean;
  className?: string;
};

function InputField(props: Props) {
  const {
    value,
    setValue,
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    className,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const triggerDatePicker = (id: string) => {
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.showPicker();
    }
  };

  return (
    <div className={`${extra}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
            }`}
        >
          {label}
        </label>
      )}
      <div className={`relative w-full ${label ? "mt-1" : ""}`}>
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); }}
          onBlur={(e) => { if (type === "date") setValue(e.target.value); }}  // Ensure date value is updated on blur
          disabled={disabled}
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          placeholder={type === "date" ? "" : placeholder}
          className={`flex ${variant == "auth1" ? "h-10" : "h-12"} w-full items-center justify-center rounded-xl border ${className ? className : "bg-white/0"
            } p-3 text-sm outline-none duration-300 ${disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : state === "error"
                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                : state === "success"
                  ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:border-white/10 focus:border-blueSecondary dark:focus:border-blueSecondary dark:text-white"
            } ${type === "date" ? "hide-calendar-icon" : ""}`}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent focus:outline-none text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
        {type === "date" && (
          <>
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-white">
              {placeholder}
            </span>
            <FiCalendar
              onClick={() => triggerDatePicker(id!)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent focus:outline-none text-black dark:text-white"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default InputField;
