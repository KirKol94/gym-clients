import cx from 'classix'

import { Client } from '@/entities/Client'

import { useGetAllClients } from '../model/api/clientsApi'

import clx from './ClientList.module.scss'

export const ClientList = () => {
  const { data: clients } = useGetAllClients()
  const clientListClass = cx(clx.clientList)

  return (
    <div className={clientListClass}>
      <h2 className={clx.title}>Список пользователей</h2>
      {!clients ? (
        <h2 className={clx.isEmpty}>Пока что здесь ничего нет</h2>
      ) : (
        <ul className={clientListClass}>
          {clients && clients.map((client) => <Client key={client.id} client={client} />)}
        </ul>
      )}
    </div>
  )
}
