import React from 'react';
import { PageType, ServiceType } from '../types';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/companyData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectService }) => {
  const quickLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Projects & Clients', page: 'projects' },
    { label: 'Why Choose Us', page: 'why-choose-us' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNav = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceTitle: string) => {
    onNavigate('services');
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" aria-label="Corporate Footer">
      {/* Main 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-['Manrope']">
                MANYA ENTERPRISE
              </span>
              <span className="text-[11px] text-teal-400 font-semibold tracking-wider uppercase">
                Vadodara, Gujarat
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Contact Person: <strong className="text-slate-200">{COMPANY_DETAILS.contactPerson}</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 font-mono">GSTIN:</span>
                <span className="font-mono font-bold text-teal-300 tracking-wider">{COMPANY_DETAILS.gstin}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-bold font-['Manrope'] tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-full inline-block"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white text-base font-bold font-['Manrope'] tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-full inline-block"></span>
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleServiceClick(srv.title)}
                    className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-bold font-['Manrope'] tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-teal-500 rounded-full inline-block"></span>
              Contact
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div className="flex flex-col space-y-1">
                  {COMPANY_DETAILS.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.raw}`}
                      className="text-slate-300 hover:text-teal-300 font-medium transition-colors"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-slate-300 hover:text-teal-300 break-all transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <address className="text-slate-400 not-italic leading-snug">
                  {COMPANY_DETAILS.location.village},<br />
                  {COMPANY_DETAILS.location.taluka},<br />
                  {COMPANY_DETAILS.location.district},<br />
                  {COMPANY_DETAILS.location.state} - {COMPANY_DETAILS.location.pin}
                </address>
              </div>
            </div>
          </div>

        </div>
      </div>


    </footer>
  );
};
