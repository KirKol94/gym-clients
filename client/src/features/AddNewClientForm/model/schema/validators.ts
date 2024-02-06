import type { CustomValidator } from 'joi'

export const PHONE_LENGTH_REGEX = /^(?=[0-9]*$)(?:.{0}|.{10})$/
const PHONE_STARTING_NUMBERS_REGEX = /^[34789]/

const getUnmaskValue = (value: string | null) => {
  if (value) {
    return value.replace(/\D/g, '')
  }
  return null
}

const getUnmaskPhone = (value: string | null) => {
  const unmaskedValue = getUnmaskValue(value)
  if (unmaskedValue) {
    return unmaskedValue.substring(1)
  }
  return null
}

export const validateFio: CustomValidator<string> = (value, helpers) => {
  const isLastName = helpers.state.path?.[0] === 'lastName'
  const matchPattern = isLastName ? /^[а-яА-ЯёЁ]*$/ : /^[а-яА-ЯёЁ-]*$/
  const errorMessage = isLastName ? 'Только русские буквы' : 'Только русские буквы и «-»'

  if (!value?.match(matchPattern)) {
    return helpers.message({
      custom: errorMessage,
    })
  }
  return value
}

export const validateEmail: CustomValidator<string> = (value, helpers) => {
  const matchPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!value?.match(matchPattern)) {
    return helpers.message({
      custom: 'Неверный email',
    })
  }
  return value
}

export const validateCount: CustomValidator<string> = (value, helpers) => {
  const matchPattern = /^\d+$/
  if (!String(value)?.match(matchPattern)) {
    return helpers.message({
      custom: 'Только цифры от 0 до 9',
    })
  }
  return value
}

export const validatePhoneNumber: CustomValidator<string> = (value, helpers) => {
  const clearedValue = getUnmaskPhone(value)
  const isFormatValid = `${clearedValue}`.match(PHONE_LENGTH_REGEX)
  const isPhoneStartValid = `${clearedValue}`.match(PHONE_STARTING_NUMBERS_REGEX)

  if (!isFormatValid)
    return helpers.message({
      custom: 'Номер должен состоять из 11 цифр',
    })

  if (!isPhoneStartValid)
    return helpers.message({
      custom: 'Номер должен начинаться с "3", "4", "7", "8" или "9"',
    })

  return value
}
