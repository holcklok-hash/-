import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AngleSelector } from './components/AngleSelector';
import { ImageViewer } from './components/ImageViewer';
import { ErrorMessage } from './components/ErrorMessage';
import { generateImageFromAngle } from './services/geminiService';
import type { Angle } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalImage) {
      setOriginalImageUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(originalImage);
    setOriginalImageUrl(objectUrl);

    // Clean up the object URL when the component unmounts or the image changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [originalImage]);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleAngleSelect = useCallback(async (angle: Angle) => {
    if (!originalImage) {
      setError("الرجاء تحميل صورة أولاً.");
      return;
    }

    setIsLoading(true);
    setGeneratedImageUrl(null);
    setError(null);

    try {
      const imageUrl = await generateImageFromAngle(originalImage, angle.prompt);
      setGeneratedImageUrl(imageUrl);
      // FIX: Added curly braces to the catch block to fix syntax error.
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء إنشاء الصورة. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
          <AngleSelector onAngleSelect={handleAngleSelect} isDisabled={!originalImage || isLoading} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <ErrorMessage message={error} />
          <ImageViewer
            originalImageUrl={originalImageUrl}
            generatedImageUrl={generatedImageUrl}
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className="sticky bottom-0 z-10 bg-gray-900/50 backdrop-blur-sm text-center p-4 text-gray-400 text-sm space-y-3">
        <p className="font-semibold text-base text-gray-200">AJ creativity by : Ahmed jalal</p>
        <div className="flex items-center justify-center gap-4">
          <span className="font-semibold text-gray-300">تابعني :</span>
          <a href="https://www.facebook.com/ahmed.ali.jalal" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3-596 0-5.192 1.583-5.192 4.615v2.385z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ahmedxjalal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-white transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
               <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002 1.809-2.227 2.023-2.227.142 0 .235.017.339.043v4.678h4.98v-9.396c0-3.652-2.121-4.604-4.83-4.604-2.162 0-3.313 1.054-3.844 2.016l-.16.284v-1.704h-4.98v16h4.98v-8.396z"/>
             </svg>
          </a>
        </div>
        <p>مدعوم بواسطة Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
