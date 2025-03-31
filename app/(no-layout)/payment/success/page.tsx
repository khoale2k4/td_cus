"use client";
import "@/app/globals.css";
import "@/components/calendar/MiniCalendar.css";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const route = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="mb-4 flex justify-center">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Thanh toán thành công!</h1>
                <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                </p>
                <button
                    onClick={() => route.push("/orders")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;