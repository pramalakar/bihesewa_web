'use client';

import PageLayout from '@/components/PageLayout';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export default function PrivacyPage() {
  // Format date consistently to avoid hydration mismatch
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <PageLayout
      title="Privacy Policy"
      subtitle={`Last updated: ${formatDate(new Date())}`}
      icon={<Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >

          {/* Content */}
          <div className="space-y-8">
            <section>
              <div className="flex flex-col items-center mb-5">
                <svg className="w-32 h-32 md:w-40 md:h-40 mb-4" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="#3B82F6" fillOpacity="0.1"/>
                  <path d="M100 40L100 100L140 120L100 100L60 120L100 100L100 40Z" fill="#3B82F6" fillOpacity="0.3"/>
                  <circle cx="100" cy="100" r="50" fill="#3B82F6" fillOpacity="0.2"/>
                  <path d="M100 70C100 70 85 80 85 95C85 110 92.5 115 100 120C107.5 115 115 110 115 95C115 80 100 70 100 70Z" fill="#3B82F6"/>
                  <circle cx="100" cy="100" r="30" stroke="#3B82F6" strokeWidth="3" fill="none"/>
                  <path d="M100 85L100 100L115 110" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
                Your Privacy is Our Priority
              </h2>
              <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                At BiheSewa, we understand that privacy is fundamental to building trust. 
                We are committed to protecting your personal information and ensuring your 
                data remains secure and private.
              </p>
            </section>

            <section>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="80" width="100" height="80" rx="8" fill="#10B981" fillOpacity="0.1"/>
                    <rect x="50" y="80" width="100" height="80" rx="8" stroke="#10B981" strokeWidth="3"/>
                    <circle cx="100" cy="120" r="20" fill="#10B981" fillOpacity="0.2"/>
                    <path d="M100 110L100 130M90 120L110 120" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="70" y="50" width="60" height="30" rx="4" fill="#10B981" fillOpacity="0.2"/>
                    <path d="M80 60L120 60M80 70L120 70" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="100" cy="35" r="8" fill="#10B981"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white">
                      Data Protection
                    </h3>
                  </div>
                  <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    We use industry-standard encryption and security measures to protect 
                    your personal information. Your data is stored securely and accessed 
                    only by authorized personnel.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="60" fill="#8B5CF6" fillOpacity="0.1"/>
                    <circle cx="100" cy="100" r="60" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="8 4"/>
                    <circle cx="100" cy="100" r="40" fill="#8B5CF6" fillOpacity="0.2"/>
                    <path d="M100 70C100 70 70 80 70 100C70 120 85 130 100 130C115 130 130 120 130 100C130 80 100 70 100 70Z" fill="#8B5CF6" fillOpacity="0.3"/>
                    <circle cx="100" cy="100" r="25" fill="#8B5CF6"/>
                    <circle cx="100" cy="100" r="15" fill="white"/>
                    <path d="M100 85L100 100L110 105" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M60 100L80 100M120 100L140 100M100 60L100 80M100 120L100 140" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white">
                      Profile Visibility
                    </h3>
                  </div>
                  <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    Your profile visibility is completely under your control. This mutual 
                    privacy ensures a safe and respectful environment.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="60" y="50" width="80" height="100" rx="8" fill="#F59E0B" fillOpacity="0.1"/>
                    <rect x="60" y="50" width="80" height="100" rx="8" stroke="#F59E0B" strokeWidth="3"/>
                    <path d="M80 80L100 100L120 80" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="100" cy="130" r="15" fill="#F59E0B" fillOpacity="0.3"/>
                    <path d="M100 120L100 140M90 130L110 130" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M70 60L130 60M70 70L130 70" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                    <circle cx="100" cy="35" r="10" fill="#F59E0B"/>
                    <path d="M95 35L100 30L105 35L100 40L95 35Z" fill="white"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <h3 className="text-base md:text-xs font-semibold text-gray-900 dark:text-white">
                      Your Rights
                    </h3>
                  </div>
                  <p className="text-base md:text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    You have the right to access, modify, or delete your personal information 
                    at any time. You can control who sees your profile and what information 
                    is visible to others.
                  </p>
                </div>
              </div>
            </section>
          </div>
    </PageLayout>
  );
}

