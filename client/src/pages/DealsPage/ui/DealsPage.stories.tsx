import type { Meta, Story } from '@storybook/react'

import { DealsPage } from './DealsPage'

export default {
  title: 'pages/DealsPage',
  component: DealsPage,
} as Meta

const Template: Story = () => <DealsPage />
export const Default = Template.bind({})
