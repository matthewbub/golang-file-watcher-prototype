import { DashboardIcon, DomainsIcon, UsersIcon, TenantsIcon, HostingIcon, DeploymentIcon } from '../Icons';

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
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
  }
]
