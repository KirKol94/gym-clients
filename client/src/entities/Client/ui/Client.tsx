import { Link } from 'react-router-dom'
import cx from 'classix'

import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { Button, ButtonSize } from '@/shared/ui/Button'

import { IClient } from '..'

import clx from './Client.module.scss'

interface ClientProps {
  client: IClient
}

export const Client = ({ client }: ClientProps) => {
  const { id, firstName, middleName, lastName, email, birthday, sex, mobilePhone, personalTrainingCount } = client
  const clientClass = cx(clx.client)

  return (
    <li className={clientClass}>
      <div className={clx.info}>
        <div className={clx.name}>
          <div>{middleName}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={clx.addInfo}>
          <div className={clx.value}>
            <span className={clx.valueTitle}>Пол:</span> {sex === 1 ? 'Мужской' : 'Женский'}
          </div>
          <div className={clx.value}>
            <span className={clx.valueTitle}>День рождения:</span> {birthday}
          </div>
          <div className={clx.value}>
            <span className={clx.valueTitle}>Кол-во персональных:</span> {personalTrainingCount}
          </div>
        </div>
      </div>
      <div className={clx.contacts}>
        <a className={clx.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank">
          {email}
        </a>
        <a className={clx.modilePhone} href={`tel:${mobilePhone}`}>
          {mobilePhone}
        </a>
      </div>
      {/* <div className={clx.moreInfo}> */}
      <Link to={`${ROUTER_PATH.USERS}/${id}`}>
        <Button size={ButtonSize.S}>Подробнее &#62;</Button>
      </Link>
      {/* </div> */}
    </li>
  )
}
