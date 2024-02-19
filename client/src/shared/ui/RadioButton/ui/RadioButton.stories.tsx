import type { StoryFn } from '@storybook/react'

import { align, radioButtonSize } from '../models/types/radioButton'

import type { RadioButtonProps } from './RadioButton'
import { RadioButton } from './RadioButton'

export default {
  title: 'shared/ui/RadioButton',
  component: RadioButton,
  argTypes: {
    buttonSize: {
      control: {
        type: 'radio',
        options: [radioButtonSize.small, radioButtonSize.medium],
      },
    },
    align: {
      type: 'select',
      options: [align.left],
    },
  },
}

const Template: StoryFn<RadioButtonProps> = (args) => <RadioButton {...args} />

export const S = Template.bind({})
S.args = {
  buttonSize: radioButtonSize.small,
  text: 'radio button text',
}
export const M = Template.bind({})
M.args = {
  buttonSize: radioButtonSize.medium,
  text: 'radio button text',
}
