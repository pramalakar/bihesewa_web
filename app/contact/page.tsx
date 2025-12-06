'use client';

import PageLayout from '@/components/PageLayout';
import { Mail, MessageCircle, Send, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact Us"
      subtitle="We're here to help"
      icon={<Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-2">
          <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
              Email
            </h3>
            <a 
              href="mailto:support@bihesewa.com"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              support@bihesewa.com
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
              WhatsApp
            </h3>
            <a 
              href="https://wa.me/61467877926" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              +61 467 877 926
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              Available for quick support
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-6">
        <h2 className="text-xs font-medium text-gray-900 dark:text-white mb-3">
          Follow Us
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=100092709636707"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs bg-[#1877F2] hover:bg-[#166FE5] text-white rounded transition-colors duration-200"
            aria-label="Follow us on Facebook"
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/bihesewa_official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs bg-gradient-to-r from-[#E4405F] to-[#F77737] hover:from-[#D32A4A] hover:to-[#E66628] text-white rounded transition-colors duration-200"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@bihe.sewa2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs bg-[#000000] hover:bg-[#1A1A1A] dark:bg-[#FFFFFF] dark:hover:bg-[#F0F0F0] dark:text-[#000000] text-white rounded transition-colors duration-200"
            aria-label="Follow us on TikTok"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <h2 className="text-xs font-medium text-gray-900 dark:text-white mb-3">
          Send us a Message
        </h2>
        <form className="space-y-3">
          <div>
            <label 
              htmlFor="name" 
              className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label 
              htmlFor="email" 
              className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label 
              htmlFor="message" 
              className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-gray-400 focus:border-transparent"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded transition-colors duration-200"
          >
            <Send className="w-3.5 h-3.5" />
            Send Message
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
