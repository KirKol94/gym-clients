import type { StoryFn } from '@storybook/react'

import { textSize } from '@/shared/ui/Text/model/types/textSize.ts'

import type { TextProps } from './Text'
import { Text } from './Text'

export default {
  title: 'shared/ui/Text',
  component: Text,
  args: {
    size: {
      type: 'radio',
      options: textSize,
    },
    children: 'Some Text with S size',
  },
}

const Template: StoryFn<TextProps> = (args) => <Text {...args} />

export const Default = Template.bind({
  size: textSize.small,
})
