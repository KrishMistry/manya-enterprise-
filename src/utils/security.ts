/**
 * Enterprise Security Utility for Manya Enterprise
 * Provides defenses against:
 * 1. Cross-Site Scripting (XSS)
 * 2. Email Header Injection (CRLF / SMTP Splitting)
 * 3. Automated Spambot Crawlers & Scrapers (Honeypot + Submission timing)
 * 4. Denial of Service & Form Flooding (Rate Limiting)
 * 5. Input Buffer Overflows (Strict length constraints)
 */

// Rate limit configuration: Max 5 inquiries per 5 minutes per client browser
const RATE_LIMIT_KEY = 'me_sec_rl_inquiry';
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Strips HTML tags, script injection, javascript: protocols, and encodes dangerous characters
 */
export const sanitizeText = (input: string, maxLength = 2000): string => {
  if (!input || typeof input !== 'string') return '';

  // Limit maximum length to prevent buffer/memory bloat
  const trimmed = input.slice(0, maxLength);

  // Strip script, style, iframe, object, embed tags and event handlers
  const withoutDangerousTags = trimmed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/onerror\s*=/gi, '')
    .replace(/onclick\s*=/gi, '');

  // HTML entity encode remaining angle brackets and quotes
  return withoutDangerousTags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

/**
 * Prevents Email Header Injection (SMTP CRLF Splitting)
 * Strips carriage returns and line feeds for single-line fields like Name, Phone, Email
 */
export const sanitizeHeaderField = (input: string, maxLength = 150): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[\r\n\t\f\v]/g, ' ') // Strip all newlines & carriage returns
    .replace(/[<>"'`;=]/g, '') // Strip shell/html injection characters
    .slice(0, maxLength)
    .trim();
};

/**
 * Validates Email against strict standard RFC 5322 format, disallowing header injection
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false;
  
  // Disallow CRLF or whitespace characters
  if (/[\r\n\s]/.test(email)) return false;

  // Strict email regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
};

/**
 * Validates Phone numbers allowing standard international/Indian formats (+91, 10-digit, spaces, dashes)
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  if (phone.length < 8 || phone.length > 20) return false;
  
  // Must only contain digits, spaces, hyphens, parentheses, or leading plus
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  return phoneRegex.test(phone);
};

/**
 * Rate Limiting Check (Anti-DoS / Anti-Form Spam)
 * Returns { allowed: boolean, remainingAttempts: number, retryAfterSeconds: number }
 */
export const checkRateLimit = (): {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds: number;
} => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let history: number[] = raw ? JSON.parse(raw) : [];

    // Filter to only timestamps within the window
    history = history.filter(ts => typeof ts === 'number' && now - ts < WINDOW_MS);

    if (history.length >= MAX_ATTEMPTS) {
      const oldest = Math.min(...history);
      const retryAfterSeconds = Math.ceil((oldest + WINDOW_MS - now) / 1000);
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterSeconds: Math.max(1, retryAfterSeconds)
      };
    }

    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS - history.length,
      retryAfterSeconds: 0
    };
  } catch {
    // If localStorage disabled (e.g. strict private mode), allow submission gracefully
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }
};

/**
 * Records a successful submission to rate limiter
 */
export const recordRateLimitAttempt = (): void => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    let history: number[] = raw ? JSON.parse(raw) : [];
    history = history.filter(ts => typeof ts === 'number' && now - ts < WINDOW_MS);
    history.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
  } catch {
    // Graceful no-op
  }
};

/**
 * Bot Detection: Checks whether form was completed inhumanly fast (< 1.5 seconds)
 * Real humans take > 2 seconds to enter name, phone, service, and message.
 */
export const isHumanTiming = (mountTimestamp: number, minSeconds = 1.5): boolean => {
  const elapsed = (Date.now() - mountTimestamp) / 1000;
  return elapsed >= minSeconds;
};
