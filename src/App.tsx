import React, { useState, useEffect } from 'react';
import { PageType, ServiceType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { WhyChooseUsPage } from './components/pages/WhyChooseUsPage';
import { ContactPage } from './components/pages/ContactPage';
import { COMPANY_DETAILS } from './data/companyData';
import { Phone, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('ETP Plant Setup');
  const [highlightedServiceTitle, setHighlightedServiceTitle] = useState<string | null>(null);

  // Synchronize SEO Title based on current page as requested
  useEffect(() => {
    switch (currentPage) {
      case 'home':
        document.title = 'Manya Enterprise | Industrial ETP & Environmental Solutions';
        break;
      case 'about':
        document.title = 'About Manya Enterprise | Industrial & ETP Services';
        break;
      case 'services':
        document.title = 'ETP Plant Setup & Industrial Services | Manya Enterprise';
        break;
      case 'projects':
        document.title = 'Manya Enterprise | Clients & Projects';
        break;
      case 'why-choose-us':
        document.title = 'Why Choose Manya Enterprise | Industrial Solutions';
        break;
      case 'contact':
        document.title = 'Contact Manya Enterprise | Vadodara, Gujarat';
        break;
      default:
        document.title = 'Manya Enterprise | Industrial ETP & Environmental Solutions';
    }
  }, [currentPage]);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (service?: ServiceType) => {
    if (service) {
      setSelectedService(service);
    }
    setInquiryModalOpen(true);
  };

  const handleSelectServiceFromHome = (serviceTitle: string) => {
    setHighlightedServiceTitle(serviceTitle);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-700 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenInquiryModal={() => handleOpenInquiry()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectService={handleSelectServiceFromHome}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage 
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            selectedServiceTitle={highlightedServiceTitle}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'why-choose-us' && (
          <WhyChooseUsPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={handleNavigate}
            preselectedService={selectedService}
          />
        )}
      </main>

      {/* Universal Footer across all pages */}
      <Footer 
        onNavigate={handleNavigate}
        onSelectService={handleSelectServiceFromHome}
      />

      {/* Quick Business Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        serviceRequired={selectedService}
      />

      {/* Mobile Sticky Quick Contact CTA Bar */}
      <aside aria-label="Quick Actions" className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 sm:hidden flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-teal-400 font-semibold text-xs rounded-lg border border-slate-700 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>
        <button
          onClick={() => handleNavigate('contact')}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg shadow-md transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Send Inquiry</span>
        </button>
      </aside>
    </div>
  );
}
