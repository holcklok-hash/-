import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-gray-800 p-4 text-center border-b border-gray-700">
    <div className="flex items-center justify-center gap-3">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        مولد زوايا الكاميرا
      </h1>
    </div>
    <p className="text-gray-300 mt-2 text-sm sm:text-base">أنشئ صورًا فريدة من منظور جديد باستخدام الذكاء الاصطناعي</p>
    <p className="text-gray-500 mt-1 text-xs">Ai Hub - Ahmed jalal</p>
  </header>
);