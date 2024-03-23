import type { Meta, Story } from '@storybook/react'

import type { ThemeSwitcherProps } from './ThemeSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  args: {},
} as Meta

const Template: Story<ThemeSwitcherProps> = (args) => <ThemeSwitcher {...args} />
export const Default = Template.bind({})
