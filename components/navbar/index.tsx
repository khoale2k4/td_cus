"use client";

import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiImageEditLine, RiMoonFill, RiSunFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import Dropdown from "@/components/dropdown";
import routes from "@/data/routes";
import { useSidebarContext } from "@/providers/SidebarProvider";
import { useThemeContext } from "@/providers/ThemeProvider";
import Image from "next/image";
import { Variants, motion } from "framer-motion";
import { BsGlobe } from "react-icons/bs";
import LanguageSwitcher from "../language";
import { FormattedMessage, useIntl } from "react-intl";
import { usePassDataContext } from "@/providers/PassedData";
import NotiPopup from "../notification";
import SubmitPopup from "../submit";
import DetailPopup from "../popup";
import { AdministrativeOperation, BusinessOperation, CustomerOperation } from "@/TDLib/main";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import Select from "react-select";
import { useSettingContext } from "@/providers/SettingProvider";
type Props = {};

const Navbar = ({ }: Props) => {
  const [currentRoute, setCurrentRoute] = useState("Loading...");
  const route = useRouter();
  const pathname = usePathname();
  const { setOpenSidebar } = useSidebarContext();
  const { theme, setTheme } = useThemeContext();
  const [username, setUsername] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(
    "/img/avatars/avatar_4.jpg"
  );
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { passData, setPassData } = usePassDataContext()
  const intl = useIntl();
  const [message, setMessage] = useState("")
  const [modal, openModal] = useState(false)
  const [modal2, openModal2] = useState(false)
  const { openSetting, setOpenSetting } = useSettingContext()
  const [canUpload, setCanUpload] = useState(false)
  const [modal4, openModal4] = useState(false)
  const [modal5, openModal5] = useState(false)
  const [avatarUpload, setavatarUpload] = useState<File | "">("");
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [dataUpdate, setDataUpdate] = useState<any>()
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [selectedDistrict, setSelectedDistrict] = useState<any>("");
  const [selectedWard, setSelectedWard] = useState<any>("");
  const adminOperation = new AdministrativeOperation();
  const imgURL = "https://api.tdlogistics.net.vn/v2/customers/avatar/get?customerId="
  const getActiveRoute = (routes: any) => {
    let activeRoute = "orders";
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
    const action = new CustomerOperation()
    // await action.logout()
    localStorage.removeItem("token");
    route.push("/");
  };

  const handleSearch = () => {
    if (search == "") return;
    //@ts-ignore
    window.find(search);
  };

  const handleUploadAvatar = async () => {
    if (!avatarUpload) return;
    const customerOperation = new CustomerOperation()
    setLoading(true)
    const response = await customerOperation.updateAvatar({ avatar: avatarUpload })
    if (!response.error && !response.error?.error) {

      setProfilePicture(`${imgURL}${passData.id}`)
      setavatarUpload("")
    }
    setLoading(false)
  };

  const checkUserLoggedIn = async () => {
    const getinfo = new CustomerOperation()
    // const getinfo2 = new BusinessOperation()
    const token = localStorage.getItem("token") || "";
    const response = await getinfo.getAuthenticatedCustomerInfo(token);
    // const response2 = await getinfo2.getAuthenticatedInfo(token);
    // console.log("response2", response2)
    console.log("response", response)
    if (!response.error) {
      // setPassData(response.data);
      // setDataUpdate(response.data);
      // setUsername(response.data.email);
      // const response2 = await getinfo.getAvatar({ customerId: response.data.id })
      // setProfilePicture(response2.error == "" ? "/img/avatars/avatar_4.jpg" : `${imgURL}${response.data.id}`)
      // setCanUpload(true)
      const busOp = new BusinessOperation();
      const isBusiness = await busOp.searchBusinesses(
        {
          addition: {
            sort: [],
            page: 1,
            size: 1,
            group: []
          },
          criteria: [
          ]
        }
        , token);
      // console.log("business", isBusiness.data.length > 0)
      if(!isBusiness.data) return;
      if(isBusiness.data.length) {
        localStorage.setItem("isBussiness", "1")
      } else {
        localStorage.removeItem("isBussiness")
      }
    }
    else {
      route.push("/");
    }

    // if (!response2.error || response2.error == undefined) console.log(response2)
    // else if (!!response2.data) {
    //   setPassData(response2.data);
    //   setDataUpdate(response2.data);
    //   setUsername(response2.data.account.email);
    //   setProfilePicture("/img/avatars/avatar_4.jpg")
    // }
    // if (((!!response.error) || (response.error == undefined)) && ((!!response2.error) || (response2.error == undefined))) {
    //   setMessage(intl.formatMessage({ id: "Navbar.Message" }))
    //   openModal(true)
    // }
  }

  const handleInputChange = (key: string, value: string) => {
    setDataUpdate((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleProvinceChange = async (selectedOption: any) => {
    setSelectedProvince(selectedOption);
    const a = { province: selectedOption.value };
    setDataUpdate((prevState: any) => ({
      ...prevState,
      province: selectedOption.value,
      districts: null,
      ward: null,
    }));
    const response = await adminOperation.get(a);
    setDistricts(response.data);
    setSelectedDistrict(null);
    setSelectedWard(null)
  };

  const handleDistrictChange = async (selectedOption: any) => {
    setSelectedDistrict(selectedOption);
    const a = { province: selectedProvince.value, district: selectedOption.value };
    setDataUpdate((prevState: any) => ({
      ...prevState,
      district: selectedOption.value,
      ward: null,
    }));
    const response = await adminOperation.get(a);
    setWards(response.data);
    setSelectedWard(null)
  };

  const handleWardChange = (selectedOption: any) => {
    setSelectedWard(selectedOption);
    handleInputChange("town", selectedOption.value);
  };

  const sortData = (data: any) => {
    const cities = data.filter((item: any) => item.startsWith("Thành phố"));
    const provinces = data.filter((item: any) => !item.startsWith("Thành phố"));
    return cities.concat(provinces);
  };

  const fetchData = async () => {
    const response = await adminOperation.get({});
    if (response.data) {
      const data = sortData(response.data);
      setProvinces(data);
    }

  };

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
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme === "dark" ? "#FFFFFF" : "#000000",
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
      marginTop: "2px"
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#3A3B3C" : "#FFFFFF",
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      maxHeight: "150px",
      color: theme === "dark" ? "#ffffff" : "#3A3B3C",
      marginTop: "2px",
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? (theme === "dark" ? '#242526' : "#E2E8F0")  // Color for selected option
          : isFocused
            ? (theme === "dark" ? '#27282a' : "#d1d5db")  // Color for focused option
            : "transparent",
        color: isDisabled
          ? (theme === "dark" ? '#718096' : '#A0AEC0') // Disabled option text color
          : (theme === "dark" ? '#ffffff' : '#3A3B3C'), // Default option text color
      };
    },
    container: (provided: any, state: any) => ({
      ...provided,
      color: "#4a5568",
    }),
  };

  const submitClick = () => {
    if ((selectedProvince || selectedDistrict || selectedWard) && !(selectedProvince && selectedDistrict && selectedWard)) {
      setMessage(intl.formatMessage({ id: "Login.Message10" }))
      openModal4(true);
    } else if ((dataUpdate.fullname != passData.fullname) || (selectedProvince && selectedDistrict && selectedWard) || (dataUpdate.detailAddress != passData.detailAddress)) {
      setMessage(intl.formatMessage({ id: "Login.Message11" }))
      openModal5(true);
    } else {
      setEditing(false)
    }
  }

  const submitClick2 = async () => {
    const customerOperation = new CustomerOperation();
    let updateData: any = {};  // Initialize updateData as an empty object

    if (dataUpdate.fullname !== passData.fullname) {
      updateData.fullname = dataUpdate.fullname;
    }

    if (dataUpdate.detailAddress !== passData.detailAddress) {
      updateData.detailAddress = dataUpdate.detailAddress;
    }

    if (selectedProvince && selectedDistrict && selectedWard) {
      updateData.province = selectedProvince.value;
      updateData.district = selectedDistrict.value;
      updateData.ward = selectedWard.value;
    }

    const response = await customerOperation.updateInfo({ customerId: passData.id }, updateData);
    if (!response.error && !response.error?.error) {
      setPassData({ ...passData, ...updateData })
      setDataUpdate({ ...passData, ...updateData })
      setSelectedDistrict("")
      setSelectedProvince("")
      setSelectedWard("")
      setEditing(false)
      openModal5(false)
      setMessage(intl.formatMessage({ id: "Login.Message12" }))
      openModal4(true);
    } else {
      openModal5(false)
      setMessage(intl.formatMessage({ id: "Login.Message13" }))
      openModal4(true);
    }
  }

  useEffect(() => {
    checkUserLoggedIn();
    fetchData()
  }, []);

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

  return (
    <>
      {modal && <NotiPopup onClose={() => { openModal(false); route.push("/") }} message={message} />}
      {modal2 && <SubmitPopup onClose={() => { openModal2(false); }} message={message} submit={handleLogout} />}
      {modal4 && <NotiPopup onClose={() => { openModal4(false) }} message={message} />}
      {modal5 && <SubmitPopup onClose={() => { openModal5(false); }} message={message} submit={submitClick2} />}
      {openSetting && passData && <DetailPopup onClose={() => { setDataUpdate(passData); setavatarUpload(""); setSelectedDistrict(""); setSelectedProvince(""); setSelectedWard(""); setEditing(false); setOpenSetting(false); }} title={intl.formatMessage({ id: "Navbar.Title" })} className2="lg:w-fit" children={
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <div className="relative flex w-40 h-40 lg:w-60 lg:h-60 hover:cursor-pointer rounded-full overflow-hidden transition-all duration-500 cursor-pointer">
              <motion.img
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover"
                src={avatarUpload ? URL.createObjectURL(avatarUpload) : (profilePicture ? profilePicture : '/img/avatars/avatar_4.jpg')}
              // onClick={() => setModalIsOpen(true)}
              />
              {canUpload && <label className="absolute w-full h-20px py-2.5 bottom-0 inset-x-0 bg-[#000000]/50 
                  text-white text-2xl flex items-center hover:cursor-pointer justify-center 
                  active:scale-150 transition-all ease-in-out duration-500">
                <RiImageEditLine />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target?.files ? e.target?.files[0] : "";
                    setavatarUpload(file);
                  }}
                />
              </label>}
            </div>
          </div>
          {avatarUpload &&
            <div className="w-full flex justify-center">
              <button
                onClick={loading ? () => { } : handleUploadAvatar}
                className="linear w-full sm:w-2/3 border-2 rounded-xl h-10 text-base font-medium transition duration-200 dark:text-white flex justify-center place-items-center"
              >
                {loading ? <svg aria-hidden="true" className="w-20 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg> : <div className="flex gap-2 justify-center place-items-center"><IoCloudUploadOutline /><FormattedMessage id="Login.Message14" /></div>}
              </button>
            </div>
          }

          <div className="flex flex-row gap-3 text-[#000000] dark:text-white px-1">
            <div className="w-32 h-full flex-col flex gap-1">
              {canUpload && <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                <span className="font-semibold"><FormattedMessage id="Navbar.Info8" /></span>
                <span className="font-semibold">:</span>
              </p>}
              <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                <span className="font-semibold"><FormattedMessage id="Navbar.Info1" /></span>
                <span className="font-semibold">:</span>
              </p>
              <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                <span className="font-semibold"><FormattedMessage id="Navbar.Info3" /></span>
                <span className="font-semibold">:</span>
              </p>
              <p className="whitespace-nowrap flex flex-row justify-between">
                <span className="font-semibold"><FormattedMessage id="Navbar.Info7" /></span>
                <span className="font-semibold">:</span>
              </p>
            </div>
            <div className="w-full h-full flex-col flex gap-1 mb-4">
              {canUpload && <p className="whitespace-nowrap flex flex-row gap-2 relative">
                {editing ? <input
                  type="text"
                  className="focus:outline-none dark:bg-[#242526] w-full"
                  value={dataUpdate.fullname}
                  onChange={(e) => {
                    setDataUpdate({ ...dataUpdate, fullname: e.target.value })
                  }}
                /> : (passData.fullname ? passData.fullname : <FormattedMessage id="Login.Message15" />)}
                {editing && <span className="absolute bg-[#000000] dark:bg-gray-100 h-[1px] bottom-0 w-full" />}
              </p>}
              <p className="whitespace-nowrap flex flex-row gap-2">
                {passData.email ? passData.email : <FormattedMessage id="Login.Message15" />}
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                {passData.phoneNumber ? passData.phoneNumber : <FormattedMessage id="Login.Message15" />}
              </p>
              {editing ?
                <div className="flex flex-col gap-3">
                  <p className="relative flex">
                    <input
                      type="text"
                      className="focus:outline-none dark:bg-[#242526]"
                      value={dataUpdate.detailAddress}
                      onChange={(e) => {
                        setDataUpdate({ ...dataUpdate, detailAddress: e.target.value })
                      }}
                    />
                    <span className="absolute bg-[#000000] dark:bg-gray-100 h-[1px] bottom-0 w-full" />
                  </p>
                  <Select
                    id="city"
                    placeholder={intl.formatMessage({
                      id: "OrderForm.LocationForm.SelectProvince",
                    })}
                    aria-label=".form-select-sm"
                    className={`text-xs md:text-sm text-[#000000] focus:outline-none w-full text-center border rounded-md border-[#000000] dark:border-gray-100`}
                    value={selectedProvince}
                    onChange={handleProvinceChange}
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
                    className={`text-xs md:text-sm text-black focus:outline-none w-full text-center border rounded-md border-[#000000] dark:border-gray-100`}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
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
                    className={`text-xs md:text-sm text-black focus:outline-none w-full text-center border rounded-md border-[#000000] dark:border-gray-100`}
                    value={selectedWard}
                    onChange={handleWardChange}
                    //@ts-ignore
                    options={wards?.map((ward) => ({ value: ward, label: ward }))}
                    isSearchable
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    styles={styles}
                  />
                </div>
                :
                <p className="flex flex-col">
                  {(passData.detailAddress || passData.ward || passData.town || passData.district || passData.province) ? `${passData.detailAddress}, ${passData.ward ? passData.ward : passData.town}, ${passData.district}, ${passData.province}` : "Không có thông tin"}
                </p>
              }
            </div>
          </div>

        </div>
      }
        button={
          canUpload ? <div className="w-full flex bottom-0 bg-white pt-2 dark:bg-[#242526] gap-2">
            <Button
              onClick={editing ? submitClick : () => { setEditing(true) }}
              className="rounded-lg lg:h-11 w-full text-green-500 border-green-500 hover:border-green-600 bg-transparent hover:text-white border-2 hover:bg-green-600 hover:shadow-md flex sm:gap-2"
            >
              <FaPen /> {editing ? <FormattedMessage id="Login.Message16" /> : <FormattedMessage id="Login.Message17" />}
            </Button>
          </div> : <></>
        }
      />}

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
                {profilePicture && <img
                  src={avatarUpload ? URL.createObjectURL(avatarUpload) : (profilePicture ? profilePicture : '/img/avatars/avatar_4.jpg')}
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
                  onClick={() => { setOpenSetting(true) }}
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
