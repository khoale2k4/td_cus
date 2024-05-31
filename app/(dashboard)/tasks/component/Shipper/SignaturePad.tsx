'use client'
import { ThemeContext } from "@/providers/ThemeProvider";
import React, { useState, useRef, useContext } from "react";
import { FaSave, FaUndo, FaRedo, FaEraser } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
    savedSignature: Blob | null;
    setSavedSignature: React.Dispatch<React.SetStateAction<Blob | null>>;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ savedSignature, setSavedSignature }) => {
    const signatureCanvasRef = useRef<any>(null);
    const [undoStack, setUndoStack] = useState<any[]>([]);
    const [redoStack, setRedoStack] = useState<any[]>([]);
    const { theme } = useContext(ThemeContext);

    const handleSave = () => {
        const imageData = signatureCanvasRef.current.getTrimmedCanvas().toDataURL();
        const blob = dataURLToBlob(imageData);
        if (blob) {
            const signatureFile = new File([blob], 'signature.png', { type: 'image/png' });
            setSavedSignature(signatureFile);
        }
    };

    const handleClear = () => {
        const canvas = signatureCanvasRef.current;
        canvas.clear();
        setUndoStack([]);
        setRedoStack([]);
    };

    const dataURLToBlob = (dataURL: string) => {
        const base64Data = dataURL.split(',')[1];
        if (!base64Data) return null;

        const byteCharacters = atob(base64Data);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteArray], { type: 'image/png' });
    };

    const handleDrawEnd = () => {
        const canvas = signatureCanvasRef.current;
        setUndoStack([...undoStack, canvas.toData()]);
        setRedoStack([]);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full place-self-center">
            <div id="signature-pad" className="w-full sm:w-96 h-60 bg-white rounded-xl flex flex-col justify-center place-items-center ">
                <SignatureCanvas
                    ref={signatureCanvasRef}
                    penColor="black"
                    canvasProps={{ className: "border border-gray-400 w-full sm:w-96 h-60 rounded-t-xl" }}
                    onEnd={handleDrawEnd}
                />
                <div className="mt-2 flex justify-between gap-4 px-4 pb-2 sm:px-6 text-gray-500">
                    <button className="place-items-center flex flex-col justify-center" onClick={handleSave}>
                        <FaSave />
                    </button>
                    <button className="place-items-center flex flex-col justify-center" onClick={handleClear}>
                        <FaEraser />
                    </button>
                </div>
            </div>
            <div className="mt-2 w-full sm:w-96 border border-gray-400 rounded-xl mb-2 bg-white">
                <h3 className="text-md font-semibold text-center w-full mt-2 ">
                    <FormattedMessage id="Mission.SignaturePreview" />
                </h3>
                {savedSignature != null && savedSignature instanceof Blob ? (
                    <img
                        className="p-4 w-full sm:w-96 h-60 rounded-b-xl flex justify-center place-items-center"
                        alt="saved-signature"
                        src={URL.createObjectURL(savedSignature)}
                    />
                ) : <div className="p-4 w-full sm:w-96 h-60"></div>}
            </div>
        </div>
    );
};

export default SignaturePad;
