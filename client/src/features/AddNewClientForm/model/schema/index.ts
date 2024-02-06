import joi from 'joi'

import {
  validateCount,
  validateEmail,
  validateFio,
  validatePhoneNumber,
} from '@/features/AddNewClientForm/model/schema/validators.ts'

const customMessages = {
  'string.min': 'должно быть не менее {{#limit}} символов',
  'string.max': 'должно быть не более {{#limit}} символов',
  'number.min': 'должно быть не менее {{#limit}}',
  'number.max': 'должно быть не более {{#limit}}',
  'number.base': 'должно быть целым числом',
  'any.required': 'поле обязательно для заполнения',
  'string.empty': ' ',
}

export const schema = joi
  .object({
    firstName: joi.string().min(2).max(15).custom(validateFio).messages(customMessages).required(),
    middleName: joi.string().min(2).max(24).custom(validateFio).messages(customMessages).required(),
    lastName: joi.string().min(6).max(20).custom(validateFio).messages(customMessages).required(),
    email: joi.string().custom(validateEmail).messages(customMessages).allow(null),
    mobilePhone: joi.string().custom(validatePhoneNumber).messages(customMessages).allow(null),
    personalTrainingCount: joi.number().min(1).max(100).custom(validateCount).messages(customMessages).required(),
  })
  .required()
