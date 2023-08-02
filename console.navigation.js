export const consoleNavigation = [
  {
    name: 'Administration',
    type: 'section',
    description: 'Internal administration pages for the console application',
  },
  {
    name: 'Users',
    href: '/users',
    type: 'link',
    description: 'User management services and pages for the console application',
  },
  {
    name: 'Documents',
    href: '/documents',
    type: 'link',
    description: 'Internal documents management services and pages for the console application',
  },
  {
    name: 'Messages',
    href: '/messages',
    type: 'link',
    description: 'Internal messages management services and pages for the console application',
  },
  {
    name: 'Experimental',
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
        name: 'Endless Checkboxes - Unique Conditions',
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
        name: 'Domains',
        href: '/hosting/domains',
        description: 'Domain management services and pages for the console application',
      },
      {
        name: 'Deployments',
        href: '/hosting/deployments',
        description: 'Deployment management services and pages for the console application',
      },
    ],
  },
  {
    name: 'Website Builder',
    href: '/website-builder',
    type: 'link',
    description: 'Our proprietary Website builder .'
  }
]
