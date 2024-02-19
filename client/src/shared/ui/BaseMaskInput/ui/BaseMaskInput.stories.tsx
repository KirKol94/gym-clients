import { FormProvider, useForm } from 'react-hook-form'
import type { Meta, StoryFn } from '@storybook/react'

import type { BaseMaskInputProps } from './BaseMaskInput'
import { BaseMaskInput } from './BaseMaskInput'

export default {
  title: 'shared/ui/BaseMaskInput',
  component: BaseMaskInput,
  args: {
    label: 'Phone',
    name: 'phone',
    format: '+7(9##)###-##-##',
    placeholder: '+7(999)999-99-99',
  },
} as Meta

const Template: StoryFn<BaseMaskInputProps> = (args) => {
  const methods = useForm<{ phone: string }>({
    mode: 'onChange',
  })

  return (
    <FormProvider {...methods}>
      <BaseMaskInput {...args} />
    </FormProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
