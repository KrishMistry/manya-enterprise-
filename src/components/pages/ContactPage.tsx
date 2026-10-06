import React from 'react';
import { PageType, ServiceType } from '../../types';
import { COMPANY_DETAILS } from '../../data/companyData';
import { InquiryForm } from '../InquiryForm';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink,
  FileText
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  preselectedService?: ServiceType;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onNavigate,
  preselectedService = 'ETP Plant Setup' 
}) => {
  return (
    <div className="w-full bg-slate-50">
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Manrope'] text-white tracking-tight mt-3">
              Contact Manya Enterprise
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Reach our technical & commercial team in Vadodara, Gujarat to discuss ETP setup, chemical supplies, air diffusers, and environmental requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* LEFT: Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-teal-700 text-xs font-bold uppercase tracking-widest bg-teal-50 px-3 py-1 rounded border border-teal-100">
                Direct Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Manrope'] mt-2">
                Contact Information
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Authorized corporate communications and official enterprise address.
              </p>
            </div>

            {/* Corporate Entity Box */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* Company & Contact Person */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Company Name
                  </div>
                  <div className="text-xl font-black text-slate-900 font-['Manrope']">
                    MANYA ENTERPRISE
                  </div>
                  <div className="text-xs text-teal-700 font-semibold mt-0.5">
                    Industrial ETP & Environmental Solutions
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Contact Person
                  </div>
                  <div className="text-base font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                    <User className="w-4 h-4 text-teal-600" />
                    <span>Nipul Mistry</span>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="border-b border-slate-100 pb-5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Telephone / Mobile
                </div>
                <div className="space-y-2">
                  {COMPANY_DETAILS.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.raw}`}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-all text-slate-800 hover:text-teal-900 group"
                      title={`Call ${phone.display}`}
                    >
                      <div className="w-8 h-8 rounded-md bg-white text-teal-600 shadow-xs flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold font-mono">
                          {phone.display}
                        </div>
                        <div className="text-[10px] text-slate-500 group-hover:text-teal-700">
                          Click to call directly
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Address */}
              <div className="border-b border-slate-100 pb-5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </div>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-200 transition-all text-slate-800 hover:text-teal-900 group"
                  title="Send an email to Manya Enterprise"
                >
                  <div className="w-8 h-8 rounded-md bg-white text-teal-600 shadow-xs flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {COMPANY_DETAILS.email}
                    </div>
                    <div className="text-[10px] text-slate-500 group-hover:text-teal-700">
                      Direct inquiry mailbox
                    </div>
                  </div>
                </a>
              </div>

              {/* Postal Address */}
              <div className="border-b border-slate-100 pb-5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Physical Address
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800">
                  <div className="w-8 h-8 rounded-md bg-white text-teal-600 shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <address className="text-xs sm:text-sm not-italic text-slate-700 leading-relaxed">
                    <strong>AT & PO. Umaraya,</strong><br />
                    Ta. Padra,<br />
                    Dist. Vadodara,<br />
                    Gujarat - 391440, India
                  </address>
                </div>
              </div>

              {/* GSTIN Section */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  GST Identification Number (GSTIN)
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Registered GSTIN</div>
                      <div className="text-sm sm:text-base font-bold font-mono tracking-wider text-teal-300">
                        {COMPANY_DETAILS.gstin}
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-400 bg-teal-950 px-2 py-1 rounded border border-teal-800/80">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Assurance */}
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>B2B Direct Response:</strong> We treat all enterprise inquiries with commercial confidentiality and provide custom proposal assessments for your industrial site.
              </span>
            </div>

          </div>

          {/* RIGHT: Business Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
              
              <div className="border-b border-slate-100 pb-5 mb-6">
                <span className="text-teal-700 text-xs font-bold uppercase tracking-widest bg-teal-50 px-2.5 py-1 rounded">
                  Inquiry Portal
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-['Manrope'] mt-2">
                  Business Inquiry Form
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Submit your plant details and service requirements. Nipul Mistry will review and contact you promptly.
                </p>
              </div>

              {/* Reusable Inquiry Form Component with full validation and success message */}
              <InquiryForm 
                initialService={preselectedService}
                formIdPrefix="contact-page"
              />

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
