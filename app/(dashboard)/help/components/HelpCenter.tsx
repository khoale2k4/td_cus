'use client'
import React from 'react';
import Card from '@/components/card';
import { FaInbox, FaCog, FaPlug, FaWhatsapp, FaSms, FaQuestionCircle } from 'react-icons/fa';
import { useSettingContext } from '@/providers/SettingProvider';

const sections = [
    {
        title: "Tính năng",
        items: [
            { id: 1, name: "Chương trình ưu đãi" },
            { id: 2, name: "Các kênh hỗ trợ khách hàng" },
            { id: 3, name: "Giới thiệu khách hàng" },
        ],
        icon: FaInbox
    },
    {
        title: "Thông tin",
        items: [
            { id: 4, name: "Quy trình vận hành đơn hàng" },
            { id: 5, name: "Phương thức thanh toán và chính sách trả trước" },
            { id: 6, name: "Bản giá dịch vụ" },
            { id: 7, name: "Điều khoản và chính sách" },
        ],
        icon: FaPlug
    },
    {
        title: "Hotline",
        items: [
            { id: 8, name: "Hỗ trợ nhanh" },
        ],
        icon: FaWhatsapp
    },
    {
        title: "Trò chuyện & hỗ trợ",
        items: [
            { id: 9, name: "Trò chuyện ngay" },
            { id: 10, name: "Gửi yêu cầu trợ giúp" },
        ],
        icon: FaSms
    },
    {
        title: "Khác",
        items: [
            { id: 11, name: "Các vấn đề khác" },
        ],
        icon: FaQuestionCircle
    },
    {
        title: "Cài đặt",
        items: [
            { id: 12, name: "Cài đặt tài khoản" }
        ],
        icon: FaCog
    },
];

const HelpCenter = () => {
    const { openSetting, setOpenSetting } = useSettingContext();

    const handleItemClick = (itemId: number) => {
        const selectedItem = sections.flatMap(section => section.items).find(item => item.id === itemId);
        if (selectedItem && selectedItem.name === "Cài đặt tài khoản") {
            setOpenSetting(true);
        }
    };

    return (
        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto no-scrollbar">
            {sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center my-4 flex-col justify-center gap-4">
                        <section.icon className="text-red-500 text-5xl" />
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                    </div>
                    <ul className="list-disc pl-5 font-sans">
                        {section.items.map((item, idx) => (
                            <li key={idx} className="dark:text-white text-gray-800 mb-2">
                                <a
                                    href="#"
                                    className="dark:text-white text-gray-800 font-semibold hover:underline"
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Card>
    );
};

export default HelpCenter;
