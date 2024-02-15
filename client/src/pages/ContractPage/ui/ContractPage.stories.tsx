import type { Meta, Story } from '@storybook/react'

import { ContractPage } from './ContractPage'

export default {
  title: 'pages/ContractPage',
  component: ContractPage,
} as Meta

const Template: Story = () => <ContractPage />
export const Default = Template.bind({})
