import React from 'react'
import { Form, Field } from 'react-final-form'
import FinalFormSwitch from 'components/forms/FinalFormSwitch'
import ArrowButton from 'components/ArrowButton'
import './DriverStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const DriverStep: React.FC<Props> = ({ info, onSubmit }) => {
  const nextStep = (values) => {
    trackFormEvent(DriverStep.displayName, {
      homeowner: info.homeowner === 'Yes',
      married: info.married === 'Yes',
      gender: info.gender === 'Male' ? 'M' : 'F',
      military: info.military === 'Yes',
    })
    onSubmit(values)
  }

  return (
    <Form
      onSubmit={(val) => nextStep(val)}
      render={({ handleSubmit }) => (
        <form
          className='form-step step-driver'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <h4 className='title'>Tell us about the driver</h4>
          <p>You may qualify for additional discounts</p>
          <div className='content'>
            <label htmlFor='married'>Homeowner</label>
            <Field name='homeowner' defaultValue={info.married}>
              {(props) => <FinalFormSwitch {...props} />}
            </Field>

            <label htmlFor='married'>Married</label>
            <Field name='married' defaultValue={info.married}>
              {(props) => <FinalFormSwitch {...props} />}
            </Field>

            <label htmlFor='gender'>Gender</label>
            <Field name='gender' defaultValue={info.gender}>
              {(props) => (
                <FinalFormSwitch
                  trueValue='Male'
                  falseValue='Female'
                  {...props}
                />
              )}
            </Field>

            <label htmlFor='military'>Military</label>
            <Field name='military' defaultValue={info.military}>
              {(props) => <FinalFormSwitch {...props} />}
            </Field>

            <ArrowButton type='submit' className='btn btn-blue'>
              Next
            </ArrowButton>

          </div>
        </form>
      )}
    />
  )
}
DriverStep.displayName = 'Tell us about the driver'

export default DriverStep
