export interface InputProps {
  type?: string
  name: string
  label?: string
  placeholder?: string
  register: any
  className?: string
  error?: string
  defaultValue?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
