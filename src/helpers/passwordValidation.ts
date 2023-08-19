export const passwordValidation = (value: string): boolean | string => {
  if (value.length < 8) return "Password must be 8 characters";
  if (!/[A-Z]/.test(value)) return "Password must have 1 upper case";
  if (!/[a-z]/.test(value)) return "Password must have 1 lower case";
  if (!/[0-9]/.test(value)) return "Password must have 1 number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) return "Password must have 1 special character";
  return true;
}