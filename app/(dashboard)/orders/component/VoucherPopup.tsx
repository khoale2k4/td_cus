import { VoucherOperation } from "@/TDLib/main";
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (id: string) => void;
}

interface Voucher {
    id: string;
    discount: number;
    expiration: string;
}

const VoucherPopup = ({ isOpen, onClose, onSelect }: Props) => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [page, setPage] = useState(1);
    const size = 5;
    const voucherOperation = new VoucherOperation();

    const fetchVouchers = async () => {
        const token = localStorage.getItem("token") ?? "";
        const response = await voucherOperation.getVouchersByCustomer(page, size, token);
        console.log(response.data)
        if (response.success) {
            setVouchers(response.data);
        }
    }

    useEffect(() => {
        fetchVouchers();
    }, [page]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Chặn cuộn khi mở popup
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto"; // Khôi phục cuộn khi đóng
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[#242526] p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    Chọn Voucher
                </h2>
                <div className="max-h-60 overflow-y-auto space-y-2">
                    {vouchers.length > 0 ? (
                        vouchers.map((voucher, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    onSelect(voucher.id);
                                    onClose();
                                }}
                                className="w-full flex justify-between p-3 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                                <span>{voucher.id}</span>
                                <span className="font-bold text-green-600">
                                    -{voucher.discount} VNĐ
                                </span>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">Không có voucher khả dụng.</p>
                    )}
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
export default VoucherPopup;