export const textColorClassName = 'text-rose-100/70'
export const secondaryTextColorClassName = 'text-rose-100/50'
export const backgroundColorClassName = 'bg-rose-100/10'
export const secondaryBackgroundColorClassName = 'bg-rose-100/5'

export const baseClassNames = {
  text: 'txt1',
  secondaryText: 'txt2',
  background: 'bg1',
  secondaryBackground: 'bg2',
  secondaryBackgroundHover: 'hover:bg-neutral-950/50 border border-neutral-900 hover:border-white/20',
  overlayBackground: 'bg-gray-700 bg-opacity-75 transition-opacity',
  containerPadding: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8'
}

export const commonApiMessages = {
  generalError: 'Something went wrong',
  methodNotAllowed: 'Method Not Allowed',
  unauthorized: 'Unauthorized',
}

export const regexPatterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
}

export const apiRoutes = {
  logInFromConsole: '/api/v1/log-in/from-console',
}

export const paths = {
  console: {
    'users': '/users',
    'hosting': '/hosting',
    'hosting/tenants': '/hosting/tenants',
    'hosting/deployments': '/hosting/deployments',
    'hosting/domains': '/hosting/domains',
    'reddit-bot': '/reddit-bot',
    'reddit-bot/subs': '/reddit-bot/subs',
    'settings': '/settings',
    'documents': '/documents',
    'messages': '/messages',
    'experimental': '/experimental',
    'experimental/endless-checkboxes': '/experimental/endless-checkboxes',
    'website-builder': '/website-builder',
    'website-builder/kitchen-sink': '/website-builder/kitchen-sink',
  }
}