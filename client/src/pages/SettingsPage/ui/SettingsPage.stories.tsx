import type { Meta, Story } from '@storybook/react'

import { SettingsPage } from './SettingsPage'

export default {
  title: 'pages/SettingsPage',
  component: SettingsPage,
} as Meta

const Template: Story = () => <SettingsPage />
export const Default = Template.bind({})
