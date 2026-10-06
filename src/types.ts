export type PageType = 'home' | 'about' | 'services' | 'projects' | 'why-choose-us' | 'contact';

export type ServiceType = 
  | 'ETP Plant Setup'
  | 'ETP Chemical Supply'
  | 'Chlorination Plant'
  | 'Air Diffuser System'
  | 'Labor Supply'
  | 'Bectofine'
  | 'Other';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  inquiryServiceValue: ServiceType;
  image: string;
  tag: string;
}

export interface ClientItem {
  id: string;
  number: string;
  name: string;
  category: string;
  initials: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface InquiryFormData {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  serviceRequired: ServiceType;
  message: string;
  plantCapacity?: string;
  locationCity?: string;
  urgencyLevel?: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  subheading: string;
  contactPerson: string;
  gstin: string;
  phones: Array<{ display: string; raw: string }>;
  email: string;
  location: {
    village: string;
    taluka: string;
    district: string;
    state: string;
    pin: string;
    country: string;
    fullAddress: string;
  };
}

