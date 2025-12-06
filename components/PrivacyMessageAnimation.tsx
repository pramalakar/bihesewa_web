'use client';

import { useState, useEffect } from 'react';

export default function PrivacyMessageAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show after brand splash completes (3 seconds)
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      // Start showing text after container is visible
      setTimeout(() => {
        setShowText(true);
      }, 300);
    }, 3000); // Right after brand splash completes

    // Start fading out after showing for a while
    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }, 7500); // Show for about 4.5 seconds before fade out

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(fadeTimeout);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`
        fixed inset-0 z-40 
        flex items-center justify-center
        pointer-events-none
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <p 
        className={`
          text-xl sm:text-2xl md:text-3xl lg:text-4xl
          font-normal
          text-gray-700 dark:text-gray-200
          text-center
          px-6 max-w-4xl
          leading-[1.4]
          tracking-[-0.01em]
          transition-all duration-[2800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${showText && !isFadingOut 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
          }
          ${isFadingOut ? 'animate-fade-out-gentle' : ''}
        `}
        style={{ fontFamily: 'var(--font-playfair), serif' }}
      >
        <span className="block mb-2">If you can&apos;t see others&apos; profiles here,</span>
        <span className="font-medium text-gray-800 dark:text-gray-100">
          others can&apos;t see you too.
        </span>
      </p>
    </div>
  );
}

