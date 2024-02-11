type IUserRole = {
  id: number
  roleName: string
}

export interface User {
  firstName: string
  middleName: string
  lastName: string
  username: string
  email?: string
  avatar?: string
}

export interface IResGetProfileType {
  id: number
  firstName: string
  middleName: string
  lastName: string
  username: string
  email: string
  avatar: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  roles: IUserRole
  enabled: boolean
}
