'use client';

import PageLayout from '@/components/PageLayout';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle={`Last updated: ${new Date().toLocaleDateString()}`}
      icon={<Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >

          {/* Content */}
          <div className="space-y-5">
            <section>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Your Privacy is Our Priority
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                At BiheSewa, we understand that privacy is fundamental to building trust. 
                We are committed to protecting your personal information and ensuring your 
                data remains secure and private.
              </p>
            </section>

            <section>
              <div className="flex items-start gap-2 mb-3">
                <Lock className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                    Data Protection
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    We use industry-standard encryption and security measures to protect 
                    your personal information. Your data is stored securely and accessed 
                    only by authorized personnel.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-2 mb-3">
                <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                    Profile Visibility
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your profile visibility is completely under your control. This mutual 
                    privacy ensures a safe and respectful environment.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-2 mb-3">
                <FileCheck className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                    Your Rights
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
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

