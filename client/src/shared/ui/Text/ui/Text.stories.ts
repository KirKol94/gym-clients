import { Meta, StoryObj } from '@storybook/react'

import { TextSize } from '../model/types/text.ts'

import { Text } from './Text.tsx'

const meta = {
  title: 'Shared/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    size: TextSize.S,
    children: 'Text',
  },
}
export const BigSize: Story = {
  args: {
    size: TextSize.M,
    children: 'Text',
  },
}
