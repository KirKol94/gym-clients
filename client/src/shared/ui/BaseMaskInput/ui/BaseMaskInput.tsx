import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { Input } from '../../Input'

type BaseMaskInputProps = {
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
  const [patternShow, setPatternShow] = useState(false)
  const isPhoneField = type === 'tel'

  const focusPhoneFieldHandler = () => setPatternShow(true)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const blurPhoneFieldHandler = () => {
          setPatternShow(false)
          onBlur()
        }
        return (
          <PatternFormat
            value={value || ''}
            disabled={disabled}
            inputName={label}
            error={error?.message}
            customInput={Input}
            placeholder={placeholder}
            format={format}
            onBlur={isPhoneField ? blurPhoneFieldHandler : onBlur}
            onFocus={isPhoneField ? focusPhoneFieldHandler : undefined}
            allowEmptyFormatting={isPhoneField ? patternShow : false}
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
