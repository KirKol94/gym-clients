import type { User } from '@/entities/User'

export type ReqRegisterData = User & { password: string }

export type ResRegisterData = object
