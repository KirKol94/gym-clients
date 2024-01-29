import { Meta, StoryObj } from '@storybook/react'

import additionalFields from '../../../assets/icons/additionalFields.svg'
import rightsAndRoles from '../../../assets/icons/rightsAndRoles.svg'
import settings from '../../../assets/icons/settings.svg'
import transactionStatuses from '../../../assets/icons/transactionStatuses.svg'
import { SettingsButton } from '..'

const meta = {
  title: 'Shared/SettingsButton',
  component: SettingsButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof SettingsButton>

export default meta
type Story = StoryObj<typeof meta>

export const PrimarySettings: Story = {
  args: {
    icon: settings,
    title: 'SettingsButton',
  },
}
export const PrimaryAdditionalFileds: Story = {
  args: {
    icon: additionalFields,
    title: 'SettingsButton',
  },
}
export const PrimaryRightsAndRoles: Story = {
  args: {
    icon: rightsAndRoles,
    title: 'SettingsButton',
  },
}
export const PrimaryTransactionStatuses: Story = {
  args: {
    icon: transactionStatuses,
    title: 'SettingsButton',
  },
}
