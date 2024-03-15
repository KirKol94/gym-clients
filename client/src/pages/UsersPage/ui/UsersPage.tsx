import { useGetUsers } from '../model/api/usersApi'

export const UsersPage = () => {
  const { data: users } = useGetUsers()

  return (
    <>
      <h1>users</h1>
      <pre>{JSON.stringify(users, null, ' ')}</pre>
    </>
  )
}
