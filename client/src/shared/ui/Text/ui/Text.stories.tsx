import type { Story } from '@storybook/react'

import { TextSize } from '../model/types/text'

import type { TextProps } from './Text'
import { Text } from './Text'

export default {
  title: 'shared/ui/Text',
  component: Text,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [TextSize.S, TextSize.M],
      },
    },
  },
}

const Template: Story<TextProps> = (args) => <Text {...args} />

export const S = Template.bind({})
S.args = {
  size: TextSize.S,
  children: 'Some Text with S size',
}
export const M = Template.bind({})
M.args = {
  size: TextSize.M,
  children: 'Some Text with M size',
}
