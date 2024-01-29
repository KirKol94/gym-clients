import { Meta, StoryObj } from '@storybook/react'

import { ButtonWithArrowDirection } from '../model/types/buttonWithArrow.ts'

import { ButtonWithArrow } from './ButtonWithArrow.tsx'

const meta = {
  title: 'Shared/ButtonWithArrow',
  component: ButtonWithArrow,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ButtonWithArrow>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    direction: undefined,
  },
}
export const UP: Story = {
  args: {
    direction: ButtonWithArrowDirection.UP,
  },
}
export const DOWN: Story = {
  args: {
    direction: ButtonWithArrowDirection.DOWN,
  },
}
export const LEFT: Story = {
  args: {
    direction: ButtonWithArrowDirection.LEFT,
  },
}
