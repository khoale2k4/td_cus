"use client"
import React, { useEffect, useMemo, useState } from "react";
import Card from "@/components/card";
import Checkbox from "@/components/checkbox";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {
    MdCheckCircle,
    MdAddCircleOutline,
    MdNavigateNext,
    MdNavigateBefore,
    MdOutlineRemoveCircleOutline,
    MdPending,
    MdPendingActions,
} from "react-icons/md";
import Progress from "@/components/progress";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
// import DetailPopup from "./DetailPopup";
import { IoAddOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import NotiPopup from "@/components/notification";
import SubmitPopup from "@/components/submit";
import { usePassDataContext } from "@/providers/PassedData";
import { FormattedMessage, useIntl } from "react-intl";
import DetailOrder from "./DetailOrder";

type Props = {
    columnsData: any[];
    tableData: any[];
    reloadData: (option: number) => void;
    selectedOption: any;
    setSelectedOption: any
};

const CheckTable = (props: Props) => {
    const { columnsData, tableData, reloadData, selectedOption, setSelectedOption } = props;
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [openModal, setOpenModal] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openError2, setOpenError2] = useState(false);
    const [message, setMessage] = useState("");
    const { passData, setPassData } = usePassDataContext();
    const [dataRow, setDataRow] = useState<any>();
    const handleClodeModal = () => {
        setOpenModal(false);
    };
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPageInput, setCurrentPageInput] = useState(1);
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                selectedRowIds: Array.from(selectedRows).reduce((acc: any, val) => {
                    acc[val] = true;
                    return acc;
                }, {}),
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    const intl = useIntl();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        gotoPage,
        pageCount,
        state: { pageIndex },
        setGlobalFilter,
    } = tableInstance;

    useEffect(() => {
        setCurrentPageInput(pageIndex + 1);
    }, [pageIndex]);

    const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value > 0 && value <= pageCount) {
            setCurrentPageInput(value);
            gotoPage(value - 1);
        } else if (e.target.value === '') {
            setCurrentPageInput(0);
        }
    };
    return (
        <Card className={"w-full sm:overflow-auto p-4"}>
            {openModal && (
                <DetailOrder
                    onClose={handleClodeModal}
                    dataInitial={dataRow.order}
                />
            )}
            {openError && <NotiPopup message={message} onClose={() => { setOpenError(false); reloadData(0) }} />}
            {openError2 && <NotiPopup message={message} onClose={() => { setOpenError2(false) }} />}
            <div className="flex justify-between items-center flex-col lg:flex-row">
                <div className="flex flex-col lg:flex-row gap-3 h-full mb-2 lg:mb-0 w-full place-items-center">
                    <div
                        className={`relative flex items-center bg-lightPrimary rounded-full text-navy-700 dark:bg-[#3A3B3C] dark:text-white lg:w-[300px] w-full`}
                    >
                        <motion.button
                            className={`text-xl h-10 w-8 px-2 ml-2 flex justify-center rounded-full place-items-center`}
                            initial={{ left: 2 }}
                        >
                            <FiSearch
                                className={`h-4 w-4 text-navy-800 dark:text-white `}
                            />
                        </motion.button>
                        <input
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                setGlobalFilter(e.target.value)
                            }}
                            type="text"
                            placeholder={intl.formatMessage({ id: "Navbar.Search" })}
                            className={`block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-800 dark:text-white  placeholder:text-navy-800 placeholder:dark:text-gray-300
            outline-none dark:bg-[#3A3B3C]  pl-1 pr-3`}
                        />
                    </div>
                    <Dropdown className={`z-30`}>
                        <DropdownTrigger>
                            <Button className="text-sm h-10 border-gray-600 rounded px-4 text-center bg-lightPrimary dark:bg-[#3A3B3C]" >
                                <span className="rounded-full font-medium font-sans">{intl.formatMessage({ id: `Mission.Filter${selectedOption + 1}` })}</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            className="bg-white border border-gray-300 no-scrollbar rounded-md max-h-80 overflow-y-auto w-full dark:bg-[#3A3B3C]"
                            aria-labelledby="dropdownMenuButton2"
                            key="dropdownMenuButton2"
                        >
                            <DropdownItem key="filter_all" textValue="filter_all">
                                <Button
                                    aria-label="dropdownItem1"
                                    className={`text-center text-black w-32 rounded-md px-2 ${selectedOption === 0 ? "bg-blue-500 text-white" : "dark:text-white"}`}
                                    onClick={() => setSelectedOption(0)}
                                >
                                    <FormattedMessage id="Mission.Filter1" />
                                </Button>
                            </DropdownItem>
                            <DropdownItem key="filter_today" textValue="filter_today">
                                <Button
                                    aria-label="dropdownItem2"
                                    className={`text-center text-black w-32 rounded-md px-2 ${selectedOption === 1 ? "bg-blue-500 text-white" : "dark:text-white"}`}
                                    onClick={() => setSelectedOption(1)}
                                >
                                    <FormattedMessage id="Mission.Filter2" />
                                </Button>
                            </DropdownItem>
                            <DropdownItem key="filter_this_week" textValue="filter_this_week">
                                <Button
                                    aria-label="dropdownItem3"
                                    className={`text-center text-black w-32 rounded-md px-2 ${selectedOption === 2 ? "bg-blue-500 text-white" : "dark:text-white"}`}
                                    onClick={() => setSelectedOption(2)}
                                >
                                    <FormattedMessage id="Mission.Filter3" />
                                </Button>
                            </DropdownItem>
                            <DropdownItem key="filter_this_month" textValue="filter_this_month">
                                <Button
                                    aria-label="dropdownItem3"
                                    className={`text-center text-black w-32 rounded-md px-2 ${selectedOption === 3 ? "bg-blue-500 text-white" : "dark:text-white"}`}
                                    onClick={() => setSelectedOption(3)}
                                >
                                    <FormattedMessage id="Mission.Filter4" />
                                </Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="gap-2 h-full hidden lg:flex">
                    <input
                        type="string"
                        value={currentPageInput}
                        onChange={handlePageInputChange}
                        className="w-10 text-center focus:outline-none font-semibold dark:bg-[#3A3B3C] bg-lightPrimary dark:text-white flex items-center rounded-full"
                    />
                    <Button className={`flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-navy-800 dark:text-white  border 
            border-gray-200 dark:!border-none hover:bg-gray-100 dark:bg-[#3A3B3C] dark:hover:bg-white/20 dark:active:bg-white/10
              linear justify-center rounded-full font-bold transition duration-200`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <MdNavigateBefore className="w-6 h-6" />
                    </Button>

                    <Button className={`flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-navy-800 dark:text-white  border 
            border-gray-200 dark:!border-none hover:bg-gray-100 dark:bg-[#3A3B3C] dark:hover:bg-white/20 dark:active:bg-white/10
              linear justify-center rounded-full font-bold transition duration-200`} onClick={() => nextPage()} disabled={!canNextPage}>
                        <MdNavigateNext className="w-6 h-6" />
                    </Button>
                </div>
            </div>
            {tableData.length == 0 ? <div className="h-full flex w-full place-items-center text-center justify-center"><FormattedMessage id="History.Message" /></div>
                : <div className="mt-4 sm:mt-8 overflow-x-auto no-scrollbar md:scrollbar h-full">
                    <table {...getTableProps()} className="w-full" color="gray-500">
                        <thead>
                            {headerGroups.map((headerGroup, index) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                    {headerGroup.headers.map((column, index) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={`border-b border-gray-200 pb-[10px] dark:!border-[#3A3B3C]`}
                                            key={index}
                                        >
                                            <div className={`text-xs font-bold tracking-wide text-gray-600 lg:text-xs whitespace-nowrap ${column.render("Header") == "order.detail" ? "text-end" : "text-start pr-4 lg:pr-0"}`}>
                                                {column.render("Header") == "Checkbox" ? <Checkbox checked={selectedRows.size === tableData.length} onChange={() => { }} />
                                                    : intl.formatMessage({ id: column.render("Header")?.toString() })}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, rowIndex) => {
                                prepareRow(row);
                                const isSelected = selectedRows.has(rowIndex);
                                const rowClassName = isSelected
                                    ? `dark:bg-[#3A3B3C] bg-gray-200 dark:!border-[#3A3B3C] border-b`
                                    : `dark:!border-[#3A3B3C] border-b`;
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        key={rowIndex}
                                        className={rowClassName}
                                    >
                                        {row.cells.map((cell, cellIndex) => {
                                            let renderData;
                                            if (cell.column.Header !== "order.detail") {
                                                renderData = (
                                                    <p className="mt-1 text-sm font-bold text-navy-700 dark:text-white pr-4 whitespace-nowrap">
                                                        {cell.value}
                                                    </p>
                                                );
                                            } else if (cell.column.Header === "order.detail") {
                                                renderData = (
                                                    <div className="w-full flex justify-end">
                                                        <Button
                                                            onClick={() => {
                                                                setDataRow(row.original)
                                                                setOpenModal(true);
                                                            }}
                                                            className={`flex items-center hover:cursor-pointer bg-lightPrimary p-2 h-8 w-8 rounded-full text-navy-800 dark:text-white  border 
                            border-gray-200 dark:!border-none hover:bg-gray-100 dark:bg-[#3A3B3C] dark:hover:bg-white/20 dark:active:bg-white/10
                              linear justify-center font-bold transition duration-200 mr-2`}
                                                        >
                                                            <IoAddOutline className="w-full h-full font-bold" />
                                                        </Button>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    key={cellIndex}
                                                    className="pt-[14px] pb-[16px] sm:text-[14px]"
                                                >
                                                    {renderData}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>}
            <div className="gap-2 justify-center flex lg:hidden h-10">

                <Button className={`flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-navy-800 dark:text-white  border 
            border-gray-200 dark:!border-none hover:bg-gray-100 dark:bg-[#3A3B3C] dark:hover:bg-white/20 dark:active:bg-white/10
              linear justify-center rounded-full font-bold transition duration-200`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <MdNavigateBefore className="w-6 h-6" />
                </Button>
                <input
                    type="string"
                    value={currentPageInput}
                    onChange={handlePageInputChange}
                    className="w-10 text-center focus:outline-none font-semibold dark:bg-[#3A3B3C] bg-lightPrimary dark:text-white flex items-center rounded-full"
                />
                <Button className={`flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-navy-800 dark:text-white  border 
            border-gray-200 dark:!border-none hover:bg-gray-100 dark:bg-[#3A3B3C] dark:hover:bg-white/20 dark:active:bg-white/10
              linear justify-center rounded-full font-bold transition duration-200`} onClick={() => nextPage()} disabled={!canNextPage}>
                    <MdNavigateNext className="w-6 h-6" />
                </Button>
            </div>
        </Card>
    );
};

export default CheckTable;
