import type { Meta, Story } from '@storybook/react'

import { Sidebar } from './Sidebar'

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
} as Meta

const Template: Story = () => <Sidebar />
export const Default = Template.bind({})
