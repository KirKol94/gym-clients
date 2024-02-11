type IUserRole = {
  id: number
  roleName: string
}

export interface User {
  firstName: string
  middleName: string
  lastName: string
  username: string
  email: string
  avatar: string
}

export interface IProfileData extends User {
  id: number
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  roles: IUserRole[]
  enabled: boolean
}
