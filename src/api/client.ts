import { InquiryFormData, ServiceItem, CompanyInfo } from '../types';

export interface BackendInquiryResponse {
  success: boolean;
  message: string;
  data?: {
    inquiryId: string;
    createdAt: string;
    status: string;
    serviceRequired: string;
    clientName: string;
  };
  error?: string;
}

export interface BackendHealthResponse {
  status: string;
  appName: string;
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
}

/**
 * Submit inquiry to the backend API /api/inquiries
 */
export async function submitInquiryToBackend(
  data: InquiryFormData
): Promise<BackendInquiryResponse> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return json;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error';
    return {
      success: false,
      message: 'Failed to connect to backend server',
      error: errorMsg,
    };
  }
}

/**
 * Fetch services catalog from backend API /api/services
 */
export async function fetchServicesFromBackend(): Promise<{
  success: boolean;
  data?: ServiceItem[];
  error?: string;
}> {
  try {
    const response = await fetch('/api/services');
    return await response.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

/**
 * Fetch company profile from backend API /api/company
 */
export async function fetchCompanyFromBackend(): Promise<{
  success: boolean;
  data?: CompanyInfo;
  error?: string;
}> {
  try {
    const response = await fetch('/api/company');
    return await response.json();
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

/**
 * Check backend health status
 */
export async function checkBackendHealth(): Promise<BackendHealthResponse | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
