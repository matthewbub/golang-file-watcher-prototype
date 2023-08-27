# Validations

Validations are small module based functions that return either `true` or a `string` value, depending on the scenario. we presume `true` is the happy case, whereas a `string` value indicates the parameter passed has failed the validation checks. The error message should explicitly state where. 

Here's an example:

```js
const passwordValidation = (value) => {
  if (value.length < 8) return "Password must be 8 characters";
  // ... more validations
  return true;
}

const newPass = 'abc123';
const validationCheck = passwordValidation(newPass);

// We can use `typeof` to determine if the return value is a string
if (typeof validationCheck === 'string') {
    return validationCheck; // "Password must be 8 characters"
}
```

