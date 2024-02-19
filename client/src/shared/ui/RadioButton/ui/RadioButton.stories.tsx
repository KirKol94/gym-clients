import type { Meta, StoryFn } from '@storybook/react'

import { align, radioButtonSize } from '../models/types/radioButton'

import type { RadioButtonProps } from './RadioButton'
import { RadioButton } from './RadioButton'

export default {
  title: 'shared/ui/RadioButton',
  component: RadioButton,
  args: {
    buttonSize: {
      type: 'radio',
      options: radioButtonSize,
    },
    align: {
      type: 'radio',
      options: align,
    },
  },
} as Meta

const Template: StoryFn<RadioButtonProps> = (args) => <RadioButton {...args} />

export const Default = Template.bind({
  buttonSize: radioButtonSize.small,
  text: 'radio button text',
})
