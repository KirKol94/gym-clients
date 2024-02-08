export interface IClient {
  id: number
  lastName: string
  firstName: string
  middleName: string | null
  birthday?: string
  sex?: number
  personalTrainingCount?: number
  email?: string | null
  mobilePhone?: string
}
