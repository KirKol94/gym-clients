import type { Meta, Story } from '@storybook/react'

import { ClientList } from './ClientList'

export default {
  title: 'features/ClientList',
  component: ClientList,
} as Meta

const Template: Story = () => {
  return <ClientList />
}

export const Default = Template.bind({})
