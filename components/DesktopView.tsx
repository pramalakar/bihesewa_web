'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, FileText, Info, Mail, Menu } from 'lucide-react';
import Logo from './Logo';
import SocialMediaLinks from './SocialMediaLinks';

export default function DesktopView() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Add/remove blur class when nav is visible
  useEffect(() => {
    if (isNavVisible) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isNavVisible]);

  useEffect(() => {
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide if scrolling down
        if (!isHovered) {
          setIsNavVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
      
      // Auto-hide after 3 seconds of no scrolling (unless hovered)
      if (hideTimeout) clearTimeout(hideTimeout);
      if (!isHovered) {
        const timeout = setTimeout(() => {
          setIsNavVisible(false);
        }, 3000);
        setHideTimeout(timeout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Auto-hide after initial 3 seconds
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
  }, [lastScrollY, hideTimeout, isHovered]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Full-Screen Trust Content Overlay - Centered in Viewport */}
      <div
        className={`
          fixed inset-0 z-40
          bg-white/30 dark:bg-gray-900/30
          backdrop-blur-2xl
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${isNavVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        style={{ 
          backdropFilter: isNavVisible ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: isNavVisible ? 'blur(20px)' : 'blur(0px)'
        }}
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
        {/* Centered Trust Content */}
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white font-playfair mb-4">
            Trusted Matrimony Platform
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            New technology meets traditional values. The largest and most trusted matrimonial platform, connecting hearts with privacy and respect.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              <span>Privacy First</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              <span>Secure Platform</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              <span>Trusted by Thousands</span>
            </span>
          </div>
        </div>
      </div>

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
          // Hide after leaving hover area
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

      {/* Main Content - Enhanced Blank with Subtle Elements */}
      <main className="flex-grow flex flex-col items-center justify-center relative">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/30 dark:to-gray-800/20 pointer-events-none" />
        
        {/* Centered content area */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          
          {/* Privacy-focused message */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-playfair font-light text-gray-700 dark:text-gray-300 tracking-tight">
              Your Privacy, Protected
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-md mx-auto">
              You can't view others' profiles here, so others can't view yours too. Your privacy is mutual and respected.
            </p>
          </div>
        </div>
      </main>

      {/* Footer - Enhanced with Social Media */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 order-2 md:order-1">
              © {new Date().getFullYear()} BiheSewa. All rights reserved.
            </p>
            <div className="order-1 md:order-2">
              <SocialMediaLinks variant="footer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
