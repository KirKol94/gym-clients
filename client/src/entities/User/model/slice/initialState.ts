import { IProfileData } from '../types/user'

interface InitialState {
  isAuth: boolean
  profileData: IProfileData
}

export const initialState: InitialState = {
  isAuth: false,
  profileData: {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    avatar: '',
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
    roles: [
      {
        id: 0,
        roleName: '',
      },
    ],
    enabled: false,
  },
}
