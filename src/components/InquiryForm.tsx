import React, { useState, useRef, useEffect } from 'react';
import { ServiceType, InquiryFormData } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { buildInquiryEmailContent } from '../utils/inquiryMailer';
import { submitInquiryToBackend } from '../api/client';
import { 
  sanitizeHeaderField, 
  sanitizeText, 
  isValidEmail, 
  isValidPhone, 
  checkRateLimit, 
  recordRateLimitAttempt, 
  isHumanTiming 
} from '../utils/security';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Inbox,
  ArrowRight,
  Lock,
  ShieldAlert
} from 'lucide-react';

interface InquiryFormProps {
  initialService?: ServiceType;
  formIdPrefix?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialService = 'ETP Plant Setup',
  formIdPrefix = 'inquiry',
  onSuccess,
  compact = false
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    companyName: '',
    phoneNumber: '',
    emailAddress: '',
    serviceRequired: initialService,
    message: '',
    plantCapacity: '',
    locationCity: '',
    urgencyLevel: 'Normal (Within 24-48 Hours)'
  });

  // Security States: Honeypot trap, timing measurement, and cooldown
  const [botTrap, setBotTrap] = useState('');
  const mountTimeRef = useRef<number>(Date.now());
  const [rateLimitCooldown, setRateLimitCooldown] = useState<number>(0);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Rate-limit cooldown countdown timer
  useEffect(() => {
    if (rateLimitCooldown <= 0) return;
    const interval = setInterval(() => {
      setRateLimitCooldown(prev => {
        if (prev <= 1) {
          setErrorMsg(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [rateLimitCooldown]);

  // Computed mail content
  const mailContent = buildInquiryEmailContent(formData, {
    plantCapacity: formData.plantCapacity,
    locationCity: formData.locationCity,
    urgencyLevel: formData.urgencyLevel
  });

  const servicesList: ServiceType[] = [
    'ETP Plant Setup',
    'ETP Chemical Supply',
    'Chlorination Plant',
    'Air Diffuser System',
    'Labor Supply',
    'Bectofine',
    'Other'
  ];

  const urgencyOptions = [
    'Immediate (Urgent Plant Requirement)',
    'Within 24-48 Hours',
    'Planning Stage (1-2 Weeks)',
    'Budgetary Estimate / Tender'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Anti-Bot Honeypot Protection: Automated scraper bots fill in all input fields
    if (botTrap && botTrap.trim().length > 0) {
      setErrorMsg('Automated submission rejected. Bot activity detected.');
      return;
    }

    // 2. Anti-Bot Timing Protection: Catches sub-second automated scripts
    if (!isHumanTiming(mountTimeRef.current, 1.2)) {
      setErrorMsg('Submission rejected: Form was completed unnaturally fast. Please review your details.');
      return;
    }

    // 3. Anti-DoS / Form Flooding Rate Limiter
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitCooldown(rateCheck.retryAfterSeconds);
      setErrorMsg(`Anti-abuse protection active: Too many inquiries submitted in a short time. Please wait ${rateCheck.retryAfterSeconds}s before submitting again.`);
      return;
    }

    // 4. Input Sanitization to Prevent XSS and Email Header / CRLF Injection
    const cleanFullName = sanitizeHeaderField(formData.fullName, 80);
    const cleanCompany = sanitizeHeaderField(formData.companyName || '', 100);
    const cleanPhone = sanitizeHeaderField(formData.phoneNumber, 25);
    const cleanEmail = sanitizeHeaderField(formData.emailAddress, 100);
    const cleanMessage = sanitizeText(formData.message || '', 2000);
    const cleanCapacity = sanitizeHeaderField(formData.plantCapacity || '', 80);
    const cleanCity = sanitizeHeaderField(formData.locationCity || '', 80);
    const cleanUrgency = sanitizeHeaderField(formData.urgencyLevel || '', 80);

    if (!cleanFullName) {
      setErrorMsg('Please enter your full name (letters and spaces only).');
      return;
    }
    if (!cleanPhone || !isValidPhone(cleanPhone)) {
      setErrorMsg('Please provide a valid contact phone or WhatsApp number (minimum 8 digits, e.g. +91 99983 78352).');
      return;
    }
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid, secure corporate email address (e.g. name@company.com).');
      return;
    }

    setLoading(true);

    const safeFormData: InquiryFormData = {
      fullName: cleanFullName,
      companyName: cleanCompany,
      phoneNumber: cleanPhone,
      emailAddress: cleanEmail,
      serviceRequired: formData.serviceRequired,
      message: cleanMessage,
      plantCapacity: cleanCapacity,
      locationCity: cleanCity,
      urgencyLevel: cleanUrgency
    };

    // Record rate limit attempt
    recordRateLimitAttempt();

    // Asynchronously submit to backend server API /api/inquiries
    submitInquiryToBackend(safeFormData)
      .then((res) => {
        if (res.success && res.data?.inquiryId) {
          setInquiryId(res.data.inquiryId);
        }
      })
      .catch((err) => {
        console.warn('Backend logging offline or unreachable:', err);
      });

    // Trigger direct mailto to open user's configured email client addressed directly to manyaenterprise2011@gamil.com
    const freshMail = buildInquiryEmailContent(safeFormData, {
      plantCapacity: cleanCapacity,
      locationCity: cleanCity,
      urgencyLevel: cleanUrgency
    });

    try {
      // Trigger default mail handler
      window.location.href = freshMail.mailtoUrl;
    } catch {
      // Handled gracefully in UI modal
    }

    // Update local state with sanitized inputs
    setFormData(safeFormData);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(mailContent.bodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setBotTrap('');
    mountTimeRef.current = Date.now();
    setFormData({
      fullName: '',
      companyName: '',
      phoneNumber: '',
      emailAddress: '',
      serviceRequired: initialService,
      message: '',
      plantCapacity: '',
      locationCity: '',
      urgencyLevel: 'Normal (Within 24-48 Hours)'
    });
  };

  if (submitted) {
    return (
      <div 
        className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300"
        id={`${formIdPrefix}-success-box`}
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <Inbox className="w-3.5 h-3.5" /> Direct Mailbox Routing Activated
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Manrope'] mb-2">
          Inquiry Prepared for Manya Enterprise
        </h3>

        <p className="text-emerald-950 font-semibold text-sm sm:text-base mb-2 max-w-md mx-auto">
          Your inquiry is directed to:
        </p>
        <div className="inline-block bg-white border border-emerald-300 text-teal-900 font-mono text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-lg mb-4 shadow-xs">
          {COMPANY_DETAILS.email}
        </div>

        {inquiryId && (
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 bg-slate-900 text-teal-300 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-800 shadow-xs">
              <span className="text-slate-400 font-sans">Reference Ticket:</span>
              <strong className="tracking-wide text-teal-200">{inquiryId}</strong>
            </span>
          </div>
        )}

        <p className="text-slate-600 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
          Your mail application was prompted. If your email composer did not launch automatically, click any of the instant dispatch options below:
        </p>

        {/* Dispatch Action Hub */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-emerald-200 shadow-xs max-w-lg mx-auto text-left space-y-3 mb-6">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between pb-2 border-b border-slate-100">
            <span>Direct Mail Options</span>
            <span className="text-[11px] text-teal-600 font-normal">Pre-filled with all details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Direct Gmail Web */}
            <a
              href={mailContent.gmailWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold text-slate-800 hover:text-teal-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>Open in Gmail</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
            </a>

            {/* Direct Outlook Web */}
            <a
              href={mailContent.outlookWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold text-slate-800 hover:text-teal-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Open in Outlook</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
            </a>

            {/* Default Mail App (Mailto) */}
            <a
              href={mailContent.mailtoUrl}
              className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-xs font-bold text-slate-800 hover:text-teal-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>System Mail App</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
            </a>

            {/* Direct WhatsApp to Nipul Mistry */}
            <a
              href={mailContent.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Send via WhatsApp</span>
              </div>
              <ExternalLink className="w-3 h-3 text-emerald-500 group-hover:text-emerald-700" />
            </a>
          </div>

          {/* Copy Plaintext button */}
          <div className="pt-2">
            <button
              onClick={handleCopySummary}
              type="button"
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Inquiry details copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Complete Inquiry Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg p-4 border border-emerald-100 max-w-lg mx-auto text-left text-xs text-slate-700 space-y-2 mb-6">
          <div className="font-semibold text-slate-900 border-b pb-1 text-xs uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Inquiry Details</span>
            <span className="text-emerald-700 font-bold">ME-ETP-INQ</span>
          </div>
          <div><strong>Contact Person:</strong> {formData.fullName} {formData.companyName ? `(${formData.companyName})` : ''}</div>
          <div><strong>Requirement:</strong> {formData.serviceRequired}</div>
          <div><strong>Phone / Mobile:</strong> {formData.phoneNumber}</div>
          <div><strong>Client Email:</strong> {formData.emailAddress}</div>
          {formData.locationCity && <div><strong>Location:</strong> {formData.locationCity}</div>}
          {formData.plantCapacity && <div><strong>Capacity:</strong> {formData.plantCapacity}</div>}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={resetForm}
            className="text-xs font-semibold px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md transition-colors"
          >
            Submit Another Inquiry
          </button>
          <a
            href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
            className="text-xs font-semibold px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition-colors inline-flex items-center gap-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" /> Call Nipul Mistry: {COMPANY_DETAILS.phones[0].display}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id={`${formIdPrefix}-form`}>
      {/* Security Bot-Trap Honeypot Field (Invisible to human users, fills up by crawler bots) */}
      <div 
        aria-hidden="true" 
        style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }}
      >
        <label htmlFor={`${formIdPrefix}-security_bot_trap`}>Leave this security field empty</label>
        <input
          type="text"
          id={`${formIdPrefix}-security_bot_trap`}
          name="security_bot_trap"
          tabIndex={-1}
          autoComplete="off"
          value={botTrap}
          onChange={(e) => setBotTrap(e.target.value)}
        />
      </div>

      {/* Target Mailbox Indicator */}
      <div className="p-3 bg-teal-50/80 border border-teal-200/80 rounded-xl flex items-center justify-between text-xs text-teal-900">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Direct Email Dispatch</div>
            <div className="text-teal-700 font-mono text-[11px]">
              Sends to: <span className="font-bold">{COMPANY_DETAILS.email}</span>
            </div>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-teal-800 px-2 py-0.5 rounded border border-teal-200">
          <Sparkles className="w-3 h-3 text-teal-600" /> B2B Direct
        </span>
      </div>

      {/* Security Protection Bar */}
      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span><strong>Security Guard:</strong> Anti-Spam Bot Filter & XSS Shielded</span>
        </div>
        <span className="inline-flex items-center gap-1 font-semibold text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
          <ShieldCheck className="w-3 h-3 text-teal-600" /> Protected
        </span>
      </div>

      {rateLimitCooldown > 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center space-x-2 text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Anti-flooding cooldown active. Please wait <strong>{rateLimitCooldown}s</strong> before submitting again.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label 
            htmlFor={`${formIdPrefix}-fullName`}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={`${formIdPrefix}-fullName`}
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Patel"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Company Name */}
        <div>
          <label 
            htmlFor={`${formIdPrefix}-companyName`}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Company / Unit Name
          </label>
          <input
            type="text"
            id={`${formIdPrefix}-companyName`}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Industrial Enterprises Ltd."
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div>
          <label 
            htmlFor={`${formIdPrefix}-phoneNumber`}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id={`${formIdPrefix}-phoneNumber`}
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>

        {/* Email Address */}
        <div>
          <label 
            htmlFor={`${formIdPrefix}-emailAddress`}
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Your Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id={`${formIdPrefix}-emailAddress`}
            name="emailAddress"
            required
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="contact@company.com"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      {/* Service Required */}
      <div>
        <label 
          htmlFor={`${formIdPrefix}-serviceRequired`}
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Service Required <span className="text-red-500">*</span>
        </label>
        <select
          id={`${formIdPrefix}-serviceRequired`}
          name="serviceRequired"
          value={formData.serviceRequired}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
        >
          {servicesList.map((srv) => (
            <option key={srv} value={srv}>
              {srv}
            </option>
          ))}
        </select>
      </div>

      {/* Optional Project Specifications Accordion / Toggle */}
      <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100/60 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span>Plant Specifications (Optional)</span>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-normal">
              Capacity, City, Timeline
            </span>
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>

        {showAdvanced && (
          <div className="p-3.5 pt-1 space-y-3 bg-white border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label 
                  htmlFor={`${formIdPrefix}-plantCapacity`}
                  className="block text-[11px] font-semibold text-slate-600 mb-1"
                >
                  Estimated Plant Flow / Capacity
                </label>
                <input
                  type="text"
                  id={`${formIdPrefix}-plantCapacity`}
                  name="plantCapacity"
                  value={formData.plantCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 50 KLD, 100 m³/day, 500 kg chemical"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label 
                  htmlFor={`${formIdPrefix}-locationCity`}
                  className="block text-[11px] font-semibold text-slate-600 mb-1"
                >
                  Facility Location / GIDC Estate
                </label>
                <input
                  type="text"
                  id={`${formIdPrefix}-locationCity`}
                  name="locationCity"
                  value={formData.locationCity}
                  onChange={handleChange}
                  placeholder="e.g. Nandesari GIDC / Padra / Panoli"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor={`${formIdPrefix}-urgencyLevel`}
                className="block text-[11px] font-semibold text-slate-600 mb-1"
              >
                Requirement Timeline
              </label>
              <select
                id={`${formIdPrefix}-urgencyLevel`}
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {urgencyOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <label 
          htmlFor={`${formIdPrefix}-message`}
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Requirement Details / Message
        </label>
        <textarea
          id={`${formIdPrefix}-message`}
          name="message"
          rows={compact ? 3 : 4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your effluent treatment requirement, chemical specifications, or equipment needs..."
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading || rateLimitCooldown > 0}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          id={`${formIdPrefix}-submit-btn`}
        >
          {rateLimitCooldown > 0 ? (
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Anti-Flooding Active ({rateLimitCooldown}s)</span>
            </span>
          ) : loading ? (
            <span>Directing to Manya Enterprise Mailbox...</span>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>Send Inquiry to Manya Enterprise</span>
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-1 text-center sm:text-left">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Direct dispatch to: <strong>{COMPANY_DETAILS.email}</strong>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" /> Reviewed by Nipul Mistry
        </span>
      </div>
    </form>
  );
};
