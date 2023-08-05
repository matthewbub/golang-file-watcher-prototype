export interface NotificationWithActionsProps {
  show: boolean;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryAction: () => void | Promise<void> | Promise<unknown> | (() => void | Promise<void> | Promise<unknown>);
  secondaryActionLabel: string;
  secondaryAction: () => void | Promise<void> | Promise<unknown> | (() => void | Promise<void> | Promise<unknown>);
};
