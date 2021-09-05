import React from 'react'
import { Form, Field } from 'react-final-form'
import axios from 'axios'
import getStateName from 'data/usStates'
import FinalFormInputMask from 'components/forms/FinalFormInputMask'
import ArrowButton from 'components/ArrowButton'
import { zipcode } from 'components/forms/validators'
import Spinner from 'components/Spinner'
import './ZipCodeStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}
const ZipCodeStep: React.FC<Props> = ({ info, onSubmit: nextStep }) => {
  const onSubmit = (formData: any): Promise<void> => {
    trackFormEvent(
      ZipCodeStep.displayName,
      formData.zip
    )
    
    return axios
      .get('https://penguin.oapi.me/api/services/check-zip-us', {
        params: { zip: formData.zip },
      })
      .then((res) => {
        const { data } = res
        if (data.valid) {
          nextStep({
            ...data,
            state: getStateName(data.state),
            stateCode: data.state,
          })
        } else {
          throw new Error('Not found')
        }
      })
      .catch(() => {
        nextStep({
          zip: '78703',
          city: 'Austin',
          state: 'Texas',
          stateCode: 'TX',
        })
      })
  }

  const onNextClick = (errors: any, formData: any) => {
    // track event if form is invalid
    if (Object.keys(errors).length > 0) {
      trackFormEvent(
        ZipCodeStep.displayName,
        formData.zip || '',
        1,
        'next',
        'error'
      )
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, errors, values }) => (
        <form
          className='form-step step-zipcode'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <h1>
            Lets drop your auto
            <br /> insurance rates in {info.state}!
          </h1>
          <div className='box'>
            <h4 className='title'>What is your zip code?</h4>

            <div className='content'>
              <Field
                type='tel'
                name='zip'
                defaultValue={info.zip}
                validate={zipcode}
                placeholder='Zip code'
              >
                {(props) => (
                  <FinalFormInputMask
                    mask='99999'
                    maskPlaceholder=''
                    autoFocus={true}
                    {...props}
                  />
                )}
              </Field>

              <ArrowButton
                type='submit'
                className='btn btn-blue'
                disabled={submitting}
                onClick={() => onNextClick(errors, values)}
              >
                Get Started
              </ArrowButton>
            </div>

            <section className='why-do-ask'>
              <h5>Why do we ask?</h5>
              <p>
                Giving us your zip code allows us to help
                <br /> you find the best plans for your area
              </p>
            </section>
          </div>
          {submitting && <Spinner />}
        </form>
      )}
    />
  )
}
ZipCodeStep.displayName = 'What is your zip code?'

export default ZipCodeStep
