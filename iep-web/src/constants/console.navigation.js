import {
  DocumentIcon,
  PhotoIcon,
  RectangleGroupIcon,
  BuildingLibraryIcon,
  AdjustmentsHorizontalIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";

export const consoleNavigation = [
  {
    name: 'Apps',
    type: 'section',
    description: 'Internal application pages for the console application',
    uid: 'apps',
  },
  {
    name: 'Documents',
    href: '/documents',
    type: 'link',
    description: 'Internal documents management services and pages for the console application',
    icon: DocumentIcon,
    uid: 'apps_documents'
  },
  {
    name: 'Media Manager',
    href: '/media',
    type: 'link',
    description: 'Coming soon...',
    icon: PhotoIcon,
    uid: 'apps_media'
  },
  {
    name: 'Administrative',
    href: '/admin',
    type: 'link',
    description: 'Coming soon...',
    icon: AdjustmentsHorizontalIcon,
    uid: 'more_administrative'
  },
];
export const consoleHeaderNavigation = [
  {
    name: 'More',
    type: 'section',
    description: 'More pages for the console application',
    uid: 'more',
  },
  {
    name: 'Documentation',
    href: '/docs',
    type: 'link',
    description: 'Coming soon...',
    icon: DocumentTextIcon,
    uid: 'more_documentation'
  },
  {
    name: 'Developer API',
    href: '/developer',
    type: 'link',
    description: 'Coming soon...',
    icon: GlobeAltIcon,
    uid: 'more_developer'
  },
  {
    name: 'Support',
    href: '/support',
    type: 'link',
    description: 'Coming soon...',
    icon: QuestionMarkCircleIcon,
    uid: 'more_support'
  },
  {
    name: 'Blog',
    href: '/blog',
    type: 'link',
    description: 'Coming soon...',
    icon: BookOpenIcon,
    uid: 'more_blog'
  },
];
