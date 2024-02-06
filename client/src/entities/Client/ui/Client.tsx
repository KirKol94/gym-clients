import { Link } from 'react-router-dom'
import cx from 'classix'

import { Button, ButtonSize } from '@/shared/ui/Button'

import { IClient } from '..'

import clx from './Client.module.scss'
import classes from './Client.module.scss'

interface ClientProps {
  client: IClient
}

export const Client = ({ client }: ClientProps) => {
  const { id, firstName, middleName, lastName, email, birthday, sex, mobilePhone, personalTrainingCount } = client
  const clientClass = cx(clx.client)

  return (
    <li className={clientClass}>
      <div className={classes.info}>
        <div className={classes.name}>
          <div>{middleName}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={classes.addInfo}>
          <div>
            <span>Пол:</span> {sex === 1 ? 'Мужской' : 'Женский'}
          </div>
          <div>
            <span>День рождения:</span> {birthday}
          </div>
          <div>
            <span>Кол-во персональных:</span> {personalTrainingCount}
          </div>
        </div>
      </div>
      <div className={classes.contacts}>
        <a className={classes.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank">
          {email}
        </a>
        <a className={classes.modilePhone} href={`tel:${mobilePhone}`}>
          {mobilePhone}
        </a>
      </div>
      <div className={classes.moreInfo}>
        <Link to={`/user:${id}`}>
          <Button size={ButtonSize.S}>Подробнее &#62;</Button>
        </Link>
      </div>
    </li>
  )
}
