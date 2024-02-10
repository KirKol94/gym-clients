import DropdownMenu from './DropdownMenu';
import { SelectOption, DropdownSize } from '../model/types/dropdown';
import { memo } from 'react';

interface DropdownProps {
  options: SelectOption[];
  label?: string;
  size?: DropdownSize;
}

const Dropdown = memo((props: DropdownProps) => {
  const { label, options, size } = props;
  return <DropdownMenu size={size} options={options} label={label} />
});

export { Dropdown };
