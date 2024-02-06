export type BaseMaskInputProps = {
  label: string
  name: string
  format: string
  placeholder: string
  mask?: string
  type?: 'text' | 'tel' | 'password'
  disabled?: boolean
  className?: string
}
