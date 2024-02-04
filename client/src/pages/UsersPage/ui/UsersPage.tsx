import { AddNewClientForm } from '@/features/AddNewClientForm'
import { ClientList } from '@/features/ClientList'
import { Title, TitleSize } from '@/shared/ui/Title'
import Page from '@/widgets/Page'

export const UsersPage = () => {
  return (
    <Page>
      <Title size={TitleSize.XXL}>Users page</Title>

      <AddNewClientForm />

      <ClientList />
    </Page>
  )
}
