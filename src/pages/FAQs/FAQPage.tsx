import { Form, Field } from 'react-final-form'
import SecondLayout from 'layout/SecondLayout/SecondLayout'
import FinalFormInput from 'components/forms/FinalFormInput'
import {
  nameValidator,
  emailValidator,
  required,
} from 'components/forms/validators'
import FAQItem from './FAQItem'
import styles from './FAQPage.module.scss'

const faqs = [
  {
    title: 'How is an auto insurance policy premium calculated?',
    content:
      'Policy premiums are based on age, gender, living and working location, average annual miles driven, driving record, auto year/make/model, and the level of coverage you need.',
  },
  {
    title: ' Is auto insurance required by law?',
    content:
      'Yes, most states (except for Virginia and New Hampshire) require that drives have some minimum levels of coverage such as liability, uninsured, or underinsured drivers’ coverage. ',
  },
  {
    title: 'Are there different kinds of auto insurance?',
    content:
      'Yes, usually different kinds of vehicles like cars, motorcycles, and big wheel trucks all require separate policies and each policy can have different levels of coverage such as basic liability or comprehensive, and all of these policies will have varying premiums.',
  },
  {
    title: 'Do I need gap insurance on my vehicle?',
    content:
      'Perhaps. Gap insurance covers the difference between the insurance evaluation and pay out for your vehicle if it is totaled and the actual loan value still held by the bank or seller. So, having gap means you do not have to pay out of pocket to close a loan on a vehicle that is totaled.',
  },
  {
    title:
      'Does my car insurance cover me if the other driver in an accident does not have insurance?',
    content:
      'Possibly, uninsured or underinsured motorist insurance is an option you must select to add to your auto policy. If you do not, then you may be completely liable for the repair or medical costs that result from such an accident.',
  },
]
const FAQPage = () => {
  const onSubmit = () => {}
  return (
    <SecondLayout title='FAQs' className={styles.faqpage}>
      <h2>HAVE QUESTIONS</h2>
      <h1>We have answers</h1>

      <div className='mx-auto text-block'>
        {faqs.map((row, ind) => (
          <FAQItem key={ind} data={row} />
        ))}
      </div>
      <h3>Have more quesitions we have more answers</h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, errors, values }) => (
          <form
            className='submit-form'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <h2>
              If you don’t see an answer to your question please reach out to us
              by filling out the below form
            </h2>
            <div className='row'>
              <Field
                name='firstName'
                label='First name'
                placeholder='First name'
                validate={nameValidator}
              >
                {(props) => <FinalFormInput {...props} />}
              </Field>

              <Field
                name='lastName'
                label='Last name'
                placeholder='Last name'
                validate={nameValidator}
              >
                {(props) => <FinalFormInput {...props} />}
              </Field>
            </div>
            <div className='row'>
              <Field
                type='email'
                name='email'
                label='Email Address'
                placeholder='Email address'
                validate={emailValidator}
              >
                {(props) => <FinalFormInput {...props} />}
              </Field>
            </div>
            <div className='row'>
              <Field
                name='subject'
                label='Subject'
                placeholder='Subject'
                validate={required}
              >
                {(props) => <FinalFormInput {...props} />}
              </Field>
            </div>
            <div className='row'>
              <Field
                name='body'
                label='Body'
                placeholder=''
                validate={required}
              >
                {(props) => <FinalFormInput component='textarea' {...props} />}
              </Field>
            </div>
            <button type='button' className='btn-primary'>
              Submit
            </button>
          </form>
        )}
      />
    </SecondLayout>
  )
}

export default FAQPage
