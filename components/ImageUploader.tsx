import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necessary to allow drop
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg h-full">
      <h2 className="text-xl font-semibold mb-4 text-white">1. رفع الصورة</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imageUrl ? (
        <div className="space-y-4">
          <div className="w-full h-32 rounded-md overflow-hidden bg-black flex items-center justify-center">
             <img src={imageUrl} alt="Uploaded preview" className="max-w-full max-h-full object-contain" />
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-300"
          >
            تغيير الصورة
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-gray-400 bg-gray-700' : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-gray-300">انقر للرفع</span> أو اسحب وأفلت</p>
            <p className="text-xs text-gray-500">(PNG, JPG, WEBP)</p>
          </div>
        </div>
      )}
    </div>
  );
};