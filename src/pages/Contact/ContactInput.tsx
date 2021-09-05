import React from 'react'
import './ContactInput.scss'

type Props = {
  component?: 'input' | 'textarea'
  input: any
  label?: string
}

const ContactInput: React.FC<
  Props & React.InputHTMLAttributes<HTMLInputElement>
> = ({ component = 'input', input, label, ...props }) => {
  const handleChange = (e) => {
    input.onChange(e.target.value)
  }

  const elem = React.createElement(component, {
    ...input, 
    ...props, 
    onChange: handleChange
  })

  return (
    <div className='input-label'>
      {label && <label>{label}</label>}
      {elem}
    </div>
  )
}

export default ContactInput
