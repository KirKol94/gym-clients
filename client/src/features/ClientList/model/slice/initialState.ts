import type { IClient } from '@/entities/Client'

type InitialState = {
  clients: IClient[]
}

export const initialState: InitialState = {
  clients: [
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      sex: 1,
      email: 'ivan@ivan.ru',
      mobilePhone: '+7(999)999-99-99',
      birthday: '2000-02-01',
      personalTrainingCount: 10,
    },
    {
      id: 2,
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
      sex: 1,
      email: 'ivan@ivan.ru',
      mobilePhone: '+7(999)999-99-99',
      birthday: '2000-02-01',
      personalTrainingCount: 10,
    },
  ],
}
