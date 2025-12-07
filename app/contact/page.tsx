'use client';

import PageLayout from '@/components/PageLayout';
import { Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const facebookUrl = isMobile 
    ? 'https://m.facebook.com/profile.php?id=100092709636707'
    : 'https://www.facebook.com/profile.php?id=100092709636707';

  return (
    <PageLayout
      title="Contact Us"
      subtitle="We're here to help"
      icon={<Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white mb-1.5">
              Email
            </h3>
            <a 
              href="mailto:support@bihesewa.com"
              className="text-base md:text-xs text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mb-1"
            >
              support@bihesewa.com
            </a>
            <p className="text-sm md:text-xs text-gray-600 dark:text-gray-500">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white mb-1.5">
              WhatsApp
            </h3>
            <a 
              href="https://wa.me/61467877926" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base md:text-xs text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors block mb-1"
            >
              +61 467 877 926
            </a>
            <p className="text-sm md:text-xs text-gray-600 dark:text-gray-500">
              Available for quick support
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-6">
        <h2 className="text-lg md:text-xs font-semibold text-gray-900 dark:text-white mb-4">
          Follow Us
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2 text-sm md:text-xs bg-[#1877F2] hover:bg-[#166FE5] text-white rounded transition-colors duration-200"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-5 h-5 md:w-4 md:h-4" />
            <span>Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/bihesewa_official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2 text-sm md:text-xs bg-gradient-to-r from-[#E4405F] to-[#F77737] hover:from-[#D32A4A] hover:to-[#E66628] text-white rounded transition-colors duration-200"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-5 h-5 md:w-4 md:h-4" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@bihe.sewa2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 md:px-4 md:py-2 text-sm md:text-xs bg-[#000000] hover:bg-[#1A1A1A] dark:bg-[#FFFFFF] dark:hover:bg-[#F0F0F0] dark:text-[#000000] text-white rounded transition-colors duration-200"
            aria-label="Follow us on TikTok"
          >
            <svg className="w-5 h-5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>

    </PageLayout>
  );
}
