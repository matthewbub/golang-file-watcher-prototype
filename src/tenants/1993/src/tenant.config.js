export const tenantConfig = {
  name: "Gerald & Co.",
  slogan: "A landscaping company",
  id: "1993",
  logo: "LOGO DEFINED @ src/tenants/1993/src/components/Logo.jsx",
  messages: {
    COMMENTS: [
      'MESSAGES MUST USE JSON-LIKE FORMAT',
      'BASICALLY JUST MAKE SURE THEIR STRINGS.',
      'THESE FIELDS ARE PASSED TO i18N'
    ],
    en: {
      'navigation.items.home': 'Home',
      'navigation.items.about': 'About Us',
      'navigation.items.services': 'Our Services',
      'navigation.items.locations': 'Our Locations',
      'navigation.items.contact': 'Schedule a Consultation',
      'navigation.items.login': 'Pay My Invoice',
      'hero.heading': 'We\'re Transforming The Outdoors One Backyard At A Time',
      'hero.subheading': 'We\'re a full-service landscaping company that specializes in residential and commercial landscaping services. We\'re dedicated to providing high-quality landscaping services that will transform your outdoor space into a beautiful oasis.',
      'hero.button': 'Get A Free Quote',
    }
  },
  links: {
    'navigation.items.home': '/',
    'navigation.items.about': '/about',
    'navigation.items.services': '/services',
    'navigation.items.locations': '/locations',
    'navigation.items.contact': '/contact',
    'navigation.items.login': '/login',
  },
  ignore: {
    'navigation.items.home': true,
    'navigation.items.about': false,
    'navigation.items.services': false,
    'navigation.items.locations': false,
    'navigation.items.contact': false,
    'navigation.items.login': false,
  }
}