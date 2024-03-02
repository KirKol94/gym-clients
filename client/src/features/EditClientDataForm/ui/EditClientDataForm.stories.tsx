import type { Meta, Story } from '@storybook/react'

import type { EditClientDataFormProps } from './EditClientDataForm'
import { EditClientDataForm } from './EditClientDataForm'

export default {
  title: 'features/EditClientDataForm',
  component: EditClientDataForm,
  args: {},
} as Meta

const Template: Story<EditClientDataFormProps> = (args) => <EditClientDataForm {...args} />
export const Default = Template.bind({})
