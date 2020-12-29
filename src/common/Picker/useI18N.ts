import { useTranslation } from 'react-i18next';
import { DATE_PICKER } from '@config/namespaces';

type Translations = {
  cancelLabel: string;
  okLabel: string;
};

const useI18N = (): Translations => {
  const { t } = useTranslation(DATE_PICKER);

  return {
    cancelLabel: t('cancelLabel'),
    okLabel: t('okLabel'),
  };
};

export default useI18N;
