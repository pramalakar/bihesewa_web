'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BrandName from './BrandName';

interface BrandSplashProps {
  onComplete: () => void;
}

export default function BrandSplash({ onComplete }: BrandSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimeout = setTimeout(() => {
      setShowLogo(true);
    }, 150);

    // Show text after logo with better timing
    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, 700);

    // Start fade out after 2.5 seconds
    const fadeTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Complete animation after fade out
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(textTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`
        fixed inset-0 z-50 
        bg-white dark:bg-gray-900 
        flex flex-col items-center justify-center
        transition-opacity duration-500 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Logo Animation */}
      <div 
        className={`
          transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${showLogo 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
          }
        `}
      >
        <Image
          src="/logo.png"
          alt="BiheSewa Logo"
          width={80}
          height={80}
          priority
          className="object-contain"
        />
      </div>

      {/* Brand Name Animation */}
      <div 
        className={`
          mt-2 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${showText 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-3'
          }
        `}
      >
        <BrandName size="lg" />
      </div>
    </div>
  );
}

