import type { Story } from '@storybook/react'

import { TitleSize } from '../model/types/title'

import type { TitleProps } from './Title'
import { Title } from './Title'

export default {
  title: 'shared/ui/Title',
  component: Title,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [TitleSize.XL, TitleSize.XXL],
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

const Template: Story<TitleProps> = (args) => <Title {...args} />

export const XL = Template.bind({})
XL.args = {
  size: TitleSize.XL,
  level: 1,
  children: 'XL Title 1 level',
}
export const XXL = Template.bind({})
XXL.args = {
  size: TitleSize.XXL,
  level: 1,
  children: 'XXL Title 1 level',
}
