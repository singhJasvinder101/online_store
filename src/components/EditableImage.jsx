import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react'
import InfoBox from './layout/InfoBox';
export default function EditableImage({ image, setImage }) {
    const [uploading, setUploading] = useState(false)

    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            setUploading(true)

            const file = files[0];
            // console.log(file)
            const formData = new FormData();
            formData.set('file', file);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET);
            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dfdmyewjs/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                const data = await response.json();
                setImage(data?.url)
                setUploading(false)
            } catch (error) {
                console.log(error)
            }
        }
    }
    

    return (
        <div>
            {image && (
                <Image key={image} className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt={'avatar'} />
            )}
            {uploading && (
                <InfoBox>uploading</InfoBox>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
            </label>
        </div>
    )
}
