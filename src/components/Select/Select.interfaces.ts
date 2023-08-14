export interface BaseProps {
  name: string
  options?: any[]
  rest?: any
  placeholder: string
}

export interface FieldSelectProps extends BaseProps {
  ariaLabel: string
}
export interface SelectProps extends BaseProps {
  label?: string
  className?: string
  error?: string
}
