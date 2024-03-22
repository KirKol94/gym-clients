export type IClient = {
  id: number
  email?: string | null
  firstName: string
  lastName: string
  middleName: string | null
  birthday: string | null
  mobilePhone: string
  personalTrainingCount: number | null
  sex: 0 | 1
}
