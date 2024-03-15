import type { IProfileData } from '../types/user'

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
    email: '',
    avatarImg: '',
  },
}
