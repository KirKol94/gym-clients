import type { Meta, StoryFn } from '@storybook/react'

import { titleSize } from '../model/types/title'

import type { TitleProps } from './Title'
import { Title } from './Title'

export default {
  title: 'shared/ui/Title',
  component: Title,
  args: {
    size: {
      type: 'radio',
      options: titleSize,
    },
    level: {
      type: 'radio',
      options: [1, 2, 3, 4, 5, 6],
    },
    children: 'some title text',
  },
} as Meta

const Template: StoryFn<TitleProps> = (args) => <Title {...args} />

export const Default = Template.bind({
  size: titleSize.xl,
  level: 1,
})
