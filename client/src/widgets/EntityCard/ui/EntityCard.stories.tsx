import type { Meta, Story } from '@storybook/react'

import type { EntityCardProps } from './EntityCard'
import { EntityCard } from './EntityCard'

export default {
  title: 'widgets/EntityCard',
  component: EntityCard,
  args: {
    children: 'Hello entity card',
    requireAttention: 12,
    total: 29,
    thisMonth: 6,
  },
} as Meta

const Template: Story<EntityCardProps> = (args) => <EntityCard {...args} />
export const Default = Template.bind({})
