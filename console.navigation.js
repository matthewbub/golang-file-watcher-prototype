export const consoleNavigation = [
  {
    name: 'Administration',
    type: 'section',
    description: 'Internal administration pages for the console application',
  },
  {
    name: 'Control Tower',
    href: '/users',
    type: 'link',
    description: 'User management services and pages for the console application',
  },
  {
    name: 'Global Documents',
    href: '/documents',
    type: 'link',
    description: 'Internal documents management services and pages for the console application',
  },
  {
    name: 'Localization (i18n)',
    href: '/messages',
    type: 'link',
    description: 'Internal messages management services and pages for the console application',
  },
  {
    name: 'Experimental Features',
    href: '/experimental',
    type: 'link',
    description: 'Experimental features and services.',
    children: [
      {
        name: 'Endless Checkboxes',
        href: '/experimental/endless-checkboxes',
        description: 'Tenant management services and pages for the console application',
      },
      {
        name: 'Checkbox Unique Conditions',
        href: '/experimental/endless-checkboxes-unique-conditions',
      }
    ],
  },
  {
    name: 'External Services',
    type: 'section',
    description: 'External api services used within the console application for tenant management and deployment management',
  },
  {
    name: 'Hosting & Git',
    href: '/hosting',
    type: 'link',
    description: 'Git history. Vercel hosting services and deployments. Also includes domain management, tenant management and deployment management.',
    children: [
      {
        name: 'Tenants',
        href: '/hosting/tenants',
        description: 'Tenant management services and pages for the console application',
      },
      {
        name: 'Configured Domains',
        href: '/hosting/domains',
        description: 'Domain management services and pages for the console application',
      },
      {
        name: 'Recent Deployments',
        href: '/hosting/deployments',
        description: 'Deployment management services and pages for the console application',
      },
    ],
  }
]
