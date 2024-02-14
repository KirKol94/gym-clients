import type { Meta, Story } from '@storybook/react'

import { ProfilePage } from './ProfilePage'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as Meta

const Template: Story = () => <ProfilePage />
export const Default = Template.bind({})
