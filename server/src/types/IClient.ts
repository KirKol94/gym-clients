export type IClient = {
  id?: number
  email: string
  firstName: string
  lastName: string
  middleName?: string | null
  birthday: string
  mobilePhone: string
  personalTraningCount: number
  sex: number
  createdAt?: string
  updatedAt?: string
}
