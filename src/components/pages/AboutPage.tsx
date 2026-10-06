import React from 'react';
import { PageType } from '../../types';
import { COMPANY_DETAILS } from '../../data/companyData';
import { 
  Building2, 
  User, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Leaf, 
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Droplets,
  Factory,
  FileText
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-slate-50">
      {/* Page Header Banner */}
      <div className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              Corporate Profile
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Manrope'] text-white tracking-tight mt-3">
              About Manya Enterprise
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Industrial Effluent Treatment Plant (ETP) solutions, chemical supplies, engineering equipment, and specialized support services based in Vadodara, Gujarat.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        
        {/* SECTION 1 — ABOUT MANYA ENTERPRISE */}
        <section aria-labelledby="about-manya-heading">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider bg-teal-50 px-3 py-1 rounded border border-teal-200">
                <Building2 className="w-3.5 h-3.5" /> Company Overview
              </div>

              <h2 id="about-manya-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Manrope']">
                About Manya Enterprise
              </h2>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  <strong>Manya Enterprise</strong> is a specialized industrial service and environmental engineering supplier established in Padra, Vadodara, Gujarat. The company addresses critical wastewater treatment demands across modern industrial sectors through dedicated execution and reliable product supplies.
                </p>

                <p>
                  Our primary focus centers upon <strong>ETP-related solutions</strong>, ranging from effluent treatment plant setup and biological aeration systems to specialized chlorination plants. To ensure seamless plant performance, we provide a robust and dependable <strong>chemical supply</strong> network encompassing coagulants, flocculants, and neutralizing agents.
                </p>

                <p>
                  Complementing our hardware and chemical supplies, Manya Enterprise delivers dedicated <strong>labor support and trained technical manpower</strong> to assist industrial facilities in the day-to-day operation, routine servicing, and upkeep of their wastewater treatment infrastructure.
                </p>

                <p>
                  Through consistent adherence to <strong>professional service</strong> standards, transparent commercial interactions, and an uncompromising focus on environmental responsibility, Manya Enterprise continues to be a trusted vendor partner for prominent manufacturing establishments.
                </p>
              </div>

              {/* Focus Pillars Supported by Company Profile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <Droplets className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">ETP Solutions</h3>
                  <p className="text-[11px] text-slate-500">Turnkey plant setup</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <Factory className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">Chemical Supply</h3>
                  <p className="text-[11px] text-slate-500">Certified industrial grade</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">Industrial Systems</h3>
                  <p className="text-[11px] text-slate-500">Diffusers & chlorination</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <Leaf className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">Environmental</h3>
                  <p className="text-[11px] text-slate-500">Water stewardship focus</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <Briefcase className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">Labor Support</h3>
                  <p className="text-[11px] text-slate-500">Trained plant operators</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mb-1" />
                  <h3 className="text-xs font-bold text-slate-900">Professional Service</h3>
                  <p className="text-[11px] text-slate-500">Dependable execution</p>
                </div>
              </div>
            </div>

            {/* Industrial Plant Info Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-7 lg:p-8 shadow-sm border border-slate-200 bg-slate-900 text-white space-y-5">
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                    Regional Operational Hub
                  </span>
                  <h3 className="font-bold text-lg sm:text-xl font-['Manrope'] text-white mt-1">
                    Industrial & Environmental Focus
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Headquartered in Umaraya, Padra, Vadodara, delivering technical capabilities and industrial equipment tailored for manufacturing units across Gujarat.
                </p>
                <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-white">Padra, Vadodara</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Operational Reach:</span>
                    <span className="font-semibold text-teal-300">Gujarat Industrial Belts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Specialization:</span>
                    <span className="font-semibold text-white">ETP & Chemical Supplies</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 — OUR APPROACH */}
        <section aria-labelledby="our-approach-heading" className="pt-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 text-xs font-bold uppercase tracking-widest bg-teal-50 px-3 py-1 rounded border border-teal-100">
              Core Principles
            </span>
            <h2 id="our-approach-heading" className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Manrope'] mt-3">
              Our Approach
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Our operational principles guide every client interaction, project execution, and product delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Quality */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Manrope'] mb-3">
                Quality
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Focus on quality-oriented service across all engagements. From selecting high-grade treatment chemicals and durable diffuser membranes to robust chlorination assemblies, quality consistency is at the core of our operations.
              </p>
            </div>

            {/* Card 2: Professionalism */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Manrope'] mb-3">
                Professionalism
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Maintain professional standards in business and project support. We value clear commercial communications, disciplined scheduling, dependable supply chains, and respectful commercial partnerships with industrial clients.
              </p>
            </div>

            {/* Card 3: Environmental Responsibility */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-['Manrope'] mb-3">
                Environmental Responsibility
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Highlight the company's environmental-services focus. We are committed to assisting manufacturing and dairy sectors in treating effluent efficiently, conserving aquatic ecosystems, and meeting regulatory discharge norms.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 — COMPANY INFORMATION */}
        <section aria-labelledby="company-info-heading" className="pt-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 max-w-4xl mx-auto">
            <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-teal-700 text-xs font-bold uppercase tracking-widest bg-teal-50 px-2.5 py-1 rounded">
                  Official Entity Record
                </span>
                <h2 id="company-info-heading" className="text-2xl font-bold text-slate-900 font-['Manrope'] mt-2">
                  Company Information
                </h2>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg transition-colors shrink-0"
              >
                <span>Contact Nipul Mistry</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Company Name */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Company
                  </div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-['Manrope']">
                    {COMPANY_DETAILS.name}
                  </div>
                  <div className="text-xs text-teal-700 font-medium mt-0.5">
                    Industrial ETP & Environmental Solutions
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Contact Person
                  </div>
                  <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 font-['Manrope']">
                    {COMPANY_DETAILS.contactPerson}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Authorized Representative
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Location
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                    Umaraya, Padra, Vadodara, Gujarat
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    AT & PO. Umaraya, Ta. Padra, Dist. Vadodara, Gujarat
                  </div>
                </div>
              </div>

              {/* PIN & Direct Contact */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Postal Code & Inquiries
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 font-mono">
                    PIN: {COMPANY_DETAILS.location.pin}
                  </div>
                  <div className="text-xs text-teal-700 font-medium mt-1 flex items-center gap-2">
                    <a href={`tel:${COMPANY_DETAILS.phones[0].raw}`} className="hover:underline">
                      {COMPANY_DETAILS.phones[0].display}
                    </a>
                  </div>
                </div>
              </div>

              {/* GSTIN Section */}
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                      GST Identification Number (GSTIN)
                    </div>
                    <div className="text-lg sm:text-xl font-black tracking-widest font-mono text-white mt-0.5">
                      {COMPANY_DETAILS.gstin}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Registered Business Tax Identifier • Government of India / Gujarat State
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs px-3 py-1.5 rounded-md font-semibold self-start sm:self-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Verified GSTIN</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
