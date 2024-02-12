import { IClient } from '@/entities/Client'

type InitialState = {
  clients: IClient[]
}

export const initialState: InitialState = {
  clients: [],
}
