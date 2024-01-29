import { useLocation } from 'react-router-dom'

import { Title, TitleSize } from '@/shared/ui/Title'
import Page from '@/widgets/Page'

export const UsersPage = () => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <Page>
      <Title size={TitleSize.XXL}>Users page</Title>
    </Page>
  )
}
