import React from 'react';
import { ANGLE_CATEGORIES } from '../constants';
import type { Angle } from '../types';

interface AngleSelectorProps {
  onAngleSelect: (angle: Angle) => void;
  isDisabled: boolean;
}

export const AngleSelector: React.FC<AngleSelectorProps> = ({ onAngleSelect, isDisabled }) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-lg shadow-md transition-opacity duration-300 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
      <h2 className="text-xl font-semibold mb-4 text-white">2. اختر زاوية</h2>
      <div className="space-y-3">
        {ANGLE_CATEGORIES.map((category, index) => (
          <details key={category.title} className="bg-gray-700/50 rounded-lg group" open={index === 0}>
            <summary className="p-3 font-medium cursor-pointer list-none flex justify-between items-center text-gray-200 group-hover:bg-gray-700 rounded-t-lg">
              {category.title}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="p-4 border-t border-gray-600">
              <div className="flex flex-wrap gap-2">
                {category.angles.map((angle) => (
                  <button
                    key={angle.name}
                    onClick={() => onAngleSelect(angle)}
                    disabled={isDisabled}
                    className="text-sm bg-gray-600 py-1 px-3 rounded-full hover:bg-gray-500 hover:text-white transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {angle.name}
                  </button>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
