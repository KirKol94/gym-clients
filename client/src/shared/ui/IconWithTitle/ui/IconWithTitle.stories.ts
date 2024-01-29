import { Meta, StoryObj } from '@storybook/react'

import companyGroups from '../../../assets/icons/companyGroups.svg'
import contractors from '../../../assets/icons/contractors.svg'
import contracts from '../../../assets/icons/contracts.svg'
import settings from '../../../assets/icons/settings.svg'
import transactions from '../../../assets/icons/transactions.svg'
import users from '../../../assets/icons/users.svg'
import { IconWithTitle, IconWithTitleSize } from '..'

const meta = {
  title: 'Shared/IconWithTitle',
  component: IconWithTitle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof IconWithTitle>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryContractors: Story = {
  args: {
    icon: contractors,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}

export const PrimaryContracts: Story = {
  args: {
    icon: contracts,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}

export const PrimaryTransations: Story = {
  args: {
    icon: transactions,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}

export const PrimaryCompanyGroups: Story = {
  args: {
    icon: companyGroups,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}

export const PrimaryUsers: Story = {
  args: {
    icon: users,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}

export const PrimarySettings: Story = {
  args: {
    icon: settings,
    title: 'Title',
    size: IconWithTitleSize.S,
  },
}
