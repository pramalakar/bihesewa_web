import apiClient from '@/src/lib/api';
import { API_ENDPOINTS, CMS_PAGES } from '@/src/config';

export interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export const cmsService = {
  /**
   * Get CMS page by slug
   */
  async getPageBySlug(slug: string): Promise<CMSPage | null> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.CMS}/${slug}`);
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
      const response = await apiClient.get(API_ENDPOINTS.CMS);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching CMS pages:', error);
      return [];
    }
  },
};

export { CMS_PAGES };

