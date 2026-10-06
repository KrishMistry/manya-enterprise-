import { ServiceType, InquiryFormData } from '../../src/types';

export interface StoredInquiry extends InquiryFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
  clientIp?: string;
  userAgent?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface InquiryStats {
  total: number;
  recentCount: number;
  byService: Record<string, number>;
}
