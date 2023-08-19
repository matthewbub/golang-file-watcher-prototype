// E.164 is the international telephone numbering plan that ensures each device on the PSTN (Public Switched Telephone Network) has a globally unique number. 
// E.164 numbers are formatted as:
// [+] [country code] [subscriber number including area code]
const phoneNumberValidation = (value: string): string | boolean => {
    const pattern = /^\+[1-9]\d{1,14}$/;
    if (!pattern.test(value)) return "Invalid E.164 phone number format";
    return true;
}