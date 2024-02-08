import joi from 'joi'

import { validateCount, validateEmail, validateFio, validatePhoneNumber } from './validators.ts'

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
    lastName: joi.string().min(6).max(20).custom(validateFio).messages(customMessages).required(),
    sex: joi.string().valid('male', 'female').required(),
    birthday: joi.string().regex(/\d{2}\.\d{2}\.\d{4}/).required()
    .messages({
        'string.empty': 'Дата рождения не должна быть пустой',
        'string.pattern.base': 'Дата рождения должна быть в формате dd.mm.yyyy'
    }),
    email: joi.string().custom(validateEmail).messages(customMessages).allow(null),
    mobilePhone: joi.string().custom(validatePhoneNumber).messages(customMessages).allow(null),
    personalTrainingCount: joi.number().min(0).max(100).custom(validateCount).messages(customMessages).required(),
  })
  .required()
