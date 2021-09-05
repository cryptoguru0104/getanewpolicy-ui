import { useHistory } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import FinalFormInputMask from 'components/forms/FinalFormInputMask'
import { zipcode } from 'components/forms/validators'
import styles from './ZipcodeForm.module.scss'

const ZipcodeForm = () => {
  let history = useHistory()
  const onSubmit = (values) => {
    history.push(`/get-quote?zipcode=${values.zip}`)
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <Field
            type='tel'
            name='zip'
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
          <button type='submit'>Compare Now</button>
        </form>
      )}
    />
  )
}

export default ZipcodeForm
