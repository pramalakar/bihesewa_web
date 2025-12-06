'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
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

  // Prevent body scroll and blur content when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
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
          fixed bottom-6 right-6 z-50 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-full p-4 
          shadow-xl hover:shadow-2xl 
          transition-all duration-300 ease-out
          ${isOpen ? 'scale-90 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100 hover:scale-110 active:scale-95'}
          cursor-pointer 
          focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Full-Screen Menu Overlay with backdrop blur */}
      <div
        className={`
          fixed inset-0 z-40
          bg-white/30 dark:bg-gray-900/30
          backdrop-blur-2xl
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={closeMenu}
        style={{ 
          backdropFilter: isOpen ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(20px)' : 'blur(0px)'
        }}
      >
        {/* Menu Content */}
        <div 
          className={`
            h-full flex flex-col
            transition-transform duration-300 ease-out
            ${isOpen ? 'translate-y-0' : 'translate-y-8'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-6 pt-8 pb-6">
            {/* Logo - Top Left */}
            <div className="flex items-center">
              <Logo size="md" showText={false} />
            </div>
            
            {/* Close Button - Top Right */}
            <button
              onClick={closeMenu}
              className="p-2 text-gray-900 dark:text-gray-100 hover:opacity-70 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Trust Building Content */}
          <div className="px-6 pb-8 text-center border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-md mx-auto space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-playfair">
                Trusted Matrimony Platform
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                New technology meets traditional values. The largest and most trusted matrimonial platform, connecting hearts with privacy and respect.
              </p>
              <div className="flex items-center justify-center gap-4 pt-3 text-xs text-gray-500 dark:text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Privacy First</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Secure Platform</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Trusted by Thousands</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items - Centered, Text Only */}
          <nav className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="space-y-6">
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
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-700 dark:text-gray-300 font-light'
                      }
                      hover:opacity-70
                      focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded
                    `}
                  >
                    <span className="text-2xl tracking-tight">
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
