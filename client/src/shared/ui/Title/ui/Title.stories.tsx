import type { StoryFn } from '@storybook/react'

import { titleSize } from '../model/types/title'

import type { TitleProps } from './Title'
import { Title } from './Title'

export default {
  title: 'shared/ui/Title',
  component: Title,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [titleSize.xl, titleSize.xxl],
      },
    },
    level: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6],
      },
    },
  },
}

const Template: StoryFn<TitleProps> = (args) => <Title {...args} />

export const XL = Template.bind({})
XL.args = {
  size: titleSize.xl,
  level: 1,
  children: 'XL Title 1 level',
}
export const XXL = Template.bind({})
XXL.args = {
  size: titleSize.xxl,
  level: 1,
  children: 'XXL Title 1 level',
}
