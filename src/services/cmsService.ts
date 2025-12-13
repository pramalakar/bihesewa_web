import apiClient from '@/src/lib/api';
import { API_ENDPOINTS, CMS_PAGES, API_BASE_URL } from '@/src/config';

export interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CMSResponse {
  success: boolean;
  data: {
    cms_id: number;
    page_name: string;
    title: string;
    content: string;
  };
  message?: string;
}

export const cmsService = {
  /**
   * Get Privacy Policy
   */
  async getPrivacyPolicy(): Promise<{ title: string; content: string } | null> {
    try {
      // Try mobile endpoint first (match mobile app pattern: include /api in path)
      const endpoint = '/api/mobile/cms/privacy-policy';
      console.log(`[CMS Service] Fetching privacy policy from: ${API_BASE_URL}${endpoint}`);
      const response = await apiClient.get<CMSResponse>(endpoint);
      if (response.data.success && response.data.data) {
        return {
          title: response.data.data.title,
          content: response.data.data.content,
        };
      }
      return null;
    } catch (error: any) {
        console.error('Error fetching privacy policy from mobile endpoint:', {
          message: error.message,
          status: error.response?.status,
          url: error.config?.url,
          fullUrl: `${API_BASE_URL}${error.config?.url || '/api/mobile/cms/privacy-policy'}`,
        });
      // Fallback to original CMS endpoint
      try {
        const fallbackEndpoint = `/api${API_ENDPOINTS.CMS}?by=name&value=privacy_policy`;
        console.log(`[CMS Service] Trying fallback endpoint: ${API_BASE_URL}${fallbackEndpoint}`);
        const response = await apiClient.get(fallbackEndpoint);
        if (response.data) {
          let content = response.data.cms_content;
          if (typeof content !== 'string') {
            // Convert BLOB to string (browser-compatible)
            try {
              if (Array.isArray(content)) {
                // Convert array of numbers to UTF-8 string
                const uint8Array = new Uint8Array(content);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (content?.data && Array.isArray(content.data)) {
                const uint8Array = new Uint8Array(content.data);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (typeof content === 'object') {
                // Try to stringify if it's an object
                content = JSON.stringify(content);
              }
            } catch (decodeError) {
              console.error('Error decoding BLOB content:', decodeError);
              content = String(content);
            }
          }
          return {
            title: response.data.cms_title || 'Privacy Policy',
            content: content || '',
          };
        }
      } catch (fallbackError: any) {
        console.error('Error fetching privacy policy from fallback endpoint:', {
          message: fallbackError.message,
          status: fallbackError.response?.status,
          url: fallbackError.config?.url,
        });
      }
      return null;
    }
  },

  /**
   * Get Terms & Conditions
   */
  async getTermsConditions(): Promise<{ title: string; content: string } | null> {
    try {
      // Try mobile endpoint first (match mobile app pattern: include /api in path)
      const endpoint = '/api/mobile/cms/terms-conditions';
      console.log(`[CMS Service] Fetching terms & conditions from: ${API_BASE_URL}${endpoint}`);
      const response = await apiClient.get<CMSResponse>(endpoint);
      if (response.data.success && response.data.data) {
        return {
          title: response.data.data.title,
          content: response.data.data.content,
        };
      }
      return null;
    } catch (error: any) {
        console.error('Error fetching terms and conditions from mobile endpoint:', {
          message: error.message,
          status: error.response?.status,
          url: error.config?.url,
          fullUrl: `${API_BASE_URL}${error.config?.url || '/api/mobile/cms/terms-conditions'}`,
        });
      // Fallback to original CMS endpoint
      try {
        const fallbackEndpoint = `/api${API_ENDPOINTS.CMS}?by=name&value=terms_conditions`;
        console.log(`[CMS Service] Trying fallback endpoint: ${API_BASE_URL}${fallbackEndpoint}`);
        const response = await apiClient.get(fallbackEndpoint);
        if (response.data) {
          let content = response.data.cms_content;
          if (typeof content !== 'string') {
            // Convert BLOB to string (browser-compatible)
            try {
              if (Array.isArray(content)) {
                // Convert array of numbers to UTF-8 string
                const uint8Array = new Uint8Array(content);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (content?.data && Array.isArray(content.data)) {
                const uint8Array = new Uint8Array(content.data);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (typeof content === 'object') {
                // Try to stringify if it's an object
                content = JSON.stringify(content);
              }
            } catch (decodeError) {
              console.error('Error decoding BLOB content:', decodeError);
              content = String(content);
            }
          }
          return {
            title: response.data.cms_title || 'Terms & Conditions',
            content: content || '',
          };
        }
      } catch (fallbackError: any) {
        console.error('Error fetching terms and conditions from fallback endpoint:', {
          message: fallbackError.message,
          status: fallbackError.response?.status,
          url: fallbackError.config?.url,
        });
      }
      return null;
    }
  },

  /**
   * Get CMS page by name (using existing endpoint as fallback)
   */
  async getPageByName(pageName: string): Promise<{ title: string; content: string } | null> {
    try {
      // Try mobile endpoint first (match mobile app pattern: include /api in path)
      try {
        const response = await apiClient.get<CMSResponse>(`/api/mobile/cms/page/${pageName}`);
        if (response.data.success && response.data.data) {
          return {
            title: response.data.data.title,
            content: response.data.data.content,
          };
        }
      } catch (mobileError) {
        // Fallback to original endpoint
        const response = await apiClient.get(`/api${API_ENDPOINTS.CMS}?by=name&value=${pageName}`);
        if (response.data) {
          // Handle BLOB content conversion if needed
          let content = response.data.cms_content;
          if (typeof content !== 'string') {
            // Convert BLOB to string (browser-compatible)
            try {
              if (Array.isArray(content)) {
                // Convert array of numbers to UTF-8 string
                const uint8Array = new Uint8Array(content);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (content?.data && Array.isArray(content.data)) {
                const uint8Array = new Uint8Array(content.data);
                const decoder = new TextDecoder('utf-8');
                content = decoder.decode(uint8Array);
              } else if (typeof content === 'object') {
                // Try to stringify if it's an object
                content = JSON.stringify(content);
              }
            } catch (decodeError) {
              console.error('Error decoding BLOB content:', decodeError);
              content = String(content);
            }
          }
          return {
            title: response.data.cms_title || '',
            content: content || '',
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching CMS page:', error);
      return null;
    }
  },

  /**
   * Get CMS page by slug (legacy method)
   */
  async getPageBySlug(slug: string): Promise<CMSPage | null> {
    try {
      const response = await apiClient.get(`/api${API_ENDPOINTS.CMS}/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching CMS page:', error);
      return null;
    }
  },

  /**
   * Get all CMS pages
   */
  async getAllPages(): Promise<CMSPage[]> {
    try {
      const response = await apiClient.get(`/api${API_ENDPOINTS.CMS}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching CMS pages:', error);
      return [];
    }
  },
};

export { CMS_PAGES };


