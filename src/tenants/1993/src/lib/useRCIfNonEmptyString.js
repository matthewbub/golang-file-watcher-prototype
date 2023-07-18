import { useTranslation } from 'react-i18next';

/**
 * Custom hook that provides a function for conditionally rendering a component
 * based on a translated string value.
 *
 * @returns {function} The renderComponentIfNonEmptyString function.
 */
export function useRCIfNonEmptyString() {
  const { t } = useTranslation();

  /**
   * Renders the provided component if the translated string
   * for the given key is a non-empty string.
   *
   * @param {string} stringKey - The translation key for the string.
   * @param {function} component - The component to render with the non-empty string.
   * @returns {React.ReactNode|null} - The rendered component or null if the string is empty.
   */
  function renderComponentIfNonEmptyString(stringKey, component) {
    const value = t(stringKey).trim();
    if (value.length > 0) {
      return component(value);
    }
    return null;
  }

  return renderComponentIfNonEmptyString;
}
