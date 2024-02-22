import { useEffect, useState } from 'react'
import cx from 'classix'

import { Client } from '@/entities/Client'
import { useAppDispatch, useAppSelector, useDebounce } from '@/shared/hooks'
import { Input } from '@/shared/ui/Input'

import { useGetAllClients, useGetFoundedClientsByName } from '../model/api/clientsApi'
import { getClients } from '../model/selectors/getClients'
import { clientsActions } from '../model/slice/clientLIstSlice'

import clx from './ClientList.module.scss'

export const ClientList = () => {
  const dispatch = useAppDispatch()
  const clients = useAppSelector(getClients)
  const { data: clientsData } = useGetAllClients()
  const clientListClass = cx(clx.clientList)
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const { data: foundedClients } = useGetFoundedClientsByName(debouncedValue)

  useEffect(() => {
    if (clientsData) {
      dispatch(clientsActions.setClients(clientsData))
    }
  }, [clientsData, dispatch])

  useEffect(() => {
    if (foundedClients) {
      dispatch(clientsActions.setClients(foundedClients))
    }
  }, [searchValue, dispatch, foundedClients])

  return (
    <div className={clientListClass}>
      <Input inputName="Поиск" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

      <ul className={clientListClass}>
        {clients && clients.map((client) => <Client key={client.id} client={client} />)}
      </ul>
    </div>
  )
}
