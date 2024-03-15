export interface User {
  firstName: string
  middleName: string | null
  lastName: string
  email: string
  avatarImg: string | null
}

export interface IProfileData extends User {
  id: number
}
