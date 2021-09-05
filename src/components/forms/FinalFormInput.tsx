import React from 'react'
import './FinalFormInput.scss'

type Props = {
  component?: 'input' | 'textarea'
  input: any
  meta: any
  label?: string
  pipe?: (value: string) => string
}

const FinalFormInput: React.FC<
  Props & React.InputHTMLAttributes<HTMLInputElement>
> = ({ component = 'input', input, meta, label, pipe, ...props }) => {
  const hasError = (meta.error || meta.submitError) && meta.touched
  const isValid = meta.valid && meta.touched
  const handleChange = (e) => {
    input.onChange(pipe ? pipe(e.target.value) : e.target.value)
  }

  const inputElem = React.createElement(component, {
    ...input,
    ...props,
    onChange: handleChange,
  })

  return (
    <div
      className={`control ${label ? 'with-label' : ''} ${
        hasError ? 'has-error' : ''
      } ${isValid ? 'has-success' : ''}`}
    >
      {label && <label>{label}</label>}
      {inputElem}
    </div>
  )
}

export default FinalFormInput
