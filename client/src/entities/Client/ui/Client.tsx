import cx from 'classix'

import { IClient } from '..'

import clx from './Client.module.scss'

interface ClientProps {
  client: IClient
}

export const Client = ({ client }: ClientProps) => {
  const { firstName, middleName, lastName, email, birthday, sex, mobilePhone, personalTrainingCount } = client
  const clientClass = cx(clx.client)

  return (
    <li className={clientClass}>
      <div>Имя: {firstName}</div>
      <div>Фамилия: {middleName}</div>
      <div>Отчество: {lastName}</div>
      <div>Email: {email}</div>
      <div>День рождения: {birthday}</div>
      <div>Пол: {sex === 1 ? 'Мужской' : 'Женский'}</div>
      <div>Телефон: {mobilePhone}</div>
      <div>Кол-во персональных: {personalTrainingCount}</div>
    </li>
  )
}
