import { Router, Request, Response } from 'express';
import { inquiryStore } from '../storage/inquiryStore';
import { InquiryFormData } from '../../src/types';
import { sanitizeHeaderField, sanitizeText, isValidEmail, isValidPhone } from '../../src/utils/security';

const router = Router();

// GET all stored inquiries
router.get('/', (_req: Request, res: Response) => {
  const inquiries = inquiryStore.getAll();
  res.json({
    success: true,
    total: inquiries.length,
    data: inquiries
  });
});

// GET inquiry statistics
router.get('/stats', (_req: Request, res: Response) => {
  const stats = inquiryStore.getStats();
  res.json({
    success: true,
    data: stats
  });
});

// POST submit new inquiry
router.post('/', (req: Request, res: Response) => {
  const body = req.body as Partial<InquiryFormData>;

  if (!body) {
    res.status(400).json({
      success: false,
      error: 'Invalid request body. Form data is required.'
    });
    return;
  }

  // Sanitize and validate fields
  const fullName = sanitizeHeaderField(body.fullName || '', 80);
  const companyName = sanitizeHeaderField(body.companyName || '', 100);
  const phoneNumber = sanitizeHeaderField(body.phoneNumber || '', 25);
  const emailAddress = sanitizeHeaderField(body.emailAddress || '', 100);
  const serviceRequired = sanitizeHeaderField(body.serviceRequired || 'ETP Plant Setup', 80);
  const message = sanitizeText(body.message || '', 2000);
  const plantCapacity = body.plantCapacity ? sanitizeHeaderField(body.plantCapacity, 80) : '';
  const locationCity = body.locationCity ? sanitizeHeaderField(body.locationCity, 80) : '';
  const urgencyLevel = body.urgencyLevel ? sanitizeHeaderField(body.urgencyLevel, 80) : 'Normal (Within 24-48 Hours)';

  if (!fullName) {
    res.status(400).json({
      success: false,
      error: 'Contact name is required.'
    });
    return;
  }

  if (!phoneNumber || !isValidPhone(phoneNumber)) {
    res.status(400).json({
      success: false,
      error: 'A valid phone number is required.'
    });
    return;
  }

  if (!emailAddress || !isValidEmail(emailAddress)) {
    res.status(400).json({
      success: false,
      error: 'A valid email address is required.'
    });
    return;
  }

  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  const cleanData: InquiryFormData = {
    fullName,
    companyName,
    phoneNumber,
    emailAddress,
    serviceRequired: serviceRequired as InquiryFormData['serviceRequired'],
    message,
    plantCapacity,
    locationCity,
    urgencyLevel
  };

  const stored = inquiryStore.add(cleanData, { clientIp, userAgent });

  res.status(201).json({
    success: true,
    message: 'Inquiry received and logged successfully. Our team will contact you shortly.',
    data: {
      inquiryId: stored.id,
      createdAt: stored.createdAt,
      status: stored.status,
      serviceRequired: stored.serviceRequired,
      clientName: stored.fullName
    }
  });
});

export default router;
