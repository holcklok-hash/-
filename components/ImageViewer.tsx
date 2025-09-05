import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageViewerProps {
  originalImageUrl: string | null;
  generatedImageUrl: string | null;
  isLoading: boolean;
}

const ImagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-500 p-4 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="font-semibold">{title}</span>
  </div>
);

const loadingMessages = [
  "جاري إنشاء الصورة...",
  "الذكاء الاصطناعي يفكر بعمق...",
  "تطبيق منظور إبداعي جديد...",
  "لحظات قليلة وتكون الصورة جاهزة...",
];


export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImageUrl, generatedImageUrl, isLoading }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      setCurrentMessage(loadingMessages[0]); // Reset to first message on new load
      interval = window.setInterval(() => {
        setCurrentMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-center text-gray-400">الصورة الأصلية</h3>
        {originalImageUrl ? (
          <div className="aspect-square w-full rounded-lg bg-black/50 overflow-hidden">
            <img src={originalImageUrl} alt="Original" className="w-full h-full object-contain" />
          </div>
        ) : (
          <ImagePlaceholder title="لم يتم رفع صورة" />
        )}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-center text-gray-400">الصورة المُنشأة</h3>
        <div className="relative w-full aspect-square">
          {isLoading ? (
            <div className="w-full h-full bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center p-4 text-center">
              <LoadingSpinner />
              <p className="mt-4 text-gray-300 animate-pulse">{currentMessage}</p>
            </div>
          ) : generatedImageUrl ? (
            <div className="aspect-square w-full rounded-lg bg-black/50 overflow-hidden group">
              <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
              <a
                href={generatedImageUrl}
                download="generated-image.png"
                className="absolute bottom-4 right-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-400 transition-all duration-300 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                aria-label="Download generated image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>تحميل</span>
              </a>
            </div>
          ) : (
            <ImagePlaceholder title="سيتم عرض الصورة هنا" />
          )}
        </div>
      </div>
    </div>
  );
};