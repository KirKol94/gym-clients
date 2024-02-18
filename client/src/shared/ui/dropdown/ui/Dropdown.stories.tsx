import type { Meta, Story } from '@storybook/react'

import type { DropdownProps } from './Dropdown'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/ui/Dropdown',
  component: Dropdown,
  args: {},
} as Meta

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />
export const Base = Template.bind({})
