import React from 'react';
import { PageType, ServiceType } from '../../types';
import { SERVICES_DATA, COMPANY_DETAILS } from '../../data/companyData';
import { 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Phone, 
  Mail, 
  Droplets, 
  Sparkles,
  Layers,
  Wrench,
  ShieldCheck
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenInquiry: (service?: ServiceType) => void;
  selectedServiceTitle?: string | null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenInquiry,
  selectedServiceTitle
}) => {
  return (
    <div className="w-full bg-slate-50">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              B2B Industrial Solutions
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Manrope'] text-white tracking-tight mt-3">
              Industrial ETP & Support Services
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Professional services for ETP plant setup, specialty chemical supply, chlorination plants, air diffuser grids, and skilled industrial manpower support.
            </p>
          </div>
        </div>
      </div>

      {/* Main Services Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        
        {/* Intro notice */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-sm text-slate-700">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
            <span>
              All services adhere to industry standards and client-specified technical requirements. Inquiries handled directly by technical personnel.
            </span>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold uppercase tracking-wider text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg border border-teal-200 transition-colors shrink-0"
          >
            Direct Inquiry Form →
          </button>
        </div>

        {/* 5 Large Professional Service Sections */}
        <div className="space-y-8">
          {SERVICES_DATA.map((service) => {
            const isHighlighted = selectedServiceTitle === service.title;

            return (
              <section
                key={service.id}
                id={`service-${service.number}`}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md p-6 sm:p-10 ${
                  isHighlighted 
                    ? 'border-teal-500 ring-2 ring-teal-500/20' 
                    : 'border-slate-200'
                }`}
                aria-label={service.title}
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-10 h-10 rounded-lg bg-slate-900 text-teal-400 font-mono text-sm font-bold flex items-center justify-center border border-slate-700">
                        {service.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                        {service.tag}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref #{service.number}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Manrope'] tracking-tight">
                      {service.title}
                    </h2>

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-3">
                      {service.fullDescription}
                    </p>
                  </div>

                  {/* Capabilities Checklist */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Service Scope & Capabilities:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onOpenInquiry(service.inquiryServiceValue)}
                      className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
                      id={`service-inquiry-${service.number}-btn`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </button>

                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>Direct Consult:</span>
                      <a href={`tel:${COMPANY_DETAILS.phones[0].raw}`} className="font-semibold text-slate-800 hover:text-teal-600">
                        {COMPANY_DETAILS.phones[0].display}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* SERVICES CTA AT THE BOTTOM */}
        <section 
          className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl text-center relative overflow-hidden"
          aria-label="Services Bottom Call to Action"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              Tailored Industrial Requirements
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Manrope'] text-white tracking-tight">
              Have a Specific Requirement?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Let's discuss your project requirements.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-lg hover:shadow-teal-900/50 transition-all cursor-pointer inline-flex items-center gap-2"
                id="services-contact-manya-btn"
              >
                <span>Contact Manya Enterprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base px-5 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
