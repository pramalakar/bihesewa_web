'use client';

import PageLayout from '@/components/PageLayout';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms & Conditions"
      subtitle={`Last updated: ${new Date().toLocaleDateString()}`}
      icon={<FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >
      <div className="space-y-5">
        <section>
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Agreement to Terms
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            By accessing and using BiheSewa, you agree to be bound by these Terms and 
            Conditions. Please read them carefully before using our services.
          </p>
        </section>

        <section>
          <div className="flex items-start gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                User Responsibilities
              </h3>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-3">
                <li>Provide accurate and truthful information</li>
                <li>Respect the privacy and dignity of other users</li>
                <li>Use the platform in a lawful and respectful manner</li>
                <li>Maintain the confidentiality of your account credentials</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-1.5">
                Prohibited Activities
              </h3>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1 ml-3">
                <li>Sharing false or misleading information</li>
                <li>Harassing or abusing other users</li>
                <li>Attempting to access other users&apos; accounts</li>
                <li>Using the platform for any illegal purposes</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
            Service Availability
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            We strive to provide continuous service, but we do not guarantee uninterrupted 
            access. We reserve the right to modify, suspend, or discontinue any part of the 
            service at any time.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
