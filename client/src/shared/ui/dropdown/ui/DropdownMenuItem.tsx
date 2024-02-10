import { MouseEvent, memo, useEffect } from 'react';
import classes from './Dropdown.module.scss';
import { SelectOption } from '../model/types/dropdown';

interface DropdownMenuItemProps {
  option: SelectOption;
  index: number;
  isOpen: boolean;
  onChange: (option: SelectOption) => void;
  value: SelectOption | undefined;
  close: () => void;
  changeHighlightedIndex: (index: number) => void;
  highlightedIndex: number;
}

export const DropdownMenuItem = memo((props: DropdownMenuItemProps) => {
  const {
    isOpen,
    onChange,
    option,
    index,
    close,
    value,
    changeHighlightedIndex,
    highlightedIndex,
  } = props;
  const { label } = option;

  const isOptionSelected = (option: SelectOption) => {
    return option.label === value?.label;
  };

  const onHandleClickItem = (
    e: MouseEvent<HTMLLIElement>,
    option: SelectOption
  ) => {
    e.stopPropagation();
    close();
    onChange(option);
  };

  useEffect(() => {
    if (isOpen) {
      changeHighlightedIndex(0);
    }
  }, [isOpen]);

  const itemClassnames = (option: SelectOption, index: number) => {
    return `${classes.option} ${
      isOptionSelected(option) && classes.selected
    }  ${index === highlightedIndex && classes.highlighted}`;
  };

  const onMouseEnterItem = (index: number) => {
    changeHighlightedIndex(index);
  };

  return (
    <li
      onClick={(e) => onHandleClickItem(e, option)}
      key={label}
      className={itemClassnames(option, index)}
      onMouseEnter={() => onMouseEnterItem(index)}
    >
      {label}
    </li>
  );
});
