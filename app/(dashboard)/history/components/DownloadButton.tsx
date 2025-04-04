import React from "react";

interface DownloadButtonProps {
    base64Data: string;
    filename?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ base64Data, filename = "invoice.pdf" }) => {
    const handleDownload = () => {
        // Tạo link tải xuống
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${base64Data}`;
        link.download = filename;
        link.click();
    };

    return (
        <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            {filename}
        </button>
    );
};

export default DownloadButton;
