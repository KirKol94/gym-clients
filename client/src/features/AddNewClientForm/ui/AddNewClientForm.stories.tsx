import type { Meta, Story } from '@storybook/react'

import { AddNewClientForm } from './AddNewClientForm'

export default {
  title: 'features/AddNewClientForm',
  component: AddNewClientForm,
} as Meta

const Template: Story = () => <AddNewClientForm />

export const Default = Template.bind({})
