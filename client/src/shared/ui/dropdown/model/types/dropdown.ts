export type SelectOption = {
  label: string;
  value: number;
};

export enum Select {
  MULTI_SELECT = 'multi_select',
  SINGLE_SELECT = 'single_select',
} // для MultiSelect в дальнейшем

export enum DropdownSize {
  S = 'select_S',
  M = 'select_M',
  XL = 'select_XL',
}
