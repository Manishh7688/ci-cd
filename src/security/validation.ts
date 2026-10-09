export type FieldError =
  | 'phone_required'
  | 'phone_10_digits'
  | 'email_required'
  | 'invalid_email'
  | 'name_required'
  | 'otp_field_required'
  | 'invalid_otp'
  | 'all_fields_are_required'
  | 'pincode_must_be_6_digits'
  | 'state_and_city_is_required'
  | 'shop_name_is_required'
  | 'address_is_required'
  | 'store_code_must_be_6_digits';

const INDIAN_MOBILE = /^[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PERSON_NAME = /^[\p{L}][\p{L}\s.'-]{0,39}$/u;

export function digitsOnly(value: string, maxLength: number): string {
  return value.replace(/\D/g, '').slice(0, maxLength);
}

export function plainText(value: string, maxLength: number): string {
  return value.replace(/[<>]/g, '').slice(0, maxLength);
}

export function normalizeCoupon(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 16);
}

export function validatePhone(value: string): FieldError | null {
  const digits = digitsOnly(value, 10);
  if (!digits) {
    return 'phone_required';
  }
  if (!INDIAN_MOBILE.test(digits)) {
    return 'phone_10_digits';
  }
  return null;
}

export function validateEmail(value: string): FieldError | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'email_required';
  }
  if (trimmed.length > 120 || !EMAIL.test(trimmed)) {
    return 'invalid_email';
  }
  return null;
}

export function validateName(value: string): FieldError | null {
  const trimmed = value.trim();
  if (trimmed.length < 2 || !PERSON_NAME.test(trimmed)) {
    return 'name_required';
  }
  return null;
}

export function validateOtp(value: string): FieldError | null {
  if (!value) {
    return 'otp_field_required';
  }
  if (!/^\d{6}$/.test(value)) {
    return 'invalid_otp';
  }
  return null;
}

export function validatePincode(value: string): FieldError | null {
  if (!/^\d{6}$/.test(value)) {
    return 'pincode_must_be_6_digits';
  }
  return null;
}

export function validateGst(value: string): boolean {
  if (!value.trim()) {
    return true;
  }
  return /^[0-9A-Z]{15}$/.test(value.trim().toUpperCase());
}
