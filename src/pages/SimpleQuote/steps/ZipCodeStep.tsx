import React from 'react'
import { Form, Field } from 'react-final-form'
import axios from 'axios'
import getStateName from 'data/usStates'
import FinalFormInputMask from 'components/forms/FinalFormInputMask'
import ArrowButton from '../components/ArrowButton'
import { zipcode } from 'components/forms/validators'
import Spinner from 'components/Spinner'
import { ReactComponent as Star } from 'icons/star.svg'
import { ReactComponent as ArrowIcon } from 'icons/cart-arrow.svg'
import { ReactComponent as LockIcon } from 'icons/lock.svg'
import { trackFormEvent } from 'api/gtm'
import styles from './ZipCodeStep.module.scss'
type Props = {
  info: any
  onSubmit: (values: Object) => void
}
const ZipCodeStep: React.FC<Props> = ({ info, onSubmit: nextStep }) => {
  const onSubmit = (formData: any): Promise<void> => {
    trackFormEvent(ZipCodeStep.displayName, formData.zip, 3)

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
        3,
        'next',
        'error',
      )
    }
  }

  return (
    <section className={styles.zipcode}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, errors, values }) => (
          <form
            className='form-step step-zipcode'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <div className='box'>
              <div className='content'>
                <Field
                  type='tel'
                  name='zip'
                  defaultValue={info.zip}
                  validate={zipcode}
                  label='Zip Code'
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

                <div className='comment-box'>
                  <ArrowIcon />
                  <div className='new-auto-text'>
                    Calculate New Auto insurance Payment
                  </div>
                </div>
                <ArrowButton
                  type='submit'
                  className='btn'
                  disabled={submitting}
                  onClick={() => onNextClick(errors, values)}
                >
                  Get Started
                </ArrowButton>
              </div>

              <section className='mx-auto respect-text'>
                <h5>
                  <LockIcon />
                  We <strong>highly</strong> respect your privacy
                </h5>
                <p>
                  “Not only did we lower our Auto Insurance payment, but we now
                  have better coverage for all our vehicles”
                </p>
                <div className='rating'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <h4> Susie G.</h4>
                <div className='icons'>
                  <img src='images/simple-quote/secure_ssl.png' alt='secure' />
                  <img
                    src='images/simple-quote/accredited_business.png'
                    alt='business'
                  />
                  <img
                    src='images/simple-quote/norton_lifelock.png'
                    alt='norton'
                  />
                </div>
              </section>
            </div>
            {submitting && <Spinner />}
          </form>
        )}
      />
    </section>
  )
}
ZipCodeStep.displayName = 'What is your zip code?'

export default ZipCodeStep
