import {
  DashboardIcon,
  DomainsIcon,
  UsersIcon,
  TenantsIcon,
  HostingIcon,
  DeploymentIcon,
  RedditIcon,
  SubRedditIcon
} from '../Icons';

export const navigation = [
  {
    name: 'Administration',
    type: 'section',
    description: 'Internal administration pages for the console application',
  },
  {
    name: 'Console',
    href: '/',
    icon: DashboardIcon,
    type: 'link',
    description: 'Console home page and dashboard for the console application'
  },
  {
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
    type: 'link',
    description: 'User management services and pages for the console application',
  },
  {
    name: 'External Services',
    type: 'section',
    description: 'External api services used within the console application for tenant management and deployment management',
  },
  {
    name: 'Hosting',
    icon: HostingIcon,
    href: '/hosting',
    type: 'link',
    description: 'Git history. Vercel hosting services and deployments. Also includes domain management, tenant management and deployment management.',
    children: [
      {
        name: 'Tenants',
        href: '/hosting/tenants',
        icon: TenantsIcon,
        description: 'Tenant management services and pages for the console application',
      },
      {
        name: 'Domains',
        href: '/hosting/domains',
        icon: DomainsIcon,
        description: 'Domain management services and pages for the console application',
      },
      {
        name: 'Deployments',
        href: '/hosting/deployments',
        icon: DeploymentIcon,
        description: 'Deployment management services and pages for the console application',
      },
    ],
  },
  {
    name: 'Reddit Bot',
    icon: RedditIcon,
    href: '/reddit-bot',
    type: 'link',
    description: 'Reddit bot services and management.',
    children: [
      { name: 'Subs', href: '/reddit-bot/subs', icon: SubRedditIcon },
    ],
  }
]
