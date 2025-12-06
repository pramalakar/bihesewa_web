'use client';

import BottomNavigation from './BottomNavigation';
import SocialMediaLinks from './SocialMediaLinks';
import Logo from './Logo';

export default function MobileView() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
          {/* Main Content - Enhanced with Subtle Elements */}
          <main className="flex-grow flex flex-col items-center justify-center relative px-4">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/30 dark:to-gray-800/20 pointer-events-none" />
            
            {/* Centered content area */}
            <div className="relative z-10 text-center max-w-sm mx-auto">
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <Logo size="lg" showText={false} />
              </div>
              
              {/* Privacy-focused message */}
              <div className="space-y-3">
                <h1 className="text-xl font-playfair font-light text-gray-700 dark:text-gray-300 tracking-tight">
                  Your Privacy, Protected
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  You can't view others' profiles here, so others can't view yours too. Your privacy is mutual and respected.
                </p>
              </div>
            </div>
          </main>

          {/* Social Media - Inline (Mobile) */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center">
              <SocialMediaLinks variant="inline" />
            </div>
          </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
