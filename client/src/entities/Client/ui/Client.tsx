import { Link } from 'react-router-dom'

import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { Button, ButtonSize } from '@/shared/ui/Button'

import type { IClient } from '..'

import cls from './Client.module.scss'

export interface ClientProps {
  client: IClient
}

export const Client = ({ client }: ClientProps) => {
  const { id, firstName, middleName, lastName, email, birthday, sex, mobilePhone, personalTrainingCount } = client

  return (
    <li className={cls.client}>
      <div className={cls.info}>
        <div className={cls.info__name}>
          <div>{middleName}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={cls.additional}>
          <div className={cls.additional__item}>
            <span className={cls.additional__title}>Пол:</span> {sex === 1 ? 'Мужской' : 'Женский'}
          </div>
          <div className={cls.additional__item}>
            <span className={cls.additional__title}>День рождения:</span> {birthday}
          </div>
          <div className={cls.additional__item}>
            <span className={cls.additional__title}>Кол-во персональных:</span> {personalTrainingCount}
          </div>
        </div>
      </div>
      <div className={cls.contacts}>
        <a
          className={cls.contacts__email}
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {email}
        </a>
        <a className={cls.contacts_mobile} href={`tel:${mobilePhone}`}>
          {mobilePhone}
        </a>
      </div>
      <Link to={`${ROUTER_PATH.CLIENTS}/${id}`}>
        <Button className={cls.button} size={ButtonSize.S}>
          Подробнее &#62;
        </Button>
      </Link>
    </li>
  )
}
