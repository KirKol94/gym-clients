import type { Meta, Story } from '@storybook/react'

import type { DropdownProps } from './Dropdown'
import { Dropdown } from './Dropdown'

export default {
  title: 'shared/ui/Dropdown',
  component: Dropdown,
  args: {
    options: [
      {
        label: 'hello',
        value: 1,
      },
      {
        label: 'hello1',
        value: 2,
      },
      {
        label: 'hello2',
        value: 3,
      },
      {
        label: 'hello3',
        value: 4,
      },
    ],
  },
} as Meta

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />
export const Base = Template.bind({})
