import React from 'react';
import { PageType, ServiceType } from '../../types';
import { COMPANY_DETAILS, SERVICES_DATA, CLIENTS_DATA, WHY_CHOOSE_ITEMS } from '../../data/companyData';
import { 
  ArrowRight, 
  Droplets, 
  CheckCircle2, 
  Factory, 
  ShieldCheck, 
  Users, 
  Headphones, 
  Leaf, 
  Briefcase,
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenInquiry: (service?: ServiceType) => void;
  onSelectService: (serviceTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onOpenInquiry,
  onSelectService 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Factory': return <Factory className="w-5 h-5 text-teal-600" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-teal-600" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-600" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-teal-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[580px] lg:min-h-[660px] flex items-center bg-slate-950 text-white overflow-hidden"
        aria-label="Industrial ETP & Environmental Solutions Hero"
      >
        {/* Background Industrial Image with Contrast Gradients */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85" 
            alt="Industrial Effluent Treatment Plant and Environmental Facility"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            
            {/* Tag badge */}
            <div className="inline-flex items-center space-x-2 bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Industrial ETP & Environmental Services • Vadodara, Gujarat</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Manrope'] leading-[1.15]">
              Industrial ETP & Environmental Solutions
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Professional solutions for ETP plant setup, chemical supply, chlorination systems, air diffuser systems and industrial support services.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-lg shadow-lg shadow-teal-950/50 hover:shadow-teal-900/80 transition-all cursor-pointer"
                id="hero-explore-services-btn"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-700 text-slate-100 hover:text-white border border-slate-700 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-all cursor-pointer backdrop-blur-xs"
                id="hero-contact-us-btn"
              >
                <span>Contact Us</span>
                <Phone className="w-4 h-4 text-teal-400" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOME — COMPANY INTRODUCTION */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80" aria-label="Company Introduction">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
                <Building2 className="w-3.5 h-3.5" /> Company Profile
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Manrope']">
                Manya Enterprise
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                Manya Enterprise is an established industrial service organization operating from Vadodara, Gujarat. We specialize in comprehensive industrial Effluent Treatment Plant (ETP) solutions, environmental engineering hardware, quality chemical supplies, and skilled industrial manpower support.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our operations focus strictly on supporting manufacturing and processing plants with robust wastewater treatment infrastructure, aeration systems, chlorination units, and reliable chemical supplies designed to uphold industrial compliance and dependable effluent parameters.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center space-x-2 text-teal-700 hover:text-teal-800 font-bold text-sm sm:text-base group cursor-pointer"
                  id="home-learn-more-btn"
                >
                  <span className="border-b-2 border-teal-600 group-hover:border-teal-800 pb-0.5">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Industrial Feature Card Box */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
                
                <h3 className="text-lg font-bold text-white font-['Manrope'] mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  Industrial Capability Highlights
                </h3>

                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>Effluent Treatment Plant (ETP) Setup & Commissioning</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>Specialty Coagulants, Flocculants & Neutralizing Chemicals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>Chlorination Plant Systems & Automated Chemical Dosing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>Membrane Air Diffusers (Fine & Coarse Bubble)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                    <span>Trained Technical Operators & Industrial Labor Supply</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-mono">GSTIN:</span>
                    <span className="text-teal-300 font-mono font-bold">{COMPANY_DETAILS.gstin}</span>
                  </div>
                  <span className="text-teal-400 font-semibold bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">B2B Registered</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOME — SERVICES PREVIEW */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200" aria-label="Services Preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-100/60 px-2.5 py-1 rounded">
                Core Offerings
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Manrope'] mt-2">
                Our Services
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Targeted environmental and industrial solutions tailored for manufacturing, processing, and dairy plants across Gujarat and Western India.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors shrink-0"
            >
              <span>View All Services Detail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 group hover:border-teal-500/40"
              >
                <div>
                  {/* Card Header with Number and Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-teal-400 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                      {service.number}
                    </div>
                    <span className="bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-teal-100">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-['Manrope'] group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onNavigate('services');
                      onSelectService(service.title);
                    }}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>View Service →</span>
                  </button>

                  <button
                    onClick={() => onOpenInquiry(service.inquiryServiceValue)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HOME — WHY MANYA ENTERPRISE */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200" aria-label="Why Manya Enterprise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded">
              Core Competencies
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Manrope'] mt-3">
              Why Manya Enterprise
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Our service model is grounded in professional standards, reliable technical communication, and environmental stewardship.
            </p>
          </div>

          {/* 6 Professional Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-teal-500/40 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center mb-4">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Manrope'] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('why-choose-us')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>Read Full Why Choose Us Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. HOME — PROJECTS & CLIENTS PREVIEW */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white" aria-label="Our Clients & Projects Preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-400 bg-slate-800 px-3 py-1 rounded">
                Industrial Portfolio
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mt-3">
                Our Clients & Projects
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Manya Enterprise has extended ETP services, chemical supply, and facility support to recognized organizations and manufacturing leaders:
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 px-4 py-2.5 rounded-lg border border-slate-700 text-sm font-semibold transition-colors cursor-pointer shrink-0"
              id="home-view-all-projects-btn"
            >
              <span>View All Projects →</span>
            </button>
          </div>

          {/* Client Logos / Names Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CLIENTS_DATA.map((client) => (
              <div
                key={client.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-teal-500/50 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-teal-950/30 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    #{client.number}
                  </span>
                  <span className="w-8 h-8 rounded-md bg-teal-500/10 text-teal-400 text-xs font-black flex items-center justify-center border border-teal-500/20">
                    {client.initials}
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-['Manrope']">
                    {client.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {client.category}
                  </p>
                </div>
              </div>
            ))}

            {/* Inquire Card in Grid */}
            <div 
              onClick={() => onNavigate('contact')}
              className="bg-teal-950/40 border border-teal-500/30 hover:border-teal-400 rounded-xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-center items-center text-center group"
            >
              <Building2 className="w-6 h-6 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-bold text-teal-200">
                Join Our Client Roster
              </div>
              <p className="text-[11px] text-teal-400/80 mt-1">
                Consult on your industrial ETP needs
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOME — CTA SECTION */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-teal-800 to-slate-900 text-white relative overflow-hidden" aria-label="Call To Action">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
            Commercial & Technical Inquiries
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-['Manrope'] tracking-tight">
            Looking for Reliable Industrial & ETP Solutions?
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Contact Manya Enterprise to discuss your requirements.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              id="cta-send-inquiry-btn"
            >
              <span>Send an Inquiry</span>
              <ArrowRight className="w-4 h-4 text-teal-700" />
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
              className="bg-slate-900/60 hover:bg-slate-900 text-white border border-teal-400/40 font-semibold text-sm sm:text-base px-6 py-4 rounded-lg transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call: {COMPANY_DETAILS.phones[0].display}</span>
            </a>
          </div>

          <div className="pt-4 text-xs text-slate-300 flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-teal-300" />
            <span>Serving manufacturing hubs across Vadodara, Bharuch, Dahej, Ankleshwar & Gujarat</span>
          </div>
        </div>
      </section>
    </div>
  );
};
