/**
 * Validates a given phone number to check if it's in the E.164 format.
 * E.164 is the international telephone numbering plan that ensures each device on the PSTN (Public Switched Telephone Network) has a globally unique number.
 * E.164 numbers are formatted as: [+] [country code] [subscriber number including area code]
 *
 * @param {string} value - The phone number to validate.
 * @returns {string|boolean} - Returns true if the phone number is valid, otherwise returns an error message.
 */
const phoneNumberValidation = (value) => {
    const pattern = /^\+[1-9]\d{1,14}$/;
    if (!pattern.test(value)) return "Invalid E.164 phone number format";
    return true;
}

module.exports = phoneNumberValidation;