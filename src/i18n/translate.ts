import en from './locales/en.json';
import hi from './locales/hi.json';

export type Language = 'en' | 'hi';
export type CopyKey = keyof typeof en;

const tables: Record<Language, Record<string, string>> = { en, hi };

export function translate(language: Language, key: CopyKey): string {
  return tables[language][key] || en[key];
}
