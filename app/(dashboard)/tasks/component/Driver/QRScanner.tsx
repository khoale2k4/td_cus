import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QrReader } from 'react-qr-reader';
import { IoIosQrScanner } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FormattedMessage } from "react-intl";

interface QRscannerProps {
    onClose: () => void;
    data: any;
    setData: any
}

const QRscanner: React.FC<QRscannerProps> = ({ onClose, data, setData }) => {
    const [errorText, setErrorText] = useState('');
    const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
    const constraints = {
        facingMode: "user"
    };
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    const handleClose = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) {
            event.preventDefault();
        }
        setIsVisible(false);
    };

    const checkCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setCameraPermission(true);
        } catch (error) {
            setCameraPermission(false);
        }
    };

    const handleScan = (result: any, error: any) => {
        if (!!result) {
            setData(result?.text);
            handleClose()
        }

        if (!!error) {
            console.info(error);
        }
    }

    const styles = {
        overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            border: 'solid gray 1px',
            overflow: 'hidden',
        },
        square: {
            height: '200px',
            width: '200px',
            border: 'solid white 1px',
            boxShadow: '0 0 50px 5000px rgba(0, 0, 0, 0.9)',
        },
    };

    const ViewFinder = () => {
        return (
            <div className="absolute w-full h-full inset-0 flex justify-center items-center z-10 overflow-hidden">
                <div style={styles.overlay}>
                    <div style={styles.square}></div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black overflow-clip bg-opacity-10 z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backdropFilter: "blur(6px)",
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <motion.div className="w-full h-full bg-white dark:bg-[#242526] overflow-clip relative"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}>
                <button className={`${cameraPermission === false ? "text-black dark:text-white" : "text-white"} absolute top-4 right-4 z-20`} onClick={handleClose}><MdClose className="w-6 h-6" /></button>
                {cameraPermission === false ? (
                    <div className="flex flex-col items-center justify-center h-full px-4">
                        <p className="text-red-500 text-center"><FormattedMessage id="QR.Message" /></p>
                    </div>
                ) : (
                    <div className="h-full w-full relative flex justify-center place-items-center">
                        <QrReader
                            onResult={handleScan}
                            className="flex h-full w-full"
                            constraints={constraints}
                            ViewFinder={ViewFinder}
                            containerStyle={{ height: "100%", width: "100%" }}
                            videoContainerStyle={{ height: "100%", paddingTop: 0, width: "100%" }}
                            videoStyle={{ height: "100%", width: "100%" }}
                        />
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default QRscanner;