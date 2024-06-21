import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import DetailPopup from "@/components/popup";
import JourneyTimeline from "./Timeline";


interface DetailOrderProps {
    onClose: () => void;
    dataInitial: any;
}

interface JourneyItem {
    time: string;
    title: string;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
    const intl = useIntl()
    const parseJourney = [...dataInitial.journey].reverse().map((item: string) => {
        const [time, title] = item.split(': ');
        return { time, title };
    });
    return (
        <DetailPopup className2="sm:w-fit" children={
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <JourneyTimeline journey={parseJourney} />
                <div className="w-full text-[#4b4b4b] dark:text-white">
                    <div className="flex flex-col gap-2">
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Tên người gửi</strong>
                                :</div> {dataInitial.nameSender}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>SĐT người gửi</strong>
                                :</div> {dataInitial.phoneNumberSender}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Tên người nhận</strong>
                                :</div> {dataInitial.nameReceiver}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>SĐT người nhận</strong>
                                :</div> {dataInitial.phoneNumberReceiver}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Địa chỉ gửi</strong>
                                :</div> {`${dataInitial.detailSource}, ${dataInitial.wardSource}, ${dataInitial.districtSource}, ${dataInitial.provinceSource}`}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Địa chỉ nhận</strong>
                                :</div> {`${dataInitial.detailDest}, ${dataInitial.wardDest}, ${dataInitial.districtDest}, ${dataInitial.provinceDest}`}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Khối lượng (g)</strong>
                                :</div> {dataInitial.mass}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Chiều cao (cm)</strong>
                                :</div> {dataInitial.height}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Chiều rộng (cm)</strong>
                                :</div> {dataInitial.width}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Chiều dài (cm)</strong>
                                :</div> {dataInitial.length}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>COD</strong>
                                :</div> {dataInitial.cod}</div>
                        <div className='flex gap-2'>
                            <div className='w-32 min-w-[128px] flex justify-between'>
                                <strong>Loại dịch vụ</strong>
                                :</div>
                            {dataInitial.serviceType == "CPN" ?
                                intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery1' })
                                : dataInitial.serviceType == "TTk" ?
                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery3' })
                                    :
                                    intl.formatMessage({ id: 'OrderForm.MoreDetailsForm.typesOfDelivery4' })}
                        </div>
                    </div>
                </div>
            </div>} onClose={onClose} title={"Thông tin đơn hàng"} />

    );
};

export default DetailOrder;