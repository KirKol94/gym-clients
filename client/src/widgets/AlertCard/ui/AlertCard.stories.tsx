import type { Meta, Story } from '@storybook/react'

import type { AlertCardProps } from './AlertCard'
import { AlertCard } from './AlertCard'

export default {
  title: 'widgets/AlertCard',
  component: AlertCard,
  args: {
    count: 6,
    title: 'Alert card title',
    alert: 'Alert card alert',
  },
} as Meta

const Template: Story<AlertCardProps> = (args) => <AlertCard {...args} />
export const Default = Template.bind({})
