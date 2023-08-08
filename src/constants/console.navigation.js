export const consoleNavigation = [
  {
    name: 'Administration',
    type: 'section',
    description: 'Internal administration pages for the console application',
  },
  {
    name: 'Roles & Permissions',
    href: '/users',
    type: 'link',
    description: 'User management services and pages for the console application',
  },
  {
    name: 'Localization (i18n)',
    href: '/messages',
    type: 'link',
    description: 'Internal messages management services and pages for the console application',
  },
  {
    name: 'Logs',
    href: '/logs',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Security',
    href: '/security',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Screen Manager',
    href: '/screen-manager',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'My Clients',
    href: '/my-clients',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'My Team',
    href: '/my-clients',
    type: 'link',
    description: 'Coming soon...',
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
      },
    ],
  },
  {
    name: 'Internal Apps',
    type: 'section',
    description: 'External api services used within the console application for tenant management and deployment management',
  },
  {
    name: 'Documents',
    href: '/documents',
    type: 'link',
    description: 'Internal documents management services and pages for the console application',
  },
  {
    name: 'Media Manager',
    href: '/media',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Messages',
    href: '/direct-messages',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Time Logger',
    href: '/experimental/time-logger',
    type: 'link',
    description: 'Securely track your time spent on projects.',
  },
  {
    name: 'Invoices',
    href: '/invoices',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Help Desk',
    href: '/help-desk',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Forms',
    href: '/forms',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'Analytics',
    href: '/forms',
    type: 'link',
    description: 'Coming soon...',
  },
  {
    name: 'External Services',
    type: 'section',
    description: 'External api services used within the console application for tenant management and deployment management',
  },
  {
    name: 'Hosting',
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
    ],
  },
  {
    name: 'Recent Deployments',
    type: 'link',
    href: '/hosting/deployments',
    description: 'Deployment management services and pages for the console application',
  },
  {
    name: '3rd Party Services',
    type: 'link',
    href: '/3rd-party-services',
    description: 'Coming soon...',
  },


]
