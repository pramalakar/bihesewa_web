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
        <section className="bg-white dark:bg-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Trusted & Registered Company
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg mt-0.5">
                <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="font-semibold text-gray-900 dark:text-white">BiheSewa is a registered company</strong> in both 
                  <strong className="font-semibold text-gray-900 dark:text-white"> Nepal and Australia</strong>, operating with full legal compliance 
                  and transparency. We are <strong className="font-semibold text-gray-900 dark:text-white">the largest matrimonial platform</strong> 
                  dedicated exclusively to the Nepalese community worldwide.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg mt-0.5">
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="font-semibold text-gray-900 dark:text-white">Exclusively for Nepalese Worldwide:</strong> BiheSewa is designed 
                  specifically for the Nepalese community, connecting hearts across borders while maintaining our 
                  cultural values and traditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Complete Privacy & Security
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Secure Platform
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Your information is protected with industry-standard security measures. 
                We use advanced encryption and security protocols to safeguard your data.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/30 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <EyeOff className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Never Public Privacy
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Your profile is <strong className="font-semibold text-gray-900 dark:text-white">never made public</strong>. Unlike other platforms, 
                your information remains completely private and is never visible to unauthorized users.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              How BiheSewa Works
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-5 border-l-4 border-blue-500">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Company-Managed Matching
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="font-semibold text-gray-900 dark:text-white">Only BiheSewa matches profiles</strong> based on compatibility, 
                preferences, and mutual interests. You cannot browse or view other profiles yourself. 
                This ensures a respectful, privacy-first approach to finding your life partner.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-5 border-l-4 border-green-500">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Profile Sharing Between Matched Profiles Only
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Profiles are <strong className="font-semibold text-gray-900 dark:text-white">only shared between matched profiles</strong>. 
                When BiheSewa identifies a potential match, both parties' profiles are shared with each other. 
                Until then, your profile remains completely private.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-5 border-l-4 border-purple-500">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                You Can't View Others' Profiles
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong className="font-semibold text-gray-900 dark:text-white">Users cannot view other profiles themselves</strong>. 
                This mutual privacy protection means that just as you can't see others' profiles, 
                others cannot see yours either. Your privacy is mutual and respected.
              </p>
            </div>
          </div>
        </section>

        {/* Why Trust BiheSewa */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/50">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">
            Why Trust BiheSewa?
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Registered company</strong> in Nepal and Australia
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">The largest matrimonial platform</strong> for Nepalese
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Exclusively for Nepalese worldwide</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Secure platform</strong> with advanced encryption
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Never public privacy</strong> - your profile stays private
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Company-managed matching</strong> - professional and respectful
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">Profiles shared only between matches</strong>
              </span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-gray-900 dark:text-white">You can't view others' profiles</strong> - mutual privacy protection
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
