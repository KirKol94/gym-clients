import type { Meta, StoryFn } from '@storybook/react'

import { buttonSize, buttonTheme } from '../mode/types/button'

import type { ButtonProps } from './Button'
import { Button } from './Button'

export default {
  title: 'shared/ui/Button',
  component: Button,
  args: {
    size: {
      type: 'radio',
      options: buttonSize,
    },
    theme: {
      type: 'radio',
      options: buttonTheme,
    },
    children: 'Button',
  },
} as Meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />
export const Base = Template.bind({
  size: buttonSize.xs,
  theme: buttonTheme.primary,
})
