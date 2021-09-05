import isPostalCode from 'validator/es/lib/isPostalCode'
import isEmail from 'validator/es/lib/isEmail'

export const required = (value) => (value ? undefined : 'Required')

export const zipcode = (value) =>

  value && isPostalCode(value, 'US') ? undefined : 'Not valid'
export const emailValidator = (value: string) =>
  value && isEmail(value) ? undefined : 'invalid'

export const nameValidator = (value, formValues): any => {
  if (!value) {
    return 'Required'
  } else if (value.length < 2) {
    return 'Min length is 2'
  } else if (formValues.firstName === formValues.lastName) {
    return 'Names can not be equal'
  } else {
    return undefined
  }
}

export const addressValidator = (value: string): string => {
  if (!value) {
    return 'required'
  } else if (!/^[a-z0-9.\s]*([0-9])+\s([a-z]){2}[a-z0-9.\s]*$/i.test(value)) {
    return 'invalid'
  }

  return undefined
}

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )
