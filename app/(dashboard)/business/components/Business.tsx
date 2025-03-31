"use client";

import { BusinessOperation } from "@/TDLib/main";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import RegisterPopup from "@/components/register";
import { FormattedMessage, useIntl } from "react-intl";

type BusinessData = {
    id: string;
    name: string;
    taxCode: string;
    province: string;
    district: string;
    ward: string;
    file: string;
    fileInfo: { name: string; path: string } | null;
} | null;

const BusinessPage = () => {
    const intl = useIntl();
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
                        fileInfo: fileInfo,
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
                📂 <FormattedMessage id="Business.Info" />
            </h2>

            {loading ? (
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">
                    ⏳ <FormattedMessage id="LoadingMessage" />
                </p>
            ) : fileUrl && fileInfo ? (
                <Card className="p-5 border border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center bg-gray-100 dark:bg-gray-700 shadow-sm">
                    <p className="font-semibold text-gray-900 dark:text-white">
                        📝 {<FormattedMessage id="Business.FileName" />}: {fileInfo.name}
                    </p>

                    <a
                        href={fileUrl}
                        download={fileInfo.name}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg mt-4 transition-all"
                    >
                        📄 <FormattedMessage id="Business.DownloadPDF" />
                    </a>
                </Card>
            ) : (
                <p className="text-red-500 font-medium text-center">
                    ❌ <FormattedMessage id="Business.NoFile" />
                </p>
            )}

            <button
                onClick={() => handleRegisterBusiness()}
                className="mt-6 w-2/3 mx-auto bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-lg font-medium py-3 rounded-xl transition-all flex justify-center items-center shadow-md"
            >
                🔄 <FormattedMessage id="Business.Update" />
            </button>
        </>
    ) : (
        <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🚫 {<FormattedMessage id={"Business.NotBusiness"} />}
            </p>
            <button
                onClick={() => handleRegisterBusiness()}
                className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-lg font-medium py-3 rounded-xl transition-all shadow-md flex justify-center items-center"
            >
                ➕ {<FormattedMessage id={"Business.Regis"} />}
            </button>
        </div>
    )}

    {isRegis && <RegisterPopup onClose={() => setIsRegis(false)} data={updateData} />}
</div>

    );
};

export default BusinessPage;
