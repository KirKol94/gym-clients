import { AddNewClientForm } from '@/features/AddNewClientForm'
import { ClientList } from '@/features/ClientList'

import cls from './ClientsPage.module.scss'

export const ClientsPage = () => {
  return (
    <div className={cls.clientsPage}>
      <AddNewClientForm />

      <ClientList />
    </div>
  )
}
