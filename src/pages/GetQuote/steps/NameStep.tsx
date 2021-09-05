import React from 'react'
import { Form, Field } from 'react-final-form'
import FinalFormInput from 'components/forms/FinalFormInput'
import ArrowButton from 'components/ArrowButton'
import { nameValidator } from 'components/forms/validators'
import { ReactComponent as LockIcon } from 'icons/lock.svg'
import './NameStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const acceptOnlyAlphabetic = (value: string): string => {
  var regexs = /[^a-z ]*$/gim
  return value ? value.replace(regexs, '') : ''
}

const NameStep: React.FC<Props> = ({ info, onSubmit }) => {
  const nextStep = (values) => {
    trackFormEvent(NameStep.displayName, '')

    onSubmit(values)
  }

  const onNextClick = (errors: any, formData: any) => {
    // track event if form is invalid
    if (Object.keys(errors).length > 0) {
      trackFormEvent(NameStep.displayName, '', 1, 'next', 'error')
    }
  }

  return (
    <Form
      onSubmit={(val) => nextStep(val)}
      render={({ handleSubmit, errors, values }) => (
        <form
          className='form-step step-name'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <h4 className='title'>What is your name?</h4>

          <p className='text-desc mobile-show'>
            <LockIcon /> Your information is safe and secure
          </p>

          <div className='content'>
            <div className='options'>
              <Field
                name='firstName'
                label='First name'
                placeholder='First name'
                defaultValue={info.firstName}
                validate={nameValidator}
              >
                {(props) => (
                  <FinalFormInput
                    pipe={acceptOnlyAlphabetic}
                    {...props}
                    autoFocus={true}
                  />
                )}
              </Field>

              <Field
                name='lastName'
                label='Last name'
                placeholder='Last name'
                defaultValue={info.lastName}
                validate={nameValidator}
              >
                {(props) => (
                  <FinalFormInput pipe={acceptOnlyAlphabetic} {...props} />
                )}
              </Field>
            </div>

            <p className='text-desc'>
              <LockIcon /> Your information is safe and secure
            </p>

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
NameStep.displayName = 'What is your name?'

export default NameStep
