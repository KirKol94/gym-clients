import type { Meta, Story } from '@storybook/react'

import { ClientPage } from './ClientPage'

export default {
  title: 'pages/ClientPage',
  component: ClientPage,
} as Meta

const Template: Story = () => <ClientPage />
export const Default = Template.bind({})
