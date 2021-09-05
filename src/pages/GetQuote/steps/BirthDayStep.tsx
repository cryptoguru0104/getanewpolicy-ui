import { trackFormEvent } from 'api/gtm'
import React from 'react'
import './BirthDayStep.scss'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const BirthDayStep: React.FC<Props> = ({ info, onSubmit }) => {
  const days: Array<string> = []
  for (let i = 1; i <= 31; i += 1) {
    days.push((i + '').padStart(2, '0'))
  }

  const selectDay = (birthDay: number) => {
    trackFormEvent(BirthDayStep.displayName, birthDay)

    onSubmit({
      birthDay,
    })
  }

  return (
    <form className='form-step step-birthday' autoComplete='off'>
      <h4 className='title'>Birth Day</h4>
      <div className='content'>
        <div className='days-list mx-auto'>
          {days.map((day, index) => (
            <button
              key={day}
              type='button'
              className={`btn btn-outline-blue ${
                info.birthDay === index + 1 && 'selected'
              }`}
              onClick={() => selectDay(index + 1)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

BirthDayStep.displayName = 'Birth Day'

export default BirthDayStep
