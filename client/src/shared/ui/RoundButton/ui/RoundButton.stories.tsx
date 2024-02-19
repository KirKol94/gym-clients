import type { Meta, StoryFn } from '@storybook/react'

import Arrow from '../../../assets/icons/arrow.svg'
import Back from '../../../assets/icons/back.svg'
import { roundButtonSize, roundButtonTheme } from '../model/types/roundButton'

import type { RoundButtonProps } from './RoundButton'
import { RoundButton } from './RoundButton'

export default {
  title: 'shared/ui/RoundButton',
  component: RoundButton,
  args: {
    size: {
      type: 'radio',
      options: roundButtonSize,
    },
  },
} as Meta

const Template: StoryFn<RoundButtonProps> = (args) => <RoundButton {...args} />

export const PRIMARY = Template.bind({})
PRIMARY.args = {
  size: roundButtonSize.small,
  theme: roundButtonTheme.primary,
  children: <img src={Arrow} alt="arrow" />,
}

export const SECONDARY = Template.bind({})
SECONDARY.args = {
  size: roundButtonSize.small,
  theme: roundButtonTheme.secondary,
  children: <img src={Back} alt="back" />,
}
