import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import DetailPopup from "@/components/popup";
import { OrdersOperation } from "@/TDLib/tdlogistics";
import { UpdatingOrderImageCondition } from "@/TDLib/tdlogistcs";
import { Button } from "@nextui-org/react";
import { CarouselSlider } from "@/components/slider";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";


interface DetailOrderProps {
    onClose: () => void;
    dataInitial: any;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrls2, setImageUrls2] = useState<string[]>([]);
    const ordersOperation = new OrdersOperation();
    const [option, setOption] = useState<null | number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sendSignatureCondition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "send"
                };
                const receiveSignatureCondition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "receive"
                };
                const sendSignatureUrl = await ordersOperation.getSignature(sendSignatureCondition);
                const receiveSignatureUrl = await ordersOperation.getSignature(receiveSignatureCondition);

                const sendImagesCondition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "send"
                };
                const sendImages = await ordersOperation.getImage(sendImagesCondition);
                setImageUrls([...sendImages.map((image: any) => image), ...sendSignatureUrl.map((image: any) => image)]);
                const receiveImagesCondition: UpdatingOrderImageCondition = {
                    order_id: dataInitial.order_id,
                    type: "receive"
                };
                const receiveImages = await ordersOperation.getImage(receiveImagesCondition);
                setImageUrls2([...receiveImages.map((image: any) => image), ...receiveSignatureUrl.map((image: any) => image)]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <DetailPopup children={
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full md:w-1/2 px-2 md:pr-4 mb-4">
                    <div className="flex flex-col gap-1 place-items-center w-full justify-center ">
                        <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300 dark:bg-[#242526]" onClick={() => setOption(0)}>
                            {option === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1 font-bold text-base w-40 font-sans"><FormattedMessage id="Mission.AddImage.Button1" /></span>
                        </Button>
                        <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300 dark:bg-[#242526]" onClick={() => setOption(1)}>
                            {option === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1 font-bold text-base w-40 font-sans"><FormattedMessage id="Mission.AddImage.Button2" /></span>
                        </Button>
                    </div>
                    {imageUrls && option === 0 && <div className="relative"><CarouselSlider ObjUrls={imageUrls} /></div>}
                    {imageUrls2 && option === 1 && <div className="relative"><CarouselSlider ObjUrls={imageUrls2} /></div>}
                </div>
                <div className="flex flex-row gap-3 text-[#000000] dark:text-white md:w-1/2">
                    <div className="w-50 h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Mã đơn hàng</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Tên người gửi</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Địa chỉ người gửi</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Số điện thoại người gửi</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Tên người nhận</span>
                            <span className="font-semibold">:</span>
                            {" "}
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Địa chỉ người nhận</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Số điện thoại người nhận</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold">Phí giao hàng</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold">Tiền COD</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold">Khối lượng</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold">Chiều dài</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold">Chiều rộng</span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold">Chiều cao</span>
                            <span className="font-semibold">:</span>
                        </p>
                    </div>
                    <div className="w-full h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.order_id || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.name_sender || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {`${dataInitial.detail_source}, ${dataInitial.ward_source}, ${dataInitial.district_source}, ${dataInitial.province_source}`}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.phone_number_sender || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.name_receiver || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {`${dataInitial.detail_dest}, ${dataInitial.ward_dest}, ${dataInitial.district_dest}, ${dataInitial.province_dest}`}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.phone_number_receiver || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {parseFloat(dataInitial.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {parseFloat(dataInitial.COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.mass || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.length || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.width || "Không có thông tin"}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.height || "Không có thông tin"}
                        </p>
                    </div>
                </div>
            </div>} onClose={onClose} title="Chi tiết đơn hàng" />

    );
};

export default DetailOrder;