import { memo } from 'react'

import { DropdownSize, SelectOption } from '../model/types/dropdown'

import { DropdownMenu } from './DropdownMenu'

export interface DropdownProps {
  options: SelectOption[]
  label?: string
  size?: DropdownSize
}

export const Dropdown = memo((props: DropdownProps) => {
  const { label, options, size } = props
  return <DropdownMenu size={size} options={options} label={label} />
})
