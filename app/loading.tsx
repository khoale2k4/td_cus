'use client'
import Image from "next/image";
import { FormattedMessage } from "react-intl";
export default function CustomLoadingElement() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center dark:text-white bg-white dark:bg-[#3a3b3c]">
      <Image src="/Logo.png" alt="Your image" width={70} height={70} />
      <span className="text-xl dark:text-white"><FormattedMessage id="LoadingMessage" /></span>
    </div>
  );
}
