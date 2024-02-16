import type { Meta, Story } from '@storybook/react'

import { GroupPage } from './GroupPage'

export default {
  title: 'pages/GroupPage',
  component: GroupPage,
} as Meta

const Template: Story = () => <GroupPage />
export const Default = Template.bind({})
