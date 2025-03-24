"use client";

import { BusinessOperation } from "@/TDLib/main";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import RegisterPopup from "@/components/register";
import { FormattedMessage } from "react-intl";

type BusinessData = {
    id: string;
    name: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    file: string;
} | null;

const BusinessPage = () => {
    const businessOperation = new BusinessOperation();
    const token = localStorage.getItem("token") ?? "";

    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileInfo, setFileInfo] = useState<{ name: string; path: string } | null>(null);
    const [isBusiness, setIsBusiness] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isRegis, setIsRegis] = useState(false);
    const [updateData, setUpdateData] = useState<BusinessData>(null);

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        setLoading(true);
        try {
            const response = await businessOperation.searchBusinesses(
                {
                    addition: { sort: [], page: 1, size: 1, group: [] },
                    criteria: []
                },
                token
            );

            // {
            //     "success": true,
            //     "message": "Tìm kiếm khách hàng doanh nghiệp thành công",
            //     "data": [
            //         {
            //             "id": "833caab0-91f3-419a-8a4b-d7e0de9f2e82",
            //             "name": "khoa.letgkhmtk22",
            //             "taxCode": "2222",
            //             "province": "Thành phố Hà Nội",
            //             "district": "Quận Hoàn Kiếm",
            //             "ward": null,
            //             "customerId": "a6b1e63d-5ae2-4de2-b613-52f6e5e8e4ea",
            //             "agencyId": null,
            //             "createdAt": "2025-03-19T23:53:25.000Z",
            //             "updatedAt": "2025-03-19T23:53:25.000Z",
            //             "customer": {
            //                 "id": "a6b1e63d-5ae2-4de2-b613-52f6e5e8e4ea",
            //                 "phoneNumber": "0708103015",
            //                 "email": "levodangkhoatg2@gmail.com",
            //                 "firstName": "Lê",
            //                 "lastName": "Khoa",
            //                 "avatar": null,
            //                 "createdAt": "2025-03-01T03:25:54.000Z",
            //                 "updatedAt": "2025-03-05T00:14:17.000Z"
            //             },
            //             "agency": null,
            //             "license": {
            //                 "id": "b2fad3b9-281a-497e-a4f7-45bbd4b5a2d8",
            //                 "name": "1742428404818_blob",
            //                 "path": "src/modules/storage/uploads/business_license/1742428404818_blob",
            //                 "businessId": "833caab0-91f3-419a-8a4b-d7e0de9f2e82",
            //                 "createdAt": "2025-03-19T23:53:25.000Z",
            //                 "updatedAt": "2025-03-19T23:53:25.000Z"
            //             }
            //         }
            //     ]
            // }

            console.log("Business Data:", response.data);

            if (response.data.length > 0) {
                setIsBusiness(true);
                const businessData = response.data[0];
                const license = businessData.license??null;
                console.log("License:", license);
                if(license) {
                    setUpdateData({
                        name: businessData.name,
                        file: license.name,
                        id: businessData.id,
                        taxCode: businessData.taxCode,
                        district: "",
                        province: "",
                        ward: ""
                    }) //nnnnnnnnnnnnnn
                    setFileInfo({ name: license.name, path: license.path });
                    const fileResponse = await businessOperation.getLicenseFile({ fileId: license.id }, token);
    
                    if (fileResponse) {
                        const fileBlob = new Blob([fileResponse], { type: "application/pdf" });
                        const url = URL.createObjectURL(fileBlob);
                        setFileUrl(url);
                    } else {
                        console.error("File response is null or invalid");
                    }
                }
            } else {
                setIsBusiness(false);
            }
            console.log(fileUrl);
        } catch (error) {
            console.error("Lỗi khi lấy file:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterBusiness = () => {
        setIsRegis(true);
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
    {isBusiness ? (
        <>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                📂 Thông tin giấy phép doanh nghiệp
            </h2>

            {loading ? (
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                    ⏳ Đang tải...
                </p>
            ) : fileUrl && fileInfo ? (
                <Card className="p-5 border border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center bg-gray-100 dark:bg-gray-700 shadow-sm">
                    <p className="font-semibold text-gray-900 dark:text-white">
                        📝 Tên file: {fileInfo.name}
                    </p>

                    <a
                        href={fileUrl}
                        download={fileInfo.name}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg mt-4 transition-all"
                    >
                        📄 Tải file PDF
                    </a>
                </Card>
            ) : (
                <p className="text-red-500 font-medium text-center">
                    ❌ Không có file nào hoặc có lỗi khi tải file.
                </p>
            )}

            <button
                onClick={() => handleRegisterBusiness()}
                className="mt-6 w-2/3 mx-auto bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-lg font-medium py-3 rounded-xl transition-all flex justify-center items-center shadow-md"
            >
                🔄 Cập nhật thông tin
            </button>
        </>
    ) : (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🚫 Bạn chưa phải là Business.
            </p>
            <button
                onClick={() => handleRegisterBusiness()}
                className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-lg font-medium py-3 rounded-xl transition-all shadow-md flex justify-center items-center"
            >
                ➕ Đăng ký Business
            </button>
        </div>
    )}

    {isRegis && <RegisterPopup onClose={() => setIsRegis(false)} data={updateData} />}
</div>

    );
};

export default BusinessPage;
