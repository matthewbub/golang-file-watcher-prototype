export const StyledDashboardLayoutHeader = ({ children, ...rest }) => (
  <header className="shrink-0 border-b border-gray-200 bg-white" {...rest}>
    {children}
  </header>
);

export const StyledDashboardLayoutLogo = ({ ...rest }) => (
  <img className="h-8 w-auto" {...rest} />
);

export const StyledDashboardLayoutNotificationButton = ({ children, ...rest }) => (
  <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300" {...rest}>
    {children}
  </button>
);

export const StyledDashboardLayoutMainContent = ({ children, ...rest }) => (
  <main className="flex-1" {...rest}>
    {children}
  </main>
);

export const StyledDashboardLayoutSecondaryContent = ({ children, ...rest }) => (
  <aside className="sticky top-8 hidden w-96 shrink-0 xl:block" {...rest}>
    {children}
  </aside>
);
