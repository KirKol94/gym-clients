import { Meta, StoryObj } from '@storybook/react'

import { LoaderColor, LoaderSize } from '../model/types/loader.ts'

import { Loader } from './Loader.tsx'

const meta = {
  title: 'Shared/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    size: LoaderSize.SMALL,
    color: LoaderColor.BLUE,
  },
}
export const PrimaryWhite: Story = {
  args: {
    size: LoaderSize.SMALL,
    color: LoaderColor.WHITE,
  },
}
export const BigSize: Story = {
  args: {
    size: LoaderSize.BIG,
    color: LoaderColor.BLUE,
  },
}
export const BigSizeWhite: Story = {
  args: {
    size: LoaderSize.BIG,
    color: LoaderColor.WHITE,
  },
}
