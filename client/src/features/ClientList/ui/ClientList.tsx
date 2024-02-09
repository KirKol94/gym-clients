import cx from 'classix'

import { Client } from '@/entities/Client'
import { Title, TitleSize } from '@/shared/ui/Title'

import { useGetAllClients } from '../model/api/clientsApi'

import clx from './ClientList.module.scss'

export const ClientList = () => {
  const { data: clients } = useGetAllClients()
  const clientListClass = cx(clx.clientList)

  return (
    <div className={clientListClass}>
      <Title level={1} size={TitleSize.XL} className={clx.title}>
        {clients?.length === 0 ? 'Пока что здесь ничего нет' : 'Список пользователей'}
      </Title>

      <ul className={clientListClass}>
        {clients && clients.map((client) => <Client key={client.id} client={client} />)}
      </ul>
    </div>
  )
}
