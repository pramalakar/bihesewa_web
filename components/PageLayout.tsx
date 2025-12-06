'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useDevice } from '@/src/hooks/useDevice';
import BottomNavigation from './BottomNavigation';
import Link from 'next/link';
import { Shield, FileText, Info, Mail, Menu } from 'lucide-react';
import Logo from './Logo';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon: ReactNode;
}

export default function PageLayout({ children, title, subtitle, icon }: PageLayoutProps) {
  const { isMobile, isTablet } = useDevice();
  const isMobileDevice = isMobile || isTablet;
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isMobileDevice) return; // Only for desktop

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!isHovered) {
          setIsNavVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
      
      if (hideTimeout) clearTimeout(hideTimeout);
      if (!isHovered) {
        const timeout = setTimeout(() => {
          setIsNavVisible(false);
        }, 3000);
        setHideTimeout(timeout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const initialTimeout = setTimeout(() => {
      if (!isHovered) {
        setIsNavVisible(false);
      }
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) clearTimeout(hideTimeout);
      clearTimeout(initialTimeout);
    };
  }, [lastScrollY, hideTimeout, isHovered, isMobileDevice]);

  if (isMobileDevice) {
    // Mobile Layout with Bottom Navigation
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <main className="flex-grow max-w-4xl mx-auto px-4 py-8 pb-32 w-full">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5">
              {icon}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {children}
        </main>
        <BottomNavigation />
      </div>
    );
  }

  // Desktop Layout with Top Navigation
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Desktop Navigation - Auto-hide */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white/95 dark:bg-gray-900/95 
          backdrop-blur-sm
          transition-transform duration-300 ease-in-out
          ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsNavVisible(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          const timeout = setTimeout(() => {
            setIsNavVisible(false);
          }, 2000);
          setHideTimeout(timeout);
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText={true} />
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
              >
                <FileText className="w-4 h-4" />
                Terms
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Show Menu Button when nav is hidden */}
      {!isNavVisible && (
        <button
          onClick={() => {
            setIsNavVisible(true);
            setIsHovered(true);
            setTimeout(() => setIsHovered(false), 2000);
          }}
          className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
          aria-label="Show menu"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 pt-20 w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2">
            {icon}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </main>

      {/* Footer - Always at bottom */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} BiheSewa
          </p>
        </div>
      </footer>
    </div>
  );
}

