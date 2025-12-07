'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import SocialMediaLinks from './SocialMediaLinks';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Privacy',
    href: '/privacy',
  },
  {
    name: 'Terms',
    href: '/terms',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Menu Button - Always visible */}
      <button
        onClick={toggleMenu}
        className={`
          fixed bottom-6 right-6 z-[110]
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-full p-4 
          shadow-xl hover:shadow-2xl 
          transition-all duration-300 ease-out
          ${isOpen ? 'scale-90 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100 hover:scale-110 active:scale-95'}
          cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2
          w-14 h-14 flex items-center justify-center
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Full-Screen Menu Overlay */}
      <div
        className={`
          fixed inset-0
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 visible z-[100]' : 'opacity-0 invisible pointer-events-none z-[-1]'}
        `}
        onClick={closeMenu}
      >
        {/* Menu Content */}
        <div 
          className={`
            h-full flex flex-col
            bg-white dark:bg-gray-900
            transition-transform duration-300 ease-out
            ${isOpen ? 'translate-y-0' : 'translate-y-8'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-end px-6 pt-6 pb-4">
            {/* Close Button - Top Right */}
            <button
              onClick={closeMenu}
              className="p-2.5 text-gray-900 dark:text-gray-100 hover:opacity-70 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Building Content */}
          <div className="px-6 pb-8 text-center border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white font-playfair">
                Trusted Matrimony Platform
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                New technology meets traditional values. The largest and most trusted matrimonial platform, connecting hearts with privacy and respect.
              </p>
              <div className="flex items-center justify-center gap-4 pt-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="text-green-600 dark:text-green-400 text-base">✓</span>
                  <span>Privacy First</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-600 dark:text-green-400 text-base">✓</span>
                  <span>Secure Platform</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-600 dark:text-green-400 text-base">✓</span>
                  <span>Trusted by Thousands</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items - Centered */}
          <nav className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="space-y-5">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      block
                      text-center
                      transition-all duration-200 ease-out
                      ${
                        isActive
                          ? 'text-gray-900 dark:text-white font-semibold'
                          : 'text-gray-700 dark:text-gray-300 font-normal'
                      }
                      hover:opacity-80
                      focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded
                    `}
                  >
                    <span className="text-2xl md:text-3xl tracking-normal">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer with Social Media */}
          <div className="px-6 pb-8 pt-8">
            <div className="flex items-center justify-center gap-6">
              <SocialMediaLinks variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
