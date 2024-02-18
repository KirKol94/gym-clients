import type { Meta, Story } from '@storybook/react'

import { NotFoundPage } from './NotFoundPage'

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
} as Meta

const Template: Story = () => <NotFoundPage />
export const Default = Template.bind({})
