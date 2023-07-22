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
  { name: 'Console', href: '/', icon: DashboardIcon },
  {
    name: 'Hosting',
    icon: HostingIcon,
    href: '/hosting',
    children: [
      { name: 'Tenants', href: '/hosting/tenants', icon: TenantsIcon },
      { name: 'Domains', href: '/hosting/domains', icon: DomainsIcon },
      { name: 'Deployments', href: '/hosting/deployments', icon: DeploymentIcon },
    ],
  },
  {
    name: 'Reddit Bot',
    icon: RedditIcon,
    href: '/reddit-bot',
    children: [
      { name: 'Subs', href: '/reddit-bot/subs', icon: SubRedditIcon },
    ],
  },
  {
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
  }
]
