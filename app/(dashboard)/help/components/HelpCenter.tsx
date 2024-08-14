'use client'
import React from 'react';
import Card from '@/components/card';
import { FaInbox, FaCog, FaPlug, FaWhatsapp, FaSms, FaQuestionCircle } from 'react-icons/fa';
import { useSettingContext } from '@/providers/SettingProvider';
import { useIntl } from 'react-intl';


const HelpCenter = () => {
    const { openSetting, setOpenSetting } = useSettingContext();
    const intl = useIntl();
    const sections = [
        {
            title: intl.formatMessage({ id: "Help.Title1" }),
            items: [
                { id: 1, name: intl.formatMessage({ id: "Help.Title1.Info1" }) },
                { id: 2, name: intl.formatMessage({ id: "Help.Title1.Info2" }) },
                { id: 3, name: intl.formatMessage({ id: "Help.Title1.Info3" }) },
            ],
            icon: FaInbox
        },
        {
            title: intl.formatMessage({ id: "Help.Title2" }),
            items: [
                { id: 4, name: intl.formatMessage({ id: "Help.Title2.Info1" }) },
                { id: 5, name: intl.formatMessage({ id: "Help.Title2.Info2" }) },
                { id: 6, name: intl.formatMessage({ id: "Help.Title2.Info3" }) },
                { id: 7, name: intl.formatMessage({ id: "Help.Title2.Info4" }) },
            ],
            icon: FaPlug
        },
        {
            title: intl.formatMessage({ id: "Help.Title3" }),
            items: [
                { id: 8, name: intl.formatMessage({ id: "Help.Title3.Info1" }) },
            ],
            icon: FaWhatsapp
        },
        {
            title: intl.formatMessage({ id: "Help.Title4" }),
            items: [
                { id: 9, name: intl.formatMessage({ id: "Help.Title4.Info1" }) },
                { id: 10, name: intl.formatMessage({ id: "Help.Title4.Info2" }) },
            ],
            icon: FaSms
        },
        {
            title: intl.formatMessage({ id: "Help.Title5" }),
            items: [
                { id: 11, name: intl.formatMessage({ id: "Help.Title5.Info1" }) },
            ],
            icon: FaQuestionCircle
        },
        {
            title: intl.formatMessage({ id: "Help.Title6" }),
            items: [
                { id: 12, name: intl.formatMessage({ id: "Help.Title6.Info1" }) }
            ],
            icon: FaCog
        },
    ];

    const handleItemClick = (itemId: number) => {
        const selectedItem = sections.flatMap(section => section.items).find(item => item.id === itemId);
        if (selectedItem && selectedItem.name === intl.formatMessage({ id: "Help.Title6.Info1" })) {
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
