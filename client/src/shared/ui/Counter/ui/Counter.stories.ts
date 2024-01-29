import { Meta, StoryObj } from '@storybook/react'

import { CounterColor, CounterSize } from '../model/types/counter.ts'

import { Counter } from './Counter.tsx'

const meta = {
  title: 'Shared/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    count: 0,
    size: CounterSize.S,
    color: CounterColor.WHITE,
  },
}

export const PrimaryYellow: Story = {
  args: {
    count: 0,
    size: CounterSize.S,
    color: CounterColor.YELLOW,
  },
}
