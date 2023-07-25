/**
 * @name validateString
 * @description Checks the `typeof` the `string` provided and if it is a non-empty string.
 * @param {*} string  - The string to check.
 * @returns {boolean} - True if the string is a non-empty string, false otherwise.
 */
export const validateString = (string) => {
  if (typeof string !== 'string') {
    return false;
  }

  if (string.length === 0) {
    return false;
  }

  return true;
}

/**
 * @name alwaysString
 * @description Checks the validity of the `string` provided and returns the `string` if it's a non-empty string, an empty string otherwise.
 * @param {*} string  - The string to check.
  * @returns {string} - The string if it is a non-empty string, an empty string otherwise.
 */
export const alwaysString = (string) => {
  if (!validateString(string)) {
    return '';
  }

  return string.trim();
}