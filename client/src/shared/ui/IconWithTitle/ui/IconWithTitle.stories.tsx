import type { StoryFn } from '@storybook/react'

import Avatar from '../../../assets/icons/avatar.svg'
import { iconWithTitleSize } from '../models/types/iconWithTitle.ts'

import { IconWithTitle, type IconWithTitleProps } from './IconWithTitle'

export default {
  title: 'shared/ui/IconWithTitle',
  component: IconWithTitle,
  args: {
    size: {
      type: 'radio',
      options: iconWithTitleSize,
    },
  },
}

const Template: StoryFn<IconWithTitleProps> = (args) => <IconWithTitle {...args} />

export const Base = Template.bind({})
Base.args = {
  size: iconWithTitleSize.small,
  children: (
    <>
      <img src={Avatar} alt="avatar" />
      Avatar
    </>
  ),
}
