import InputMask, { Props as InputMaskProps } from 'react-input-mask'
import './FinalFormInput.scss'

type Props = {
  input: any
  meta: any
  label?: string
}

const FinalFormInputMask: React.FC<Props & InputMaskProps> = ({
  input,
  meta,
  label,
  maskPlaceholder,
  ...props
}) => {
  const hasError = (meta.error || meta.submitError) && meta.touched
  const isValid = meta.valid && meta.touched

  return (
    <div
      className={`control ${label ? 'with-label' : ''} ${
        hasError ? 'has-error' : ''
      } ${isValid ? 'has-success' : ''}`}
    >
      {label && <label>{label}</label>}
      <InputMask {...input} {...props} maskChar={maskPlaceholder} />
    </div>
  )
}

export default FinalFormInputMask
