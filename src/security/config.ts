/**
 * Public app settings only.
 * Tokens, payment keys, and map keys do not belong in source.
 * Design auth accepts a well-formed OTP so the screens can be reviewed
 * before the real API is connected. Replace authMode with 'api' before release.
 */
export const appConfig = {
  authMode: 'design' as 'design' | 'api',
  version: '2.1',
  shipping: 40,
  freeShippingOver: 499,
  codCharge: 20,
  supportPhone: '916375581602',
  termsUrl: 'https://www.oswalsoap.com/terms_conditions',
  privacyUrl: 'https://www.oswalsoap.com/Privacy-Policy',
  whatsAppUrl: 'https://wa.me/916375581602',
} as const;
