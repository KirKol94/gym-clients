import type { Meta, Story } from '@storybook/react'

import { ClientsPage } from './ClientsPage'

export default {
  title: 'pages/ClientsPage',
  component: ClientsPage,
} as Meta

const Template: Story = () => <ClientsPage />
export const Default = Template.bind({})
