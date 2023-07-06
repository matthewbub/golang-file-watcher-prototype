# DashboardSideNavigation

The default navigation will be `appConfig.navigation`. If you want to override
the default, you can pass in a navigation prop.

```jsx
const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/projects" },
  { name: "Calendar", href: "/calendar" },
  { name: "Documents", href: "/documents" },
  { name: "Reports", href: "/reports" },
];

<DashboardSideNavigation navigation={navigation} />;
```
