import React from 'react'
import classNames from 'classnames'
import './BirthMonthStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const BirthMonthStep: React.FC<Props> = ({ info, onSubmit }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const selectMonth = (month: number) => {
    trackFormEvent(
      BirthMonthStep.displayName,
      monthNames[month],
    )

    onSubmit({
      birthMonth: month,
    })
  }

  return (
    <form className='form-step step-birthmonth' autoComplete='off'>
      <h4 className='title'>Birth Month</h4>
      <div className='content'>
        <div className='month-list mx-auto'>
          {monthNames.map((name, index) => (
            <button
              key={index}
              type='button'
              className={classNames('btn btn-outline-blue', {
                selected: info.birthMonth === index + 1,
              })}
              onClick={() => selectMonth(index + 1)}
            >
              {name}
            </button>
          ))}
        </div>

        <section className='why-do-ask'>
          <h5>Why do we ask?</h5>
          <p>
            A person’s age influences their insurance
            <br /> rates and discounts
          </p>
        </section>
      </div>
    </form>
  )
}
BirthMonthStep.displayName = 'Birth Month'

export default BirthMonthStep
