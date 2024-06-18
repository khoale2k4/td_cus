'use client'
import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { CollapseContext, useCollapseContext } from '../context/CollapseContext';
import { SourceContext } from '../context/SourceContext';
import { DistanceContext } from '../context/DistanceContext';
import { DestinationContext } from '../context/DestinationContext';
import Notification from '@/components/notification';
import { useRouter } from 'next/navigation';
import SubmitPopup from '@/components/submit';
import { PassDataContext } from '@/providers/PassedData';
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FormattedMessage, useIntl } from 'react-intl';

const AddPanel = () => {
    const { isCollapsed, setIsCollapsed } = useCollapseContext();
    //@ts-ignore
    const { source, setSource } = useContext(SourceContext);
    //@ts-ignore
    const { destination, setDestination } = useContext(DestinationContext);
    const [task, setTask] = useState<any>(null);
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [openError, setOpenError] = useState(false);
    const { passData, setPassData } = useContext(PassDataContext);
    const intl = useIntl();
    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    useEffect(() => {
        setIsCollapsed(false);
        return () => {
            setIsCollapsed(true);
        };
    }, []);
    return (
        <>
            <div className={`relative ${isCollapsed ? 'w-full h-8 sm:w-8 sm:h-full' : ' w-full h-[calc(100dvh-158px)] md:h-[calc(100dvh-128px)] sm:w-2/3 md:w-[550px]'} sticky z-[40] duration-500 ease-in-out`}>
                <div className={`border-8 border-white dark:border-[#242526] shadow-xl shadow-shadow-500 dark:shadow-none rounded-xl sm:rounded-tr-none sm:rounded-l-xl duration-500 ${isCollapsed ? 'opacity-0 h-8' : 'opacity-100 h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)]'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '200ms' }}>
                    <div className={`bg-white/10 backdrop-blur-sm dark:bg-[#1f1f1f4d] h-full rounded-[4px] sm:rounded-tr-none sm:rounded-l-[4px] duration-200 border-b-2 dark:border-b border-white/10 p-1.5 dark:border-white/30 flex flex-col gap-1.5 overflow-y-scroll no-scrollbar ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: isCollapsed ? '0ms' : '400ms' }}>

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
