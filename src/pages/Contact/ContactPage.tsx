import { Form, Field } from 'react-final-form'
import SecondLayout from 'layout/SecondLayout/SecondLayout'
import { ReactComponent as Health } from 'icons/health.svg'
import { ReactComponent as Tech } from 'icons/technical-support.svg'
import { emailValidator, required } from 'components/forms/validators'
import ContactInput from './ContactInput'
import styles from './ContactPage.module.scss'

const ContactPage = () => {
  const onSubmit = () => {}
  return (
    <SecondLayout title='Contact Us' className={styles.contactpage}>
      <div className='container'>
        <h1>Contact us</h1>
        <section>
          <div className='support-block'>
            <div className='support'>
              <Health />
              <p className='address'>
                Quick Health, Inc.
                <br /> 106 E 6th St.
                <br /> Suite 710
                <br /> Austin, Texas 7870
              </p>
            </div>
            <div className='support'>
              <Tech />
              <p>
                For Technical Support
                <br /> please contact us at <br />
                <a href='mailto: help@quickhealth.com'>help@quickhealth.com</a>
              </p>
            </div>
          </div>
          <div className='submit-form'>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, errors, values }) => (
                <form
                  className='submit-form'
                  onSubmit={handleSubmit}
                  autoComplete='off'
                >
                  <Field
                    name='fullname'
                    label='Full Name'
                    placeholder='Full Name'
                    validate={required}
                  >
                    {(props) => <ContactInput {...props} />}
                  </Field>
                  <Field
                    type='email'
                    name='email'
                    label='Email Address'
                    placeholder='Email'
                    validate={emailValidator}
                  >
                    {(props) => <ContactInput {...props} />}
                  </Field>
                  <Field
                    name='phone'
                    label='Phone Number'
                    placeholder='Phone Number'
                  >
                    {(props) => <ContactInput {...props} />}
                  </Field>
                  <Field
                    name='msg'
                    label='Message'
                    placeholder='Message'
                    validate={required}
                  >
                    {(props) => (
                      <ContactInput {...props} component='textarea' />
                    )}
                  </Field>
                  <button type='button' className='btn-primary'>
                    Submit
                  </button>
                </form>
              )}
            />
          </div>
        </section>
      </div>
    </SecondLayout>
  )
}

export default ContactPage
