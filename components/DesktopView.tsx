'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, FileText, Info, Mail, Menu, Lock, EyeOff, CheckCircle2, Building2, Globe, Users, MessageCircle, Send, AlertCircle } from 'lucide-react';
import Logo from './Logo';
import SocialMediaLinks from './SocialMediaLinks';

type HoveredMenu = 'privacy' | 'terms' | 'about' | 'contact' | null;

export default function DesktopView() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<HoveredMenu>(null);

  // No longer adding blur class

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
      {/* Full-Screen Menu Hover Content Overlay */}
      <div
        className={`
          fixed inset-0 z-40
          bg-white/30 dark:bg-gray-900/30
          backdrop-blur-2xl
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${isHovered && hoveredMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        style={{ 
          backdropFilter: isHovered && hoveredMenu ? 'blur(20px)' : 'blur(0px)',
          WebkitBackdropFilter: isHovered && hoveredMenu ? 'blur(20px)' : 'blur(0px)'
        }}
      >
        {/* Privacy Menu Content */}
        {hoveredMenu === 'privacy' && (
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Lock className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Platform</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Industry-standard encryption protects your data
                </p>
              </div>
              <div className="flex flex-col items-center">
                <EyeOff className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Never Public</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Your profile is never made public or visible to unauthorized users
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Rights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Full control over your data and profile visibility
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Terms Menu Content */}
        {hoveredMenu === 'terms' && (
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">User Responsibilities</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-center">
                  <li>Provide accurate information</li>
                  <li>Respect other users</li>
                  <li>Use platform lawfully</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prohibited Activities</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-center">
                  <li>No false information</li>
                  <li>No harassment</li>
                  <li>No illegal activities</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* About Menu Content */}
        {hoveredMenu === 'about' && (
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Building2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Registered Company</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Legally registered in Nepal and Australia
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">For Nepalese Worldwide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Connecting hearts across borders
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Company-Managed Matching</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Professional and respectful matching service
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Menu Content */}
        {hoveredMenu === 'contact' && (
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center">
                <Mail className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-1">
                  support@bihesewa.com
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Response within 24 hours
                </p>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-1">
                  +61 467 877 926
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Quick support available
                </p>
              </div>
            </div>
          </div>
        )}
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
          setHoveredMenu(null);
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
                onMouseEnter={() => setHoveredMenu('privacy')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Shield className="w-4 h-4" />
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
                onMouseEnter={() => setHoveredMenu('terms')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <FileText className="w-4 h-4" />
                Terms
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
                onMouseEnter={() => setHoveredMenu('about')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
                onMouseEnter={() => setHoveredMenu('contact')}
                onMouseLeave={() => setHoveredMenu(null)}
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
            <h1 className="text-2xl md:text-3xl font-playfair font-light tracking-tight max-w-2xl mx-auto">
              <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-rose-300 dark:from-amber-300 dark:via-pink-300 dark:to-rose-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Your Privacy, Protected
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
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
