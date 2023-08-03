export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  styleType?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  root?: 'button' | 'a';
  [x: string]: any;
}