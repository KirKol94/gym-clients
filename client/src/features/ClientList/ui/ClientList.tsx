import cx from 'classix'

import { Client } from '@/entities/Client'

import { useGetAllClients } from '../model/api/clientsApi'

import clx from './ClientList.module.scss'

export const ClientList = () => {
  const { data: clients } = useGetAllClients()
  const clientListClass = cx(clx.clientList)

  return (
    <ul className={clientListClass}>
      {clients && clients.map((client) => <Client key={client.id} client={client} />)}
    </ul>
  )
}
