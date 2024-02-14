import type { Story } from '@storybook/react'

import { Align, RadioButtonSize } from '../models/types/radioButton'

import type { RadioButtonProps } from './RadioButton'
import { RadioButton } from './RadioButton'

export default {
  title: 'shared/ui/RadioButton',
  component: RadioButton,
  argTypes: {
    buttonSize: {
      control: {
        type: 'radio',
        options: [RadioButtonSize.S, RadioButtonSize.M],
      },
    },
    align: {
      type: 'select',
      options: [Align.LEFT],
    },
  },
}

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />

export const S = Template.bind({})
S.args = {
  buttonSize: RadioButtonSize.S,
  text: 'radio button text',
}
export const M = Template.bind({})
M.args = {
  buttonSize: RadioButtonSize.M,
  text: 'radio button text',
}
