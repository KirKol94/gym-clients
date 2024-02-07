import { AddNewClientForm } from '@/features/AddNewClientForm'
import { ClientList } from '@/features/ClientList'
import { Title, TitleSize } from '@/shared/ui/Title'

export const UsersPage = () => {
  return (
    <div>
      <Title size={TitleSize.XXL}>Users page</Title>

      <AddNewClientForm />

      <ClientList />
    </div>
  )
}
