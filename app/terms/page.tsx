'use client';

import PageLayout from '@/components/PageLayout';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  // Format date consistently to avoid hydration mismatch
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <PageLayout
      title="Terms & Conditions"
      subtitle={`Last updated: ${formatDate(new Date())}`}
      icon={<FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      <div className="space-y-8">
        <section>
          <div className="flex flex-col items-center mb-5">
            <svg className="w-32 h-32 md:w-40 md:h-40 mb-4" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="40" width="100" height="120" rx="8" fill="#F59E0B" fillOpacity="0.1"/>
              <rect x="50" y="40" width="100" height="120" rx="8" stroke="#F59E0B" strokeWidth="3"/>
              <path d="M70 70L130 70M70 90L130 90M70 110L130 110" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="100" cy="25" r="12" fill="#F59E0B"/>
              <path d="M95 25L100 20L105 25L100 30L95 25Z" fill="white"/>
              <rect x="60" y="50" width="80" height="5" rx="2" fill="#F59E0B" fillOpacity="0.3"/>
            </svg>
          </div>
          <h2 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
            Agreement to Terms
          </h2>
          <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            By accessing and using BiheSewa, you agree to be bound by these Terms and 
            Conditions. Please read them carefully before using our services.
          </p>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="60" fill="#10B981" fillOpacity="0.1"/>
                <circle cx="100" cy="100" r="60" stroke="#10B981" strokeWidth="3"/>
                <path d="M70 100L90 120L130 80" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="100" cy="100" r="40" fill="#10B981" fillOpacity="0.2"/>
                <circle cx="100" cy="100" r="25" fill="#10B981"/>
                <path d="M90 100L95 105L110 90" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="100" cy="40" r="15" fill="#10B981" fillOpacity="0.3"/>
                <path d="M100 30L100 50M90 40L110 40" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white">
                  User Responsibilities
                </h3>
              </div>
              <ul className="list-disc list-inside text-base md:text-xs text-gray-700 dark:text-gray-300 space-y-1.5 ml-3">
                <li>Provide accurate and truthful information</li>
                <li>Respect the privacy and dignity of other users</li>
                <li>Use the platform in a lawful and respectful manner</li>
                <li>Maintain the confidentiality of your account credentials</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="60" fill="#EF4444" fillOpacity="0.1"/>
                <circle cx="100" cy="100" r="60" stroke="#EF4444" strokeWidth="3"/>
                <path d="M100 70L100 130M70 100L130 100" stroke="#EF4444" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="100" cy="100" r="40" fill="#EF4444" fillOpacity="0.2"/>
                <circle cx="100" cy="100" r="25" fill="#EF4444"/>
                <path d="M85 85L115 115M115 85L85 115" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <rect x="80" y="40" width="40" height="20" rx="4" fill="#EF4444" fillOpacity="0.3"/>
                <path d="M90 50L110 50" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white">
                  Prohibited Activities
                </h3>
              </div>
              <ul className="list-disc list-inside text-base md:text-xs text-gray-700 dark:text-gray-300 space-y-1.5 ml-3">
                <li>Sharing false or misleading information</li>
                <li>Harassing or abusing other users</li>
                <li>Attempting to access other users&apos; accounts</li>
                <li>Using the platform for any illegal purposes</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="70" fill="#3B82F6" fillOpacity="0.1"/>
                <circle cx="100" cy="100" r="50" fill="#3B82F6" fillOpacity="0.2"/>
                <circle cx="100" cy="100" r="30" stroke="#3B82F6" strokeWidth="4"/>
                <path d="M100 70L100 100L125 115" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <circle cx="100" cy="100" r="8" fill="#3B82F6"/>
                <path d="M60 100L80 100M120 100L140 100M100 60L100 80M100 120L100 140" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
                <circle cx="100" cy="40" r="12" fill="#3B82F6" fillOpacity="0.3"/>
                <path d="M100 30L100 50M90 40L110 40" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white mb-2">
                Service Availability
              </h3>
              <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                We strive to provide continuous service, but we do not guarantee uninterrupted 
                access. We reserve the right to modify, suspend, or discontinue any part of the 
                service at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
