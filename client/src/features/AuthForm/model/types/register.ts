import type { User } from '@/entities/User'

export interface ReqRegisterData extends User {
  password: string
  avatarFileName?: string
  avatarFileData?: string
}

export type ResRegisterData = object
