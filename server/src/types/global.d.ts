// глобальный тип который будет доступен без импортов
declare type Empty = Record<string, never>
declare type MessageJSON = { message: string } | { error: string } | { token: string }
