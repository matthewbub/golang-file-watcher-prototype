import { DocumentIcon, PhotoIcon, RectangleGroupIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline"
export const consoleNavigation = [
  {
    name: 'Apps',
    type: 'section',
    description: 'Internal application pages for the console application',
  },
  {
    name: 'Documents',
    href: '/documents',
    type: 'link',
    description: 'Internal documents management services and pages for the console application',
    icon: DocumentIcon,
  },
  {
    name: 'Media Manager',
    href: '/media',
    type: 'link',
    description: 'Coming soon...',
    icon: PhotoIcon,
  },
  {
    name: 'Project Manager',
    href: '/experimental/time-logger',
    type: 'link',
    description: 'Securely track your time spent on projects.',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Invoices',
    href: '/invoices',
    type: 'link',
    description: 'Coming soon...',
    icon: BuildingLibraryIcon,
  },
  //   {
  //     name: 'Administrative',
  //     href: '/hosting',
  //     type: 'link',
  //     description: 'Git history. Vercel hosting services and deployments. Also includes domain management, tenant management and deployment management.',
  //     children: [
  //       {
  //         name: 'Tenants',
  //         href: '/hosting/tenants',
  //         description: 'Tenant management services and pages for the console application',
  //       },
  //       {
  //         name: 'Configured Domains',
  //         href: '/hosting/domains',
  //         description: 'Domain management services and pages for the console application',
  //       },
  //       {
  //         name: 'Logs',
  //         href: '/logs',
  //         type: 'link',
  //         description: 'Coming soon...',
  //       },
  //       {
  //         name: 'Recent Deployments',
  //         type: 'link',
  //         href: '/hosting/deployments',
  //         description: 'Deployment management services and pages for the console application',
  //       },
  //   ],
  // }
]
