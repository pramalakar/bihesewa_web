'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function PrivacyMessage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable Text - Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-30 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 underline underline-offset-2 transition-all duration-200 animate-fade-in md:bottom-16 md:right-6 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2 rounded px-1 py-0.5"
        aria-label="Learn why this page is blank"
      >
        Why is this blank?
      </button>

      {/* Message Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm mx-4 border border-gray-200 dark:border-gray-700 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Privacy First
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              This page is intentionally blank to protect your privacy. Your profile visibility is completely under your control. This mutual privacy ensures a safe and respectful environment for everyone.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

