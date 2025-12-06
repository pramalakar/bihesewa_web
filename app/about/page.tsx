'use client';

import PageLayout from '@/components/PageLayout';
import { Info, Heart, Users, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout
      title="About BiheSewa"
      subtitle="Privacy-first matrimonial platform"
      icon={<Info className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      <div className="space-y-5">
        <section>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Our Mission
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            BiheSewa is a privacy-first matrimonial platform designed to help people 
            find meaningful connections while maintaining complete control over their 
            personal information.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                  Privacy First
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your data is yours. We ensure complete privacy and control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                  Respectful Connections
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  We foster an environment of respect and meaningful relationships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                  User-Centric
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Every feature is designed with your needs and privacy in mind.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                  Secure Platform
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Industry-standard security measures protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            How We Work
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            BiheSewa operates on a simple principle: mutual privacy. This creates a safe, 
            respectful environment where everyone has control over their personal information.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
