// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
export const API_URL = `${API_BASE_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  CMS: '/cms',
  AUTH: '/auth',
  USERS: '/users',
} as const;

// CMS Pages
export const CMS_PAGES = {
  SAFETY_TIPS: 'safety_tips',
  SECURE_PAYMENTS: 'secure_payments',
  TERMS_CONDITIONS: 'terms_conditions',
  PRIVACY_POLICY: 'privacy_policy',
  REFUND_POLICY: 'refund_policy',
} as const;


