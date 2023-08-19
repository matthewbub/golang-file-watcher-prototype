# Sign up Form

This documentation provides a detailed overview of the input validations implemented in our sign-up form, specifically for the password input. The goal of these validations is to ensure that users provide strong and secure passwords.

## Password Input Validations
The password input undergoes a series of validations to ensure it meets specific criteria. These validations are implemented using a custom validation function named `passwordValidation`.

1. Password Length
    - Rule: The password must be at least 8 characters long.
    - Implementation: We check the length of the password string.
    - Error Message: "Password must be 8 characters"
2. Uppercase Letter
    - Rule: The password must contain at least one uppercase letter.
    - Implementation: We use the regular expression /[A-Z]/ to check for the presence of an uppercase letter.
    - Error Message: "Password must have 1 upper case"
3. Lowercase Letter
    - Rule: The password must contain at least one lowercase letter.
    - Implementation: We use the regular expression /[a-z]/ to check for the presence of a lowercase letter.
    - Error Message: "Password must have 1 lower case"
4. Numeric Character
    - Rule: The password must contain at least one number.
    - Implementation: We use the regular expression /[0-9]/ to check for the presence of a numeric character.
    - Error Message: "Password must have 1 number"
5. Special Character
    - Rule: The password must contain at least one special character.
    - Implementation: We use the regular expression /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/ to check for the presence of a special character.
    - Error Message: "Password must have 1 special character"

## Implementation Details

The `passwordValidation` function is used in conjunction with the `react-hook-form` library. Specifically, it's used as a custom validation function in the `register` method:

```js
{...register("password", { 
  required: "This field is required",
  validate: passwordValidation
})}
```

When the form is submitted, `react-hook-form` will execute the `passwordValidation` function. If any of the rules are not met, the corresponding error message will be returned and displayed to the user.

## Maintenance Tips

1. Adding New Rules: To add a new validation rule, simply extend the `passwordValidation` function with the new rule and its corresponding error message.
2. Modifying Existing Rules: To modify an existing rule, locate the rule within the `passwordValidation` function and adjust its logic or error message as needed.
3. Removing Rules: To remove a rule, delete the corresponding section from the `passwordValidation` function.