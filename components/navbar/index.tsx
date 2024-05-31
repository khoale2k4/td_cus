"use client";

import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import Dropdown from "@/components/dropdown";
import routes from "@/data/routes";
import { useSidebarContext } from "@/providers/SidebarProvider";
import { useThemeContext } from "@/providers/ThemeProvider";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsGlobe } from "react-icons/bs";
import LanguageSwitcher from "../language";
import { FormattedMessage, useIntl } from "react-intl";
import { PartnerStaffOperation, StaffsOperation } from "@/TDLib/tdlogistics";
import { PassDataContext } from "@/providers/PassedData";
import NotiPopup from "../notification";
import SubmitPopup from "../submit";
import DetailPopup from "../popup";

type Props = {};

const Navbar = ({ }: Props) => {
  const [currentRoute, setCurrentRoute] = useState("Loading...");
  const route = useRouter();
  const pathname = usePathname();
  const { setOpenSidebar } = useSidebarContext();
  const { theme, setTheme } = useThemeContext();
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>(
    "/img/avatars/avatar_4.jpg"
  );
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { passData, setPassData } = useContext(PassDataContext)
  const intl = useIntl();
  const [message, setMessage] = useState("")
  const [modal, openModal] = useState(false)
  const [modal2, openModal2] = useState(false)
  const [modal3, openModal3] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      } else setIsSearchFocused(true);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
  }, [pathname]);

  const getActiveRoute = (routes: any) => {
    let activeRoute = "tasks";
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        setCurrentRoute(routes[i].path);
      }
    }
    return activeRoute;
  };

  const handleLogoutClick = async () => {
    setMessage(intl.formatMessage({ id: "Navbar.message2" }))
    openModal2(true);
  };

  const handleLogout = async () => {
    const action = new StaffsOperation()
    await action.logout()
    route.push("/");
  };

  const handleSearch = () => {
    if (search == "") return;
    //@ts-ignore
    window.find(search);
  };

  const checkUserLoggedIn = async () => {
    const getinfo = new PartnerStaffOperation()
    const staffsOperation = new StaffsOperation();
    const response = await getinfo.getAuthenticatedPartnerStaffInfo();
    const res = await staffsOperation.getAuthenticatedStaffInfo();
    console.log(response)
    console.log(res)
    if (!!response.error || response.error?.error || response.error == undefined) console.log(response)
    else if (!!response.data) { setPassData(response.data); setUsername(response.data.username) }

    if (!!res.error || res.error?.error || res.error == undefined) console.log(res)
    else if (!!res.data) { setPassData(res.data); setUsername(res.data.username) }

    if ((!!response.error && !!res.error) || (res.error == undefined && response.error == undefined)) {
      setMessage("Bạn cần đăng nhập để sử dụng chức năng này!")
      openModal(true)
    }
  }

  useEffect(() => {
    checkUserLoggedIn()
  }, []);

  return (
    <>
      {modal && <NotiPopup onClose={() => { openModal(false); route.push("/") }} message={message} />}
      {modal2 && <SubmitPopup onClose={() => { openModal2(false); }} message={message} submit={handleLogout} />}
      {modal3 && passData && <DetailPopup onClose={() => { openModal3(false) }} title="Thông tin nhân viên" children={
        <div className="flex flex-row gap-3 text-[#000000] dark:text-white">
          <div className="w-32 h-full flex-col">
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Họ và tên</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Tài khoản</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Email</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Số điện thoại</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Ngày sinh</span>
              <span className="font-semibold">:</span>
              {" "}
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">Vị trí</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between gap-2">
              <span className="font-semibold">CCCD</span>
              <span className="font-semibold">:</span>
            </p>
            <p className="whitespace-nowrap flex flex-row justify-between">
              <span className="font-semibold">Nơi ở</span>
              <span className="font-semibold">:</span>
            </p>
          </div>
          <div className="w-full h-full flex-col">
            <p className="whitespace-nowrap flex flex-row gap-2">
              {passData.fullname}
            </p>
            <p className="whitespace-nowrap flex flex-row gap-2">
              {passData.username}
            </p>
            <p className="flex flex-col sm:flex-row sm:gap-2">
              {passData.email}
            </p>
            <p className="whitespace-nowrap flex flex-row gap-2">
              {passData.phone_number}
            </p>
            <p className="whitespace-nowrap flex flex-row gap-2">
              {new Date(passData.date_of_birth).toLocaleDateString("en-US")}
            </p>
            <p className="whitespace-nowrap flex flex-row gap-2">
              {passData.position}
            </p>
            <p className="whitespace-nowrap flex flex-row gap-2">
              {passData.cccd}
            </p>
            <p className="flex flex-col">
              {passData.detail_address}, {passData.town}, {passData.district}, {passData.province}
            </p>
          </div>
        </div>
      } />}

      <nav className="sticky top-4 z-[45] flex flex-col md:flex-row md:justify-between h-full justify-start gap-4 flex-wrap items-center rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#242526]/20">
        <div className="ml-[6px] w-full md:w-[224px]">
          <div className="h-6 w-full pt-1 text-left">
            <Link
              className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
              href=" "
            >
              <FormattedMessage id="Navbar.Home" />
              <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                {" "}
                /{" "}
              </span>
            </Link>
            <Link
              className="text-sm font-bold text-navy-700 hover:underline dark:text-white dark:hover:text-white whitespace-nowrap"
              href="#"
            >
              {intl.formatMessage({ id: `routes.${currentRoute}` })}
            </Link>
          </div>
          <p className="shrink text-[33px] text-navy-700 dark:text-white">
            <Link
              href="#"
              className="font-bold hover:text-navy-700 dark:hover:text-white whitespace-nowrap hidden md:block"
            >
              {intl.formatMessage({ id: `routes.${currentRoute}` })}
            </Link>
          </p>
        </div>

        <div className="relative mt-[3px] flex h-[61px] w-full flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-[#242526] dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
          <div
            ref={containerRef}
            className={`relative flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]`}
          >
            <motion.button
              onClick={handleSearch}
              className={`absolute text-xl h-8 w-8 px-2 flex justify-center rounded-full place-items-center transition-all duration-500  ${isSearchFocused ? "bg-red-500 dark:bg-[#242526] shadow-sm" : ""
                } transform`}
              initial={{ left: 2 }}
              animate={{
                left: isSearchFocused ? "calc(100% - 2rem - 6px)" : "4px",
              }}
            >
              <FiSearch
                className={`h-4 w-4 dark:text-white ${isSearchFocused ? "text-white" : "text-gray-400"
                  }`}
              />
            </motion.button>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={intl.formatMessage({ id: "Navbar.Search" })}
              className={`block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c] dark:text-white dark:placeholder:!text-white transition-all duration-500 ${isSearchFocused ? "pl-4" : "pl-10"
                }`}
            />
          </div>
          <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
            onClick={() => setOpenSidebar(true)}
          >
            <FiAlignJustify className="h-5 w-5" />
          </span>
          <LanguageSwitcher />


          <div
            className="cursor-pointer text-gray-600"
            onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          >
            {theme === "dark" ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>

          <Dropdown
            button={
              <div className="avatar w-10 h-10 rounded-full">
                {profilePicture && <Image
                  src={profilePicture}
                  alt="avatar"
                  width={19200}
                  height={10800}
                  className="w-full h-full object-cover rounded-full"
                />}
              </div>
            }
            className={"py-2 top-8 -left-[180px] w-max"}
          >
            <div className="flex w-56 !z-50 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-[#242526] dark:text-white dark:shadow-none">
              <div className="p-3.5">
                <div className="flex items-center flex-col gap-.5">
                  <p className="text-sm font-normal text-navy-700 dark:text-white w-full text-center">
                    <FormattedMessage id="Navbar.Login" />
                  </p>
                  <p className="text-sm font-bold text-navy-700 dark:text-white text-center w-full overflow-hidden">
                    {username}
                  </p>{" "}
                </div>
              </div>
              <div className="flex flex-col pb-3 px-3 -mt-4">
                <button
                  onClick={() => { openModal3(true) }}
                  className="mt-3 text-sm font-medium text-navy-700 dark:text-white"
                >
                  <FormattedMessage id="Navbar.Info" />
                </button>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col pb-3 px-3">
                <button
                  onClick={handleLogoutClick}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  <FormattedMessage id="Navbar.Logout" />
                </button>
              </div>
            </div>
          </Dropdown>
        </div>
      </nav>
    </>

  );
};

export default Navbar;
