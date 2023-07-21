export const textColorClassName = 'text-rose-100/70'
export const secondaryTextColorClassName = 'text-rose-100/50'
export const backgroundColorClassName = 'bg-rose-100/10'
export const secondaryBackgroundColorClassName = 'bg-rose-100/5'

export const baseClassNames = {
  text: 'text-gray-200',
  secondaryText: 'text-gray-400',
  background: 'bg-gray-950',
  secondaryBackground: 'bg-gray-900',
  secondaryBackgroundHover: 'hover:bg-gray-950/50 border-2 border-gray-900 hover:border-gray-900',
}

export const commonApiMessages = {
  generalError: 'Something went wrong',
}

export const regexPatterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
}