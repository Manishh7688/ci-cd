import { appConfig } from './config';

const ALLOWED_HTTPS = new Set<string>([
  appConfig.termsUrl,
  appConfig.privacyUrl,
  appConfig.whatsAppUrl,
]);

export function isAllowedExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.username || parsed.password || parsed.hash) {
      return false;
    }
    if (parsed.protocol === 'https:') {
      return ALLOWED_HTTPS.has(`${parsed.origin}${parsed.pathname}`);
    }
    if (parsed.protocol === 'tel:') {
      return parsed.pathname === appConfig.supportPhone;
    }
    return false;
  } catch {
    return false;
  }
}
