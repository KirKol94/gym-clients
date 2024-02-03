import { useLocation } from 'react-router-dom'

import { Title, TitleSize } from '@/shared/ui/Title'

export const UsersPage = () => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div>
      <Title size={TitleSize.XXL}>Users page</Title>
    </div>
  )
}
