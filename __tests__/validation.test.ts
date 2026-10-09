import {
  digitsOnly,
  normalizeCoupon,
  validateEmail,
  validateGst,
  validateName,
  validateOtp,
  validatePhone,
  validatePincode,
} from '../src/security/validation';
import { isAllowedExternalUrl } from '../src/security/links';

describe('validation', () => {
  test('accepts an Indian mobile number and rejects short input', () => {
    expect(validatePhone('9876543210')).toBeNull();
    expect(validatePhone('5876543210')).toBe('phone_10_digits');
    expect(validatePhone('')).toBe('phone_required');
    expect(digitsOnly('98-765 43210abc', 10)).toBe('9876543210');
  });

  test('checks email, name, otp, pincode, and GST', () => {
    expect(validateEmail('a@oswal.test')).toBeNull();
    expect(validateEmail('not-an-email')).toBe('invalid_email');
    expect(validateName('Asha')).toBeNull();
    expect(validateName('A')).toBe('name_required');
    expect(validateOtp('123456')).toBeNull();
    expect(validateOtp('12345')).toBe('invalid_otp');
    expect(validatePincode('302016')).toBeNull();
    expect(validatePincode('3020')).toBe('pincode_must_be_6_digits');
    expect(validateGst('')).toBe(true);
    expect(validateGst('22AAAAA0000A1Z5')).toBe(true);
    expect(validateGst('bad')).toBe(false);
    expect(normalizeCoupon(' soap-20 ')).toBe('SOAP20');
  });

  test('allows only the public support and policy links', () => {
    expect(isAllowedExternalUrl('https://www.oswalsoap.com/terms_conditions')).toBe(true);
    expect(isAllowedExternalUrl('https://www.oswalsoap.com/Privacy-Policy')).toBe(true);
    expect(isAllowedExternalUrl('https://wa.me/916375581602')).toBe(true);
    expect(isAllowedExternalUrl('tel:916375581602')).toBe(true);
    expect(isAllowedExternalUrl('https://evil.example/phish')).toBe(false);
    expect(isAllowedExternalUrl('javascript:alert(1)')).toBe(false);
  });
});
