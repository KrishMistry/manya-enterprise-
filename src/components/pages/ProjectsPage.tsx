import React from 'react';
import { PageType } from '../../types';
import { CLIENTS_DATA, COMPANY_DETAILS } from '../../data/companyData';
import { 
  Building2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Factory,
  Mail,
  CheckCircle2
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: PageType) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-slate-50">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded">
              Corporate Engagements
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-['Manrope'] text-white tracking-tight mt-3">
              Our Clients & Projects
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Trusted relationships with recognized chemical, food processing, dairy, and manufacturing enterprises across India.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        
        {/* Notice & Context */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 text-sm text-slate-700 max-w-2xl">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">
                Commercial & Technical Engagements
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Manya Enterprise provides ETP setup, chemical supply, chlorination plants, air diffusers, and facility manpower to key industrial organizations.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>Inquire for Your Facility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Clean Industrial Cards */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENTS_DATA.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Number and Industrial Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                        #{client.number}
                      </span>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        Client Partner
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold text-xs font-mono group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      {client.initials}
                    </div>
                  </div>

                  {/* Client Name as specified */}
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Manrope'] tracking-tight group-hover:text-teal-700 transition-colors">
                    {client.name}
                  </h2>

                  {/* Sector indication */}
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-2 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-slate-400" />
                    <span>{client.category}</span>
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Verified Client Roster
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    ETP / Environmental
                  </span>
                </div>
              </div>
            ))}

            {/* Final Roster Card - Call to Action */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mb-6">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-['Manrope'] text-white">
                  Partner with Manya Enterprise
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  Discover how our ETP plant engineering, chemical supplies, and equipment can support your facility's operational compliance.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Support Callout */}
        <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200 text-center max-w-3xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-slate-900 font-['Manrope']">
            Direct Support for Industrial Operations
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For technical queries regarding chemical dosages, air diffuser specifications, or plant site evaluations, speak directly with Nipul Mistry.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
              className="text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2 rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{COMPANY_DETAILS.phones[0].display}</span>
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 px-4 py-2 rounded-md transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
