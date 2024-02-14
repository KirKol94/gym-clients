import type { Meta, Story } from '@storybook/react'

import { AgentPage } from './AgentPage'

export default {
  title: 'pages/AgentPage',
  component: AgentPage,
} as Meta

const Template: Story = () => <AgentPage />
export const Default = Template.bind({})
