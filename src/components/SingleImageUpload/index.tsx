"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export interface SingleImageUploadProps {
  initialImage?: string;
  currentImage: File | null;
  onChange: (value: File | null) => void;
  name: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  onChange,
  currentImage,
  initialImage,
  name,
}) => {
  let currentImageUrl;
  if (currentImage) {
    currentImageUrl = URL.createObjectURL(currentImage);
  }
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState(currentImageUrl || initialImage);

  useEffect(() => {
    let currentImageUrl;
    if (currentImage) {
      currentImageUrl = URL.createObjectURL(currentImage);
    }
    setImageUrl(currentImageUrl || initialImage);
  }, [currentImage, initialImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div className="flex flex-col">
      {imageUrl && (
        <Image
          src={imageUrl}
          className="w-64 h-64 object-contain"
          alt="Movie Cover"
          width={256}
          height={256}
        />
      )}
      <div>
        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          ref={uploadInputRef}
          name={name}
        />
        <button
          type="button"
          className="text-blue-gray-600 p-2 rounded-lg underline hover:text-blue-gray-800 transition-all"
          onClick={() => uploadInputRef.current?.click()}
        >
          {currentImage ? "Edit" : "Upload Image"}
        </button>
        {currentImage && (
          <button
            type="button"
            className="text-blue-gray-600 p-2 rounded-lg underline hover:text-blue-gray-800 transition-all"
            onClick={() => {
              onChange(null);
              if (uploadInputRef.current) uploadInputRef.current.value = "";
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleImageUpload;
