import { useState, useCallback, FormEvent, InputHTMLAttributes, SyntheticEvent, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-easy-crop';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ImageUploaderProps {
    onImageUploaded?: () => void;
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    previewImage: string | null;
    setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
    setData: (e: any) => void
}

const ImageUploader = ({
    onImageUploaded,
    image,
    setImage,
    previewImage,
    setPreviewImage,
    setData,
}: ImageUploaderProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setImage(reader.result as string);
                setPreviewImage(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const cropAndSave = useCallback(() => {
        if (!image || !croppedAreaPixels) return;

        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;
                ctx.drawImage(
                    img,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                );

                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'cropped-image.jpg', {
                            type: 'image/webp',
                        });
                        setPreviewImage(URL.createObjectURL(file));
                        setImage(null);
                        setData(file);
                    }

                    if (onImageUploaded) {
                        onImageUploaded();
                    }
                }, 'image/webp');
            }
        };
    }, [image, croppedAreaPixels]);

    const handleCropAndSave = (e: FormEvent) => {
        e.preventDefault()
        cropAndSave()
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewImage(null);
    };

    return (
        <div className="p-4">
            {!image && !previewImage ? (
                <div
                    {...getRootProps()}
                    className="p-6 border-2 border-dashed rounded-md cursor-pointer"
                >
                    <Input name='image' type='file' {...getInputProps()} />
                    <p className="text-center">Drag & Drop an image or click to select</p>
                </div>
            ) : (
                <>
                    {image && (
                        <div className="relative mt-4">
                            <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                                <ReactCrop
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </AspectRatio>
                            <div className="mt-4 space-x-4 text-center">
                                <Button onClick={handleCropAndSave}>Crop & Save</Button>
                                <Button variant="destructive" onClick={handleRemoveImage}>
                                    Remove Image
                                </Button>
                            </div>
                        </div>
                    )}

                    {previewImage && (
                        <>
                            <AspectRatio ratio={1}>
                                <img
                                    src={previewImage}
                                    alt="Cropped"
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </AspectRatio>
                            <div className="mt-4 text-center">
                                <Button type='button' variant="destructive" onClick={handleRemoveImage}>
                                    Remove Image
                                </Button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ImageUploader;