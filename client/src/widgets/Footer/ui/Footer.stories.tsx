import type { Meta, Story } from '@storybook/react'

import { Footer } from './Footer'

export default {
  title: 'widgets/Footer',
  component: Footer,
} as Meta

const Template: Story = () => <Footer />
export const Default = Template.bind({})
