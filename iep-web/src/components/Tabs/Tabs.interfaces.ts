export interface TabAsLinkProps {
  label: string;
  href: string;
  current?: boolean;
}

export interface TabAsButtonProps {
  label: string;
  onClick: () => void;
  current?: boolean;
}

interface CommonTabProps {
  label: string;
  as: 'a' | 'button';
  current?: boolean;
}

export interface TabsProps {
  tabs: (CommonTabProps & (TabAsLinkProps | TabAsButtonProps))[];
}