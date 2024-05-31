import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoMdClose } from 'react-icons/io';
import { FormattedMessage } from 'react-intl';

interface DropzoneProps {
    className: string;
    files: FileWithPreview[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

export interface FileWithPreview extends File {
    preview: string;
}

interface RejectedFile {
    file: File;
    errors: { code: string; message: string }[];
}

const Dropzone: React.FC<DropzoneProps> = ({ className, files, setFiles }) => {
    const [rejected, setRejected] = useState<RejectedFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: RejectedFile[]) => {
        let newFiles: FileWithPreview[] = [
            ...files,
            ...acceptedFiles.map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        ];

        if (newFiles.length > 9) {
            newFiles = newFiles.slice(-9);
        }

        setFiles(newFiles);

        if (rejectedFiles.length) {
            setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
        }
    }, [files, setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        maxFiles: 9,
        onDrop,
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeFile = (name: string) => {
        setFiles(files => files.filter(file => file.name !== name));
    };

    const removeAll = () => {
        setFiles([]);
        setRejected([]);
    };

    const removeRejected = (name: string) => {
        setRejected(files => files.filter(({ file }) => file.name !== name));
    };

    return (
        <form className='w-full'>
            <div
                {...getRootProps({ className })}
            >
                <input {...getInputProps({ name: 'files' })} />
                <div className='flex flex-col items-center justify-center gap-4 px-2 h-40 border-dashed border-2 rounded-lg border-[#000000] dark:border-white'>
                    {isDragActive ? (
                        <p><FormattedMessage id="Mission.AddImage.Drop" /></p>
                    ) : (
                        <p className='text-center'><FormattedMessage id="Mission.AddImage.Drag" /></p>
                    )}
                </div>
            </div>

            <section className='mt-5 bg-white dark:bg-[#242526] p-2 rounded-lg'>
                <h2 className='title text-lg font-semibold whitespace-nowrap w-full text-center'>
                    <FormattedMessage id="Mission.AddImage.Preview" />
                </h2>

                <div className='flex gap-4 justify-between place-items-center mt-2 px-2'>
                    <h2 className='title text-md font-semibold whitespace-nowrap'>
                        <FormattedMessage id="Mission.AddImage.Preview1" />
                    </h2>
                    <Button
                        type='button'
                        onClick={removeAll}
                        className='mt-1 rounded-md border border-red-500 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-red-500 transition-colors hover:bg-rose-400 hover:text-white'
                    >
                        <FormattedMessage id="Mission.AddImage.Preview2" />
                    </Button>
                </div>

                <ul className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-h-20 '>
                    {files.map(file => (
                        <li key={file.name} className='relative h-40 rounded-md px-2 border border-gray-300 pt-8'>
                            <button
                                type='button'
                                className='absolute top-0 left-0 px-2 flex h-8 w-full place-items-center justify-between text-black dark:text-white border-b'
                                onClick={() => removeFile(file.name)}
                            >
                                <div className='mt-1 text-[12px] font-medium text-stone-500 text-center whitespace-nowrap truncate'>
                                    {file.name}
                                </div>
                                <div><IoMdClose className='h-5 w-5' /></div>

                            </button>
                            <Image
                                src={file.preview}
                                alt={file.name}
                                width={100}
                                height={100}
                                onLoad={() => URL.revokeObjectURL(file.preview)}
                                className='h-full w-full rounded-md object-contain'
                            />


                        </li>
                    ))}
                </ul>
            </section>
            <div className='w-full h-4'></div>
        </form>
    );
};

export default Dropzone;
