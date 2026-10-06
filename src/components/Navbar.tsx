import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Droplets, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenInquiryModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate,
  onOpenInquiryModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Projects & Clients', page: 'projects' },
    { label: 'Why Choose Us', page: 'why-choose-us' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar for Corporate Trust */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center space-x-6 text-slate-300">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Umaraya, Padra, Vadodara, Gujarat (391440)</span>
            </div>
            <div className="hidden md:flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Industrial ETP & Environmental Solutions</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1.5 bg-slate-800/80 text-teal-300 font-mono text-[11px] px-2 py-0.5 rounded border border-slate-700">
              <span className="text-slate-400 font-sans font-semibold">GSTIN:</span>
              <span className="font-bold">{COMPANY_DETAILS.gstin}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-5 text-slate-300">
            <a 
              href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
              className="flex items-center space-x-1.5 hover:text-teal-300 transition-colors"
              title="Call primary line"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="font-medium">{COMPANY_DETAILS.phones[0].display}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="hidden sm:flex items-center space-x-1.5 hover:text-teal-300 transition-colors"
              title="Send an email"
            >
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3.5' 
            : 'bg-slate-900 border-b border-slate-800 py-4'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Title */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex flex-col text-left focus:outline-none group"
              id="brand-logo-btn"
            >
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Manrope'] leading-none">
                MANYA <span className="text-teal-400">ENTERPRISE</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                ETP & Environmental Solutions
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'text-teal-400 bg-slate-800/80 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    id={`nav-link-${link.page}`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm shadow-teal-950 transition-all duration-200 hover:shadow-md cursor-pointer"
                id="header-contact-btn"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Toggle navigation menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-teal-400 font-semibold'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-800/80 mt-3 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full inline-flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors"
              >
                <span>Contact Us / Inquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="pt-2 flex justify-between text-xs text-slate-400 px-1">
                <a href={`tel:${COMPANY_DETAILS.phones[0].raw}`} className="hover:text-teal-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Call {COMPANY_DETAILS.phones[0].display}
                </a>
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-teal-400 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
