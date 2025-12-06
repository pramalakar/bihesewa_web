'use client';

import { Facebook, Instagram, MessageCircle } from 'lucide-react';

interface SocialMediaLinksProps {
  variant?: 'footer' | 'floating' | 'inline';
  className?: string;
}

export default function SocialMediaLinks({ 
  variant = 'footer',
  className = '' 
}: SocialMediaLinksProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100092709636707',
      icon: Facebook,
      color: 'hover:text-[#1877F2]',
      bgColor: 'hover:bg-[#1877F2]/10',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bihesewa_official',
      icon: Instagram,
      color: 'hover:text-[#E4405F]',
      bgColor: 'hover:bg-[#E4405F]/10',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@bihe.sewa2',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'hover:text-gray-900 dark:hover:text-white',
      bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/61467877926',
      icon: MessageCircle,
      color: 'hover:text-[#25D366]',
      bgColor: 'hover:bg-[#25D366]/10',
    },
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-24 right-4 md:bottom-24 md:right-6 z-40 flex flex-col gap-3 ${className}`}>
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center
                w-12 h-12 md:w-14 md:h-14
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-full
                shadow-lg hover:shadow-xl
                transition-all duration-300
                hover:scale-110 active:scale-95
                ${social.color}
                ${social.bgColor}
                group
              `}
              aria-label={`Follow us on ${social.name}`}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center
                w-10 h-10
                rounded-full
                transition-all duration-200
                ${social.color}
                ${social.bgColor}
                group
              `}
              aria-label={`Follow us on ${social.name}`}
            >
              <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" />
            </a>
          );
        })}
      </div>
    );
  }

  // Footer variant (default)
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center
              w-8 h-8
              rounded-full
              transition-all duration-200
              ${social.color}
              ${social.bgColor}
              group
            `}
            aria-label={`Follow us on ${social.name}`}
          >
            <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:scale-110 transition-transform" />
          </a>
        );
      })}
    </div>
  );
}

