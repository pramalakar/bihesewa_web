'use client';

import BottomNavigation from './BottomNavigation';
import SocialMediaLinks from './SocialMediaLinks';
import Logo from './Logo';

export default function MobileView() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
          {/* Main Content */}
          <main className="flex-grow flex flex-col items-center justify-center relative px-6 py-12">
            {/* Centered content area */}
            <div className="relative z-10 text-center max-w-md mx-auto space-y-8">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <Logo size="lg" showText={false} />
              </div>
              
              {/* Privacy-focused message */}
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold font-playfair leading-tight max-w-md mx-auto">
                  <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-rose-300 dark:from-amber-300 dark:via-pink-300 dark:to-rose-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Your Privacy, Protected
                  </span>
                </h1>
                <p className="text-base text-gray-400 dark:text-gray-500 font-medium leading-relaxed">
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
