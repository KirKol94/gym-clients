export interface IClient {
  id: number
  lastName: string
  firstName: string
  middleName: string | null
  birthday?: string | null
  sex?: number
  personalTrainingCount?: number | null
  email?: string | null
  mobilePhone?: string | null
}
