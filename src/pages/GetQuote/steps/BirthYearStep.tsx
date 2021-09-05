import React from 'react'
import { Form, Field } from 'react-final-form'
import isInt from 'validator/es/lib/isInt'
import FinalFormInput from 'components/forms/FinalFormInput'
import ArrowButton from 'components/ArrowButton'
import './BirthYearStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const yearValidator = (year: string) =>
  year && isInt(year, { min: 1900, max: 2010 }) ? undefined : 'Invalid'

const BirthYearStep: React.FC<Props> = ({ info, onSubmit }) => {
  const nextStep = (values) => {
    trackFormEvent(BirthYearStep.displayName, values.birthYear)
    onSubmit(values)
  }

  const onNextClick = (errors: any, formData: any) => {
    // track event if form is invalid
    if (Object.keys(errors).length > 0) {
      trackFormEvent(
        BirthYearStep.displayName,
        formData.birthYear,
        1,
        'next',
        'error',
      )
    }
  }

  return (
    <Form
      onSubmit={(val) => nextStep(val)}
      render={({ handleSubmit, errors, values }) => (
        <form
          className='form-step step-birthyear'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <h4 className='title'>Birth Year</h4>

          <div className='content'>
            <Field
              type='tel'
              name='birthYear'
              placeholder='####'
              maxLength={4}
              defaultValue={info.birthYear}
              validate={yearValidator}
            >
              {(props) => <FinalFormInput {...props} autoFocus={true} />}
            </Field>
            <ArrowButton
              type='submit'
              className='btn btn-blue'
              onClick={() => onNextClick(errors, values)}
            >
              Next
            </ArrowButton>
          </div>
        </form>
      )}
    />
  )
}
BirthYearStep.displayName = 'Birth Year'

export default BirthYearStep
