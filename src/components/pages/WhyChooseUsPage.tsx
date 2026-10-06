import React from 'react';
import { PageType } from '../../types';
import { COMPANY_DETAILS } from '../../data/companyData';
import { 
  ShieldCheck, 
  Briefcase, 
  Factory, 
  Headphones, 
  Users, 
  Leaf, 
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Building2
} from 'lucide-react';

interface WhyChooseUsPageProps {
  onNavigate: (page: PageType) => void;
}

export const WhyChooseUsPage: React.FC<WhyChooseUsPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      id: 'pillar-1',
      title: 'Professional Service',
      subtitle: 'Commercial integrity & dependable execution',
      icon: <Briefcase className="w-6 h-6 text-teal-600" />,
      description: 'Manya Enterprise is an established industrial-services provider. We conduct business with transparent operational discipline, clearly defined milestones, and dependable project execution. Industrial clients benefit from structured communication and professional service at every stage of engagement.',
      points: [
        'Dedicated authorized point of contact (Nipul Mistry)',
        'Disciplined operational scheduling and dispatch',
        'Transparent commercial practices and quotations',
        'Long-term client relationship orientation'
      ]
    },
    {
      id: 'pillar-2',
      title: 'Quality Focus',
      subtitle: 'Rigorous equipment & chemical standards',
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      description: 'We prioritize quality-oriented service across every product and deployment. Whether formulating coagulant chemicals, installing membrane diffusers, or configuring chlorination dosing skids, our materials and assemblies meet stringent performance criteria designed for aggressive effluent environments.',
      points: [
        'High-purity wastewater treatment chemicals',
        'Resistant membrane materials (EPDM & silicone)',
        'Heavy-duty industrial mechanical components',
        'Continuous performance consistency checks'
      ]
    },
    {
      id: 'pillar-3',
      title: 'Industrial Solutions',
      subtitle: 'End-to-end wastewater infrastructure',
      icon: <Factory className="w-6 h-6 text-teal-600" />,
      description: 'Our portfolio covers the full range of ETP and industrial-related needs. Rather than coordinating with multiple fragmented suppliers, industrial facilities can rely on Manya Enterprise for plant setup, chemical supplies, chlorination systems, diffuser grids, and plant manpower.',
      points: [
        'Effluent Treatment Plant (ETP) turnkey setup',
        'Continuous bulk chemical supply logistics',
        'Aeration systems and high-efficiency diffusers',
        'Comprehensive industrial operation support'
      ]
    },
    {
      id: 'pillar-4',
      title: 'Reliable Support',
      subtitle: 'Responsive technical communication',
      icon: <Headphones className="w-6 h-6 text-teal-600" />,
      description: 'We emphasize prompt communication and reliable support for pressing business and facility requirements. Industrial manufacturing cannot afford downtime; our leadership ensures immediate attention to chemical replenishment orders and operational technical queries.',
      points: [
        'Direct phone access to company leadership',
        'Prompt responsiveness to chemical reorders',
        'Support for emergency plant operational needs',
        'Active coordination with on-site engineering teams'
      ]
    },
    {
      id: 'pillar-5',
      title: 'Customer Focus',
      subtitle: 'Customized to plant-specific parameters',
      icon: <Users className="w-6 h-6 text-teal-600" />,
      description: 'Our operations are designed around understanding specific customer requirements and inquiries. Every manufacturing plant handles different effluent characteristics, flow rates, and discharge requirements; we tailor our solutions to align with your facility.',
      points: [
        'Inquiry analysis focused on plant requirements',
        'Flexible engagement models for supplies and services',
        'Collaborative solution structuring',
        'Zero one-size-fits-all compromises'
      ]
    },
    {
      id: 'pillar-6',
      title: 'Environmental Focus',
      subtitle: 'Sustainable wastewater stewardship',
      icon: <Leaf className="w-6 h-6 text-teal-600" />,
      description: 'Environmental responsibility sits at the heart of our mission. Our ETP engineering solutions, biological aeration systems, and effluent treatment practices assist manufacturing enterprises in safeguarding local ecosystems and meeting strict regulatory discharge norms.',
      points: [
        'Efficient biological and chemical treatment systems',
        'Optimized oxygen transfer for biological oxidation',
        'Assisting industries in meeting regulatory standards',
        'Conservation of water bodies through cleaner effluent'
      ]
    }
  ];

  return (
    <div className="w-full bg-slate-50">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              Service Excellence
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Manrope'] text-white tracking-tight mt-3">
              Why Choose Manya Enterprise
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Explore the core principles that define our industrial solutions, quality standards, and dedicated client partnership approach.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>

                <h2 className="text-xl font-bold text-slate-900 font-['Manrope'] tracking-tight">
                  {pillar.title}
                </h2>

                <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mt-1 mb-3">
                  {pillar.subtitle}
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Aspects
                  </div>
                  {pillar.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group cursor-pointer"
                >
                  <span>Inquire on this service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider bg-slate-800 px-3 py-1 rounded">
              <Building2 className="w-3.5 h-3.5" /> Direct Enterprise Partnership
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Manrope'] text-white">
              Ready to Upgrade or Setup Your ETP Facility?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Reach out to our leadership in Padra, Vadodara to discuss chemical supplies, plant configurations, or operational manpower support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>{COMPANY_DETAILS.phones[0].display}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
