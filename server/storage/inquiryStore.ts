import { StoredInquiry, InquiryStats } from '../types/backend';
import { InquiryFormData } from '../../src/types';

class InquiryStore {
  private inquiries: StoredInquiry[] = [];

  constructor() {
    // Seed with a sample inquiry for initial demonstration
    this.inquiries.push({
      id: 'INQ-MANYA-1001',
      fullName: 'Vikram Patel',
      companyName: 'Apex Dyechem Industries',
      phoneNumber: '+91 98250 12345',
      emailAddress: 'vikram.patel@apexdyechem.com',
      serviceRequired: 'ETP Plant Setup',
      message: 'Need complete civil and mechanical consultation for 75 KLD industrial effluent treatment plant setup at Dahej GIDC.',
      plantCapacity: '75 KLD',
      locationCity: 'Dahej, Gujarat',
      urgencyLevel: 'Urgent (Within 24 Hours)',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      status: 'new'
    });
  }

  public add(
    formData: InquiryFormData,
    metadata?: { clientIp?: string; userAgent?: string }
  ): StoredInquiry {
    const id = `INQ-MANYA-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newInquiry: StoredInquiry = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
      clientIp: metadata?.clientIp,
      userAgent: metadata?.userAgent
    };

    // Prepend to show latest first
    this.inquiries.unshift(newInquiry);

    // Limit memory footprint to latest 100 entries
    if (this.inquiries.length > 100) {
      this.inquiries = this.inquiries.slice(0, 100);
    }

    return newInquiry;
  }

  public getAll(): StoredInquiry[] {
    return [...this.inquiries];
  }

  public getById(id: string): StoredInquiry | undefined {
    return this.inquiries.find(inq => inq.id === id);
  }

  public getStats(): InquiryStats {
    const byService: Record<string, number> = {};
    for (const inq of this.inquiries) {
      const s = inq.serviceRequired || 'Other';
      byService[s] = (byService[s] || 0) + 1;
    }

    return {
      total: this.inquiries.length,
      recentCount: this.inquiries.filter(i => {
        const diffHours = (Date.now() - new Date(i.createdAt).getTime()) / (1000 * 3600);
        return diffHours <= 48;
      }).length,
      byService
    };
  }
}

export const inquiryStore = new InquiryStore();
