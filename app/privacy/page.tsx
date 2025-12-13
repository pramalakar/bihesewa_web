'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';
import { cmsService } from '@/src/services/cmsService';

// Helper function to clean and prepare HTML content
// Decodes HTML entities so tags are rendered, not displayed as text
const prepareHtmlContent = (content: string): string => {
  if (!content) return '';
  
  // Check if content is already valid HTML (starts with <)
  // If it starts with &lt; or contains &lt; tags, it's HTML-encoded
  const isEncoded = content.includes('&lt;') || content.includes('&gt;') || content.includes('&amp;');
  
  if (isEncoded) {
    // Decode HTML entities - order matters! Do &amp; last to avoid double-decoding
    let decoded = content
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#60;/g, '<')
      .replace(/&#62;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&'); // Do this last to avoid double-decoding
    
    // If still encoded, decode again (handles double-encoding)
    if (decoded.includes('&lt;') || decoded.includes('&gt;')) {
      decoded = decoded
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    }
    
    return decoded;
  }
  
  // Content is already valid HTML, return as-is
  return content;
};

export default function PrivacyPage() {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('Privacy Policy');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getPrivacyPolicy();
      if (data) {
        setContent(prepareHtmlContent(data.content));
        setTitle(data.title || 'Privacy Policy');
      }
    } catch (error) {
      console.error('Error loading privacy policy:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date consistently to avoid hydration mismatch
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <PageLayout
      title={title}
      subtitle={`Last updated: ${formatDate(new Date())}`}
      icon={<Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />}
    >

          {/* Content */}
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
              </div>
            ) : content ? (
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No content available at this time.</p>
              </div>
            )}
          </div>
    </PageLayout>
  );
}

