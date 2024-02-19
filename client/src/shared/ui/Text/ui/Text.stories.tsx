import type { Story } from '@storybook/react'

import { textSize } from '@/shared/ui/Text/model/types/textSize.ts'

import type { TextProps } from './Text'
import { Text } from './Text'

export default {
  title: 'shared/ui/Text',
  component: Text,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [textSize.small, textSize.medium],
      },
    },
  },
}

const Template: Story<TextProps> = (args) => <Text {...args} />

export const S = Template.bind({})
S.args = {
  size: textSize.small,
  children: 'Some Text with S size',
}
export const M = Template.bind({})
M.args = {
  size: textSize.medium,
  children: 'Some Text with M size',
}
