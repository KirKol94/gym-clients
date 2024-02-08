import { Link } from 'react-router-dom'

import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { Button, ButtonSize } from '@/shared/ui/Button'

import { IClient } from '..'

import cls from './Client.module.scss'

interface ClientProps {
  client: IClient
}

export const Client = ({ client }: ClientProps) => {
  const { id, firstName, middleName, lastName, email, birthday, sex, mobilePhone, personalTrainingCount } = client

  return (
    <li className={cls.client}>
      <div className={cls.info}>
        <div className={cls.name}>
          <div>{middleName}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={cls.addInfo}>
          <div className={cls.value}>
            <span className={cls.valueTitle}>Пол:</span> {sex === 1 ? 'Мужской' : 'Женский'}
          </div>
          <div className={cls.value}>
            <span className={cls.valueTitle}>День рождения:</span> {birthday}
          </div>
          <div className={cls.value}>
            <span className={cls.valueTitle}>Кол-во персональных:</span> {personalTrainingCount}
          </div>
        </div>
      </div>
      <div className={cls.contacts}>
        <a className={cls.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank">
          {email}
        </a>
        <a className={cls.modilePhone} href={`tel:${mobilePhone}`}>
          {mobilePhone}
        </a>
      </div>
      <div className={cls.moreInfo}>
        <Link to={`${ROUTER_PATH.USERS}/${id}`}>
          <Button size={ButtonSize.S}>Подробнее &#62;</Button>
        </Link>
      </div>
    </li>
  )
}
