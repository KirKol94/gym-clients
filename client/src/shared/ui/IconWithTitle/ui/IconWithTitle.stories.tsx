import type { Story } from '@storybook/react'

import Avatar from '../../../assets/icons/avatar.svg'
import { IconWithTitleSize } from '../models/types/iconWithTitle'

import { IconWithTitle, type IconWithTitleProps } from './IconWithTitle'

export default {
  title: 'shared/ui/IconWithTitle',
  component: IconWithTitle,
  args: {
    size: {
      type: 'radio',
      options: [IconWithTitleSize.S, IconWithTitleSize.M],
    },
  },
}

const Template: Story<IconWithTitleProps> = (args) => <IconWithTitle {...args} />

export const Base = Template.bind({})
Base.args = {
  size: IconWithTitleSize.S,
  children: (
    <>
      <img src={Avatar} alt="avatar" />
      Avatar
    </>
  ),
}
