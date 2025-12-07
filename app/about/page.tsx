'use client';

import PageLayout from '@/components/PageLayout';
import { Info, Shield, Building2, Globe, Lock, EyeOff, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout
      title="About BiheSewa"
      subtitle="Trusted Matrimony Platform for Nepalese Worldwide"
      icon={<Info className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      <div className="space-y-8">
        {/* Trust & Credibility Section */}
        <section className="md:bg-white md:dark:bg-gray-800/30 md:rounded-xl md:p-6 md:border md:border-gray-200 md:dark:border-gray-700 md:shadow-sm">
          <div className="flex items-center gap-3 mb-5 md:mb-4">
            <CheckCircle2 className="w-6 h-6 md:w-5 md:h-5 text-green-600 dark:text-green-400 flex-shrink-0 md:p-2 md:bg-green-100 md:dark:bg-green-900/30 md:rounded-lg" />
            <h2 className="text-xl md:text-base font-semibold text-gray-900 dark:text-white">
              Trusted & Registered Company
            </h2>
          </div>
          <div className="space-y-5 md:space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0 md:p-2 md:bg-gray-100 md:dark:bg-gray-700/50 md:rounded-lg md:mt-0.5" />
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="font-semibold text-gray-900 dark:text-white">BiheSewa is a registered company</strong> in both 
                <strong className="font-semibold text-gray-900 dark:text-white"> Nepal and Australia</strong>, operating with full legal compliance 
                and transparency. We are <strong className="font-semibold text-gray-900 dark:text-white">the largest matrimonial platform</strong> 
                dedicated exclusively to the Nepalese community worldwide.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0 md:p-2 md:bg-gray-100 md:dark:bg-gray-700/50 md:rounded-lg md:mt-0.5" />
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="font-semibold text-gray-900 dark:text-white">Exclusively for Nepalese Worldwide:</strong> BiheSewa is designed 
                specifically for the Nepalese community, connecting hearts across borders while maintaining our 
                cultural values and traditions.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section>
          <div className="flex items-center gap-3 mb-5 md:mb-4">
            <Shield className="w-6 h-6 md:w-5 md:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 md:p-2 md:bg-blue-100 md:dark:bg-blue-900/30 md:rounded-lg" />
            <h2 className="text-xl md:text-base font-semibold text-gray-900 dark:text-white">
              Complete Privacy & Security
            </h2>
          </div>
          <div className="space-y-5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            <div className="md:bg-white md:dark:bg-gray-800/30 md:rounded-lg md:p-5 md:border md:border-gray-200 md:dark:border-gray-700 md:shadow-sm">
              <div className="flex flex-col items-center mb-3 md:flex-row md:items-center md:gap-3 md:mb-3">
                <div className="mb-2 md:mb-0">
                  <svg className="w-16 h-16 md:w-14 md:h-14" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="80" width="100" height="80" rx="8" fill="#3B82F6" fillOpacity="0.1"/>
                    <rect x="50" y="80" width="100" height="80" rx="8" stroke="#3B82F6" strokeWidth="3"/>
                    <circle cx="100" cy="120" r="20" fill="#3B82F6" fillOpacity="0.2"/>
                    <path d="M100 110L100 130M90 120L110 120" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
                    <rect x="70" y="50" width="60" height="30" rx="4" fill="#3B82F6" fillOpacity="0.2"/>
                    <circle cx="100" cy="35" r="8" fill="#3B82F6"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 md:p-2 md:bg-blue-100 md:dark:bg-blue-900/30 md:rounded-lg" />
                  <h3 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white">
                    Secure Platform
                  </h3>
                </div>
              </div>
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                Your information is protected with industry-standard security measures. 
                We use advanced encryption and security protocols to safeguard your data.
              </p>
            </div>
            <div className="md:bg-white md:dark:bg-gray-800/30 md:rounded-lg md:p-5 md:border md:border-gray-200 md:dark:border-gray-700 md:shadow-sm">
              <div className="flex flex-col items-center mb-3 md:flex-row md:items-center md:gap-3 md:mb-3">
                <div className="mb-2 md:mb-0">
                  <svg className="w-16 h-16 md:w-14 md:h-14" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="60" fill="#8B5CF6" fillOpacity="0.1"/>
                    <circle cx="100" cy="100" r="60" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="8 4"/>
                    <circle cx="100" cy="100" r="40" fill="#8B5CF6" fillOpacity="0.2"/>
                    <path d="M100 70C100 70 70 80 70 100C70 120 85 130 100 130C115 130 130 120 130 100C130 80 100 70 100 70Z" fill="#8B5CF6" fillOpacity="0.3"/>
                    <circle cx="100" cy="100" r="25" fill="#8B5CF6"/>
                    <circle cx="100" cy="100" r="15" fill="white"/>
                    <path d="M100 85L100 100L110 105" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-purple-600 dark:text-purple-400 md:p-2 md:bg-purple-100 md:dark:bg-purple-900/30 md:rounded-lg" />
                  <h3 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white">
                    Never Public Privacy
                  </h3>
                </div>
              </div>
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                Your profile is <strong className="font-semibold text-gray-900 dark:text-white">never made public</strong>. Unlike other platforms, 
                your information remains completely private and is never visible to unauthorized users.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section>
          <div className="flex items-center gap-3 mb-5 md:mb-4">
            <Users className="w-6 h-6 md:w-5 md:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 md:p-2 md:bg-purple-100 md:dark:bg-purple-900/30 md:rounded-lg" />
            <h2 className="text-xl md:text-base font-semibold text-gray-900 dark:text-white">
              How BiheSewa Works
            </h2>
          </div>
          <div className="space-y-6 md:space-y-4">
            <div className="md:bg-blue-50 md:dark:bg-blue-900/10 md:rounded-lg md:p-5 md:border-l-4 md:border-blue-500">
              <div className="flex flex-col items-center mb-3 md:flex-row md:items-center md:gap-3 md:mb-2">
                <svg className="w-16 h-16 md:w-14 md:h-14 mb-2 md:mb-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="70" fill="#3B82F6" fillOpacity="0.1"/>
                  <circle cx="70" cy="100" r="25" fill="#3B82F6" fillOpacity="0.3"/>
                  <circle cx="130" cy="100" r="25" fill="#3B82F6" fillOpacity="0.3"/>
                  <path d="M95 100L105 100" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="100" cy="100" r="15" fill="#3B82F6"/>
                  <path d="M100 85L100 100L110 110" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
                <h3 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white text-center md:text-left">
                  Company-Managed Matching
                </h3>
              </div>
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                <strong className="font-semibold text-gray-900 dark:text-white">Only BiheSewa matches profiles</strong> based on compatibility, 
                preferences, and mutual interests. You cannot browse or view other profiles yourself. 
                This ensures a respectful, privacy-first approach to finding your life partner.
              </p>
            </div>
            <div className="md:bg-green-50 md:dark:bg-green-900/10 md:rounded-lg md:p-5 md:border-l-4 md:border-green-500">
              <div className="flex flex-col items-center mb-3 md:flex-row md:items-center md:gap-3 md:mb-2">
                <svg className="w-16 h-16 md:w-14 md:h-14 mb-2 md:mb-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="70" fill="#10B981" fillOpacity="0.1"/>
                  <rect x="50" y="80" width="50" height="40" rx="4" fill="#10B981" fillOpacity="0.2"/>
                  <rect x="100" y="80" width="50" height="40" rx="4" fill="#10B981" fillOpacity="0.2"/>
                  <path d="M100 100L100 120M90 110L110 110" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M75 100L125 100" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="100" cy="60" r="12" fill="#10B981"/>
                  <path d="M95 60L100 55L105 60L100 65L95 60Z" fill="white"/>
                </svg>
                <h3 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white text-center md:text-left">
                  Profile Sharing Between Matched Profiles Only
                </h3>
              </div>
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                Profiles are <strong className="font-semibold text-gray-900 dark:text-white">only shared between matched profiles</strong>. 
                When BiheSewa identifies a potential match, both parties' profiles are shared with each other. 
                Until then, your profile remains completely private.
              </p>
            </div>
            <div className="md:bg-purple-50 md:dark:bg-purple-900/10 md:rounded-lg md:p-5 md:border-l-4 md:border-purple-500">
              <div className="flex flex-col items-center mb-3 md:flex-row md:items-center md:gap-3 md:mb-2">
                <svg className="w-16 h-16 md:w-14 md:h-14 mb-2 md:mb-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="70" fill="#8B5CF6" fillOpacity="0.1"/>
                  <circle cx="100" cy="100" r="50" fill="#8B5CF6" fillOpacity="0.2"/>
                  <path d="M100 60L100 140M60 100L140 100" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="100" cy="100" r="30" stroke="#8B5CF6" strokeWidth="3" fill="none"/>
                  <circle cx="100" cy="100" r="20" fill="#8B5CF6" fillOpacity="0.3"/>
                  <path d="M100 85L100 115M85 100L115 100" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3 className="text-lg md:text-sm font-semibold text-gray-900 dark:text-white text-center md:text-left">
                  You Can't View Others' Profiles
                </h3>
              </div>
              <p className="text-base md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                <strong className="font-semibold text-gray-900 dark:text-white">Users cannot view other profiles themselves</strong>. 
                This mutual privacy protection means that just as you can't see others' profiles, 
                others cannot see yours either. Your privacy is mutual and respected.
              </p>
            </div>
          </div>
        </section>

        {/* Why Trust BiheSewa */}
        <section className="md:bg-gradient-to-br md:from-blue-50 md:via-purple-50 md:to-blue-50 md:dark:from-blue-900/20 md:dark:via-purple-900/20 md:dark:to-blue-900/20 md:rounded-xl md:p-6 md:border md:border-blue-200 md:dark:border-blue-800/50">
          <h2 className="text-xl md:text-base font-semibold text-gray-900 dark:text-white mb-5 md:mb-4">
            Why Trust BiheSewa?
          </h2>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Registered company</strong> in Nepal and Australia
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">The largest matrimonial platform</strong> for Nepalese
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Exclusively for Nepalese worldwide</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Secure platform</strong> with advanced encryption
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Never public privacy</strong> - your profile stays private
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Company-managed matching</strong> - professional and respectful
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Profiles shared only between matches</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-base md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">You can't view others' profiles</strong> - mutual privacy protection
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
