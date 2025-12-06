'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shield, 
  FileText, 
  Info, 
  Mail,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Privacy',
    href: '/privacy',
    icon: Shield,
  },
  {
    name: 'Terms',
    href: '/terms',
    icon: FileText,
  },
  {
    name: 'About',
    href: '/about',
    icon: Info,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Mail,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show navigation on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
        setIsOpen(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide if scrolling down
        setIsVisible(false);
        setIsOpen(false);
      }
      
      setLastScrollY(currentScrollY);
      
      // Auto-hide after 3 seconds of no scrolling
      if (hideTimeout) clearTimeout(hideTimeout);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsOpen(false);
      }, 3000);
      setHideTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Auto-hide after initial 3 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(false);
      setIsOpen(false);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeout) clearTimeout(hideTimeout);
      clearTimeout(initialTimeout);
    };
  }, [lastScrollY, hideTimeout]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsVisible(true);
    
    // Auto-hide after 5 seconds when manually opened
    if (hideTimeout) clearTimeout(hideTimeout);
    const timeout = setTimeout(() => {
      setIsOpen(false);
      setIsVisible(false);
    }, 5000);
    setHideTimeout(timeout);
  };

  return (
    <>
      {/* Toggle Button - Always visible when menu is hidden */}
      {!isVisible && (
        <button
          onClick={toggleMenu}
          className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {/* Navigation Menu */}
      <nav 
        className={`
          fixed bottom-0 left-0 right-0 
          bg-white/95 dark:bg-gray-900/95 
          backdrop-blur-sm
          z-40
          transition-transform duration-300 ease-in-out
          ${isVisible && isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Close button when open */}
            {isOpen && (
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            {/* Navigation Items */}
            <div className="flex items-center justify-center flex-1 gap-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex flex-col items-center justify-center 
                      px-4 py-2.5 rounded-lg 
                      text-xs font-medium 
                      transition-all duration-200
                      min-w-[60px]
                      ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                      focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700
                    `}
                    onClick={() => {
                      setIsOpen(false);
                      setIsVisible(false);
                    }}
                  >
                    <Icon 
                      className={`w-5 h-5 mb-1 transition-transform duration-200 ${
                        isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'group-hover:scale-110'
                      }`} 
                    />
                    <span className="text-[10px] leading-tight">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
