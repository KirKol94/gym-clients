import type { Meta, Story } from '@storybook/react'

import type { IClient } from '..'

import type { ClientProps } from './Client'
import { Client } from './Client'

export default {
  title: 'entities/Client',
  component: Client,
  args: {
    client: {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      sex: 1,
      email: 'ivan@ivan.ru',
      mobilePhone: '+7(999)999-99-99',
      birthday: '2000-02-01',
      personalTrainingCount: 10,
    } as IClient,
  },
} as Meta

const Template: Story<ClientProps> = (args) => <Client {...args} />
export const Default = Template.bind({})
