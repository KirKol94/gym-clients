import type { Meta, Story } from '@storybook/react'

import { UsersPage } from './UsersPage'

export default {
  title: 'pages/UsersPage',
  component: UsersPage,
} as Meta

const Template: Story = () => <UsersPage />
export const Default = Template.bind({})
