"use client";
import { FC, useEffect, useState } from "react";
import InputField from "@/components/fields/InputField";
import FixedPlugin from "@/components/fixedPlugin/FixedPlugin";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import ParticlesBackground from "@/components/Particle";
import NotiPopup from "@/components/notification";
import { useRouter } from "next/navigation";
import { FormattedMessage, useIntl } from "react-intl";
import { PartnerStaffAuthenticate, PartnerStaffOperation, StaffsAuthenticate, StaffsOperation } from "@/TDLib/tdlogistics";
import LanguageSwitcher from "@/components/language";
type Props = {};

const AuthPage: FC<Props> = () => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [role, setRole] = useState(1);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const [loading, setLoading] = useState(false)
  const intl = useIntl();

  const handleCheckField = () => {
    if (!account || !password) {
      setError(true);
      setMessage(intl.formatMessage({ id: "Login.Message1" }));
      setModal(true);
      return true;
    }
    return false;
  };

  const handleSignUpButton = async () => {
    if (handleCheckField()) return;
    setLoading(true)
    if (role == 2) {
      const agency = new PartnerStaffAuthenticate()
      const response = await agency.login(account, password)
      console.log(response)
      if (!response.error) {
        setMessage(intl.formatMessage({ id: "Login.Message2" }));
        setModal(true)
      } else {
        setError(true)
        setMessage(intl.formatMessage({ id: "Login.Message3" }))
        setModal(true)
      }
      // res = await getinfo.getAuthenticatedPartnerStaffInfo()
    }
    else {
      const staffsAuthenticate = new StaffsAuthenticate();
      const response = await staffsAuthenticate.login(account, password)
      console.log(response)
      if (response.valid == true && response.error == false) {
        setMessage(intl.formatMessage({ id: "Login.Message2" }));
        setModal(true)
      } else {
        setError(true)
        setMessage(intl.formatMessage({ id: "Login.Message3" }))
        setModal(true)
      }
      // res = await staffsOperation.getAuthenticatedStaffInfo();
    }
    setLoading(false)
  };

  const handleNotificationClose = async () => {
    setModal(false);
    if (!error) {
      route.push("/tasks");
    } else setError(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSignUpButton();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [account, password]);

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-[#242526]">
        <ParticlesBackground />
        {modal && (
          <NotiPopup message={message} onClose={handleNotificationClose} />
        )}
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex h-screen">
            <div className="mx-auto flex min-h-full h-full w-full flex-col justify-start">
              <div className="flex lg:w-[51vw] 2xl:w-[45vw] items-center justify-center lg:items-center lg:justify-start h-full px-4 sm:px-8 md:px-16 lg:px-28">
                {/* Sign in section */}
                <div className="w-full flex-col items-center md:pl-4 lg:pl-0">
                  <div className="flex justify-between">
                    <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                      <FormattedMessage id="Login.Login" />
                    </h4>
                    <FixedPlugin />
                  </div>

                  <p className="mb-9 ml-1 text-base text-gray-600">
                    <FormattedMessage id="Login.Login2" />
                  </p>
                  <div
                    onClick={() => { setRole(role == 1 ? 2 : 1) }}
                    className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-white border hover:cursor-pointer dark:bg-[#3a3b3c]">
                    <button
                      className="flex items-center gap-2"
                    >
                      <Image src="/Logo.png" alt="Your image" width={20} height={20} />
                      <span className="text-[14px] font-medium text-[#000000] dark:text-white font-sans">
                        {role == 1 ? <FormattedMessage id="Login.Role" /> : <FormattedMessage id="Login.Role2" />}
                      </span>
                    </button>
                  </div>
                  <div className="mb-6 flex items-center  gap-3">
                    <div className="h-px w-full bg-gray-200" />
                    <p className="text-base text-gray-600 dark:text-white">
                      {" "}
                      <FormattedMessage id="Login.Or" />{" "}
                    </p>
                    <div className="h-px w-full bg-gray-200" />
                  </div>
                  <div className="mb-6 flex items-center place-items-center">
                    <p className="text-base w-full text-center font-bold dark:text-white font-sans">
                      {" "}
                      {role == 1 ? <FormattedMessage id="Login.Role3" /> : <FormattedMessage id="Login.Role4" />}{" "}
                    </p>
                  </div>
                  {/* account */}
                  <InputField
                    variant="auth"
                    extra="mb-3"
                    label={intl.formatMessage({ id: "Login.Box1" })}
                    placeholder={intl.formatMessage({ id: "Login.PlaceHolder" })}
                    id="account"
                    type="text"
                    value={account}
                    setValue={setAccount}
                    className="bg-white dark:!bg-[#3a3b3c]"
                  />
                  <InputField
                    variant="auth"
                    extra="mb-3"
                    label={intl.formatMessage({ id: "Login.Box2" })}
                    placeholder={intl.formatMessage({ id: "Login.PlaceHolder2" })}
                    id="password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    className="bg-white dark:!bg-[#3a3b3c]"
                  />
                  <div className="flex mt-6 gap-3">

                    <button
                      onClick={loading ? () => { } : handleSignUpButton}
                      className="linear w-full rounded-xl bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                    >
                      {loading ? <svg aria-hidden="true" className="w-20 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg> : <FormattedMessage id="Login.Submit" />}
                    </button>
                    <div className="h-full bg-red-500 py-[15px] rounded-full text-white px-3.5 flex justify-center place-items-center">
                      <LanguageSwitcher message="h-5 w-5 text-white" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="absolute right-0 hidden h-screen lg:block lg:w-[49vw] 2xl:w-[55vw]">
                <Carousel
                  additionalTransfrom={0}
                  draggable
                  keyBoardControl
                  autoPlay
                  showDots={false}
                  autoPlaySpeed={3000}
                  shouldResetAutoplay={true}
                  swipeable
                  minimumTouchDrag={80}
                  responsive={{
                    res1: {
                      breakpoint: { max: 40000, min: 0 },
                      items: 1,
                      partialVisibilityGutter: 0,
                    },
                  }}
                  containerClass="flex h-full w-full"
                  rewind={true}
                  pauseOnHover={false}
                  rewindWithAnimation={true}
                  arrows={false}
                  transitionDuration={1000}
                >
                  <div className="h-screen">
                    <Image
                      src={"/img/auth/auth.png"}
                      alt={`Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="h-screen">
                    <Image
                      src={"/img/auth/hcmut.jpg"}
                      alt={`Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthPage;
