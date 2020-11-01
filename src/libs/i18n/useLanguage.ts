import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE } from '@config/app';

export default function useLanguage() {
  const { i18n } = useTranslation();
  return i18n.language || DEFAULT_LANGUAGE;
}
