import { InquiryFormData } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { sanitizeHeaderField, sanitizeText } from './security';

export interface EmailDispatchPayload {
  toEmail: string;
  subject: string;
  body: string;
  mailtoUrl: string;
  gmailWebUrl: string;
  outlookWebUrl: string;
  whatsappUrl: string;
}

export const buildInquiryEmailContent = (
  data: InquiryFormData, 
  extra?: {
    plantCapacity?: string;
    locationCity?: string;
    urgencyLevel?: string;
  }
) => {
  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  // Securely sanitize all header fields to eliminate CRLF injection
  const safeFullName = sanitizeHeaderField(data.fullName || '', 80);
  const safeCompanyName = sanitizeHeaderField(data.companyName || '', 100);
  const safePhone = sanitizeHeaderField(data.phoneNumber || '', 25);
  const safeEmail = sanitizeHeaderField(data.emailAddress || '', 100);
  const safeService = sanitizeHeaderField(data.serviceRequired || '', 80);
  const safeCapacity = extra?.plantCapacity ? sanitizeHeaderField(extra.plantCapacity, 80) : null;
  const safeCity = extra?.locationCity ? sanitizeHeaderField(extra.locationCity, 80) : null;
  const safeUrgency = extra?.urgencyLevel ? sanitizeHeaderField(extra.urgencyLevel, 80) : null;
  const safeMessage = sanitizeText(data.message || '', 2000);

  const subject = `[B2B Inquiry] ${safeService} - ${safeCompanyName || safeFullName || 'Client'}`;

  const bodyText = [
    `Dear Manya Enterprise Team / Nipul Mistry,`,
    ``,
    `A new business inquiry has been submitted via your official website portal.`,
    ``,
    `--------------------------------------------------`,
    `CLIENT & CONTACT DETAILS:`,
    `--------------------------------------------------`,
    `Full Name       : ${safeFullName || 'N/A'}`,
    `Company Name    : ${safeCompanyName || 'Not specified (Proprietorship / Individual)'}`,
    `Phone / Mobile  : ${safePhone || 'N/A'}`,
    `Email Address   : ${safeEmail || 'N/A'}`,
    safeCity ? `Location / City : ${safeCity}` : null,
    ``,
    `--------------------------------------------------`,
    `SERVICE REQUIREMENT:`,
    `--------------------------------------------------`,
    `Service Category: ${safeService}`,
    safeCapacity ? `Estimated Plant Capacity: ${safeCapacity}` : null,
    safeUrgency ? `Requirement Timeline  : ${safeUrgency}` : null,
    ``,
    `--------------------------------------------------`,
    `PROJECT DETAILS / MESSAGE:`,
    `--------------------------------------------------`,
    safeMessage || 'No additional message provided.',
    ``,
    `--------------------------------------------------`,
    `SUBMISSION METADATA:`,
    `--------------------------------------------------`,
    `Recipient       : ${COMPANY_DETAILS.email} (Manya Enterprise)`,
    `Submission Time : ${timestamp} IST`,
    `Security Status : Verified & Sanitized against script / header injection`,
    `Portal Ref      : ME-ETP-WEB-INQ`,
    ``,
    `Please respond to the client at ${safeEmail} or call ${safePhone}.`
  ].filter(Boolean).join('\n');

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(bodyText);

  // Direct mailto link targeted to manyaenterprise2011@gamil.com with prefilled subject & body
  const mailtoUrl = `mailto:${COMPANY_DETAILS.email}?subject=${encodedSubject}&body=${encodedBody}`;

  // One-click webmail deep-links in case desktop mail client isn't configured
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(COMPANY_DETAILS.email)}&su=${encodedSubject}&body=${encodedBody}`;
  const outlookWebUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(COMPANY_DETAILS.email)}&subject=${encodedSubject}&body=${encodedBody}`;

  // Direct WhatsApp message to Manya Enterprise primary phone (+91 9998378352)
  const whatsappText = encodeURIComponent(
    `*NEW INQUIRY FOR MANYA ENTERPRISE*\n\n` +
    `*Client:* ${data.fullName} ${data.companyName ? `(${data.companyName})` : ''}\n` +
    `*Service:* ${data.serviceRequired}\n` +
    `*Phone:* ${data.phoneNumber}\n` +
    `*Email:* ${data.emailAddress}\n` +
    (data.message ? `*Message:* ${data.message}\n` : '') +
    `\nSent via Manya Enterprise B2B Portal`
  );
  const whatsappUrl = `https://wa.me/919998378352?text=${whatsappText}`;

  return {
    subject,
    bodyText,
    mailtoUrl,
    gmailWebUrl,
    outlookWebUrl,
    whatsappUrl
  };
};
