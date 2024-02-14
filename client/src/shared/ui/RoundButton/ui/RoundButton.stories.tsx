import type { Story } from '@storybook/react'

import Arrow from '../../../assets/icons/arrow.svg'
import Back from '../../../assets/icons/back.svg'
import { RoundButtonSize, RoundButtonTheme } from '../model/types/roundButton'

import type { RoundButtonProps } from './RoundButton'
import { RoundButton } from './RoundButton'

export default {
  title: 'shared/ui/RoundButton',
  component: RoundButton,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [RoundButton.S, RoundButton.M],
      },
      theme: {
        type: 'select',
        options: [RoundButtonSize.S, RoundButtonSize.M],
      },
    },
  },
}

const Template: Story<RoundButtonProps> = (args) => <RoundButton {...args} />

export const PRIMARY = Template.bind({})
PRIMARY.args = {
  size: RoundButtonSize.S,
  theme: RoundButtonTheme.PRIMARY,
  children: <img src={Arrow} />,
}
export const SECONDARY = Template.bind({})
SECONDARY.args = {
  size: RoundButtonSize.S,
  theme: RoundButtonTheme.SECONDARY,
  children: <img src={Back} />,
}
