import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Input } from '../../Input'

export type BaseMaskInputProps = {
  label: string
  format: string
  name: string
  mask?: string
  type?: 'text' | 'tel' | 'password'
} & Partial<HTMLInputElement>

export const BaseMaskInput = ({
  label,
  name,
  type,
  mask = '_',
  format,
  placeholder,
  disabled,
  className,
}: BaseMaskInputProps) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        return (
          <PatternFormat
            value={value || ''}
            disabled={disabled}
            inputName={label}
            error={error?.message}
            customInput={Input}
            placeholder={placeholder}
            format={format}
            onBlur={onBlur}
            onFocus={undefined}
            allowEmptyFormatting={false}
            mask={mask}
            onChange={onChange}
            type={type}
            className={className}
          />
        )
      }}
    />
  )
}
