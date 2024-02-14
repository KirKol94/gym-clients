import type { Story } from '@storybook/react'

import { Input, type InputProps } from './Input'

export default {
  title: 'shared/ui/Input',
  component: Input,
}

const Template: Story<InputProps> = (args) => <Input {...args} />

export const Base = Template.bind({})
Base.args = {
  inputName: 'Название инпута',
}

export const WithError = Template.bind({})
WithError.args = {
  inputName: 'Название инпута',
  error: 'Текст ошибки',
}
