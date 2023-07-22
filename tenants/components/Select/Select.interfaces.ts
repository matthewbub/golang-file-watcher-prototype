export interface FieldSelectProps {
  name: string
  register: any
  options?: any[]
  rest?: any
  placeholder: string
}

export interface SelectProps extends FieldSelectProps {
  label?: string
  className?: string
  error?: string
}
