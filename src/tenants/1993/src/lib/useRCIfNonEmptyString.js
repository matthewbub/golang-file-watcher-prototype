import { useTranslation } from 'react-i18next';

export function useRCIfNonEmptyString() {
  const { t } = useTranslation();

  function renderComponentIfNonEmptyString(stringKey, component) {
    const value = t(stringKey).trim();
    if (value.length > 0) {
      return component(value);
    }
    return null;
  }

  return renderComponentIfNonEmptyString;
}
