'use client'
import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { CollapseContext } from '../context/CollapseContext';
import { SourceContext } from '../context/SourceContext';
import { DistanceContext } from '../context/DistanceContext';
import { DestinationContext } from '../context/DestinationContext';
import Notification from '@/components/notification';
import { useRouter } from 'next/navigation';
import SubmitPopup from '@/components/submit';
import { PassDataContext } from '@/providers/PassedData';
import { DriversOperation, ShippersOperation } from '@/TDLib/tdlogistics';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FormattedMessage, useIntl } from 'react-intl';
import { FiCamera } from 'react-icons/fi';
import QRscanner from './Driver/QRScanner';
import TaskCard from './Driver/MissionCard';
import MissionCard from './Shipper/MissionCard';

const AddPanel = () => {
    //@ts-ignore
    const { isCollapsed, setIsCollapsed } = useContext(CollapseContext);
    //@ts-ignore
    const { source, setSource } = useContext(SourceContext);
    //@ts-ignore
    const { destination, setDestination } = useContext(DestinationContext);
    // @ts-ignore
    const { distance, setDistance } = useContext(DistanceContext);
    const [task, setTask] = useState<any>(null);
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [openError, setOpenError] = useState(false);
    const { passData, setPassData } = useContext(PassDataContext);
    const tasks = new ShippersOperation();
    const drivertasks = new DriversOperation();
    const [selectedOption, setSelectedOption] = useState(0);
    const intl = useIntl();
    const [searchValue, setSearchValue] = useState("");
    const [sortedData, setSortedData] = useState<any>([]);
    const [openScanner, setOpenScanner] = useState(false);

    const handleSearchInputChange = (event: any) => {
        setSearchValue(event.target.value);
    };

    const sortData = () => {
        if (!task || task.length === 0) {
            setSortedData([]);
            return;
        }

        const sorted = [...task].filter(item => {
            if (searchValue.trim() !== "") {
                return item.shipment_id.toString().includes(searchValue.toString());
            } else {
                return true;
            }
        });

        setSortedData(sorted);
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        setIsCollapsed(false);
        return () => {
            setIsCollapsed(true);
            setDestination(null);
            setSource(null);
            setDistance(null);
        };
    }, []);

    const handleFetchTask = async (option: number) => {
        setTask(null);
        let response = null;
        if (passData?.role == "PARTNER_DRIVER") {
            response = await drivertasks.getTask({ option: option });
        } else {
            response = await tasks.getTask({ option: option });
        }

        if (!!response.error || !!response.error.error) {
            setMessage(response.message);
            setOpenError(true);
        } else setTask(response.data);
    };

    const handleReloadData = async () => {
        handleFetchTask(selectedOption);
    };

    useEffect(() => {
        if (passData && passData.role) {
            handleFetchTask(selectedOption);
        }
    }, [passData, selectedOption]);

    useEffect(() => {
        sortData();
    }, [task, searchValue]);

    return (
        <>
            <div className={`relative ${isCollapsed ? 'w-full h-8 sm:w-8 sm:h-full' : ' w-full h-[calc(100dvh-158px)] md:h-[calc(100dvh-128px)] sm:w-2/3 md:w-[550px]'} sticky z-[40] duration-500 ease-in-out`}>
                <div className={`border-8 border-white dark:border-[#242526] shadow-xl shadow-shadow-500 dark:shadow-none rounded-xl sm:rounded-tr-none sm:rounded-l-xl duration-500 ${isCollapsed ? 'opacity-0 h-8' : 'opacity-100 h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)]'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '200ms' }}>
                    <div className={`bg-white/10 backdrop-blur-sm dark:bg-[#1f1f1f4d] h-full rounded-[4px] sm:rounded-tr-none sm:rounded-l-[4px] duration-200 border-b-2 dark:border-b border-white/10 p-1.5 dark:border-white/30 flex flex-col gap-1.5 overflow-y-scroll no-scrollbar ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '400ms' }}>
                        {openScanner && ReactDOM.createPortal(
                            <QRscanner onClose={() => setOpenScanner(false)} data={searchValue} setData={setSearchValue} />,
                            document.body
                        )}

                        <div className='bg-white dark:bg-[#242526] dark:text-white rounded-md'>
                            {passData?.role == "PARTNER_DRIVER" && <div className="w-full px-1 sm:px-2">
                                <div className={`bg-white dark:bg-[#3A3B3C] w-full flex rounded-md border dark:border-none text-black mt-1 md:mt-2`}>
                                    <input className="grow py-2 px-3 rounded-l-lg dark:bg-[#3A3B3C] text-md"
                                        placeholder={intl.formatMessage({ id: "Task.SearchBox" })}
                                        value={searchValue} onChange={(e) => handleSearchInputChange(e)} />
                                    <Button className="px-3 rounded-r-lg"
                                        onClick={() => setOpenScanner(true)}
                                    >
                                        <FiCamera className="text-gray-500" />
                                    </Button>
                                </div>
                            </div>
                            }
                            <Dropdown className={`z-30`}>
                                <DropdownTrigger>
                                    <button className={`text-black dark:text-white p-2 w-full focus:outline-none font-sans`} >
                                        <span className=" rounded-full font-medium">{intl.formatMessage({ id: `Mission.Filter${selectedOption + 1}` })}</span>
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    className="bg-white dark:bg-[#242526] border border-gray-300 no-scrollbar rounded-xl py-3 shadow max-h-80 overflow-y-auto min-w-[calc(100vw-80px)] sm:min-w-[200px]"
                                    aria-labelledby="dropdownMenuButton2"
                                    key="dropdownMenuButton2"
                                >
                                    <DropdownItem key="filter_all" textValue="filter_all">
                                        <Button
                                            aria-label="dropdownItem1"
                                            className={`text-center text-black min-w-[calc(100vw-80px)] sm:min-w-[200px] rounded-md px-2 py-1 ${selectedOption === 0 ? "bg-red-500 text-white" : "dark:text-white"}`}
                                            onClick={() => setSelectedOption(0)}
                                        >
                                            <FormattedMessage id="Mission.Filter1" />
                                        </Button>
                                    </DropdownItem>
                                    <DropdownItem key="filter_today" textValue="filter_today">
                                        <Button
                                            aria-label="dropdownItem2"
                                            className={`text-center text-black min-w-[calc(100vw-80px)] sm:min-w-[200px] rounded-md px-2 py-1 ${selectedOption === 1 ? "bg-red-500 text-white" : "dark:text-white"}`}
                                            onClick={() => setSelectedOption(1)}
                                        >
                                            <FormattedMessage id="Mission.Filter2" />
                                        </Button>
                                    </DropdownItem>
                                    <DropdownItem key="filter_this_week" textValue="filter_this_week">
                                        <Button
                                            aria-label="dropdownItem3"
                                            className={`text-center text-black min-w-[calc(100vw-80px)] sm:min-w-[200px] rounded-md px-2 py-1 ${selectedOption === 2 ? "bg-red-500 text-white" : "dark:text-white"}`}
                                            onClick={() => setSelectedOption(2)}
                                        >
                                            <FormattedMessage id="Mission.Filter3" />
                                        </Button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        {passData && sortedData != null ?
                            (sortedData.length == 0 ?
                                <div className='w-full h-full bg-white dark:text-white rounded-md dark:bg-[#242526] flex justify-center place-items-center'>
                                    <FormattedMessage id="Task.NoTask" />
                                </div>
                                :
                                <>
                                    {(
                                        sortedData.map((data: any, index: number) => (
                                            passData.role !== "PARTNER_DRIVER" ? (
                                                <MissionCard data={data}
                                                    toggle={handleToggleCollapse}
                                                    keyName={`taskcard_${index}`}
                                                    reloadData={handleReloadData} />
                                            ) : (
                                                <TaskCard data={data}
                                                    toggle={handleToggleCollapse}
                                                    keyName={`taskcard_${index}`}
                                                    reloadData={handleReloadData} />
                                            )
                                        ))
                                    )}
                                    <div className='h-20 w-full'></div>
                                </>
                            ) : <div className='h-full w-full flex justify-center place-items-center'>
                                <svg aria-hidden="true" className="w-20 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>}
                    </div>
                </div>
                <Button
                    className={`absolute -bottom-3 sm:top-[20.3px] dark:text-white text-gray-400
                hover:cursor-pointer rounded-full flex focus:outline-none transition-all duration-500
                ${isCollapsed ? 'transform -translate-y-1/2 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-0 shadow h-8 w-8 bg-white dark:bg-[#242526]' :
                            'transform right-1/2 translate-x-1/2 sm:-translate-y-[calc(50%)] sm:translate-x-0 -bottom-2 sm:border-none h-8 w-8 sm:-right-5 sm:w-14 sm:h-10 sm:justify-end'}`}
                    onClick={handleToggleCollapse}
                >
                    <div className='absolute w-full top-0 h-1/3 bg-white dark:bg-[#242526] sm:hidden'></div>
                    <FaAngleDoubleLeft className={`absolute bg-white dark:text-gray-300 dark:bg-[#242526] h-10 ${isCollapsed ? "-rotate-90 sm:rotate-180" : "rotate-90 sm:rotate-0 mb-2 sm:mb-0 sm:pr-3 sm:-right-1 sm:w-[45%]"}`} />
                </Button>
            </div>
        </>
    );
};

export default AddPanel;
