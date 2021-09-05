import React from 'react'
import classNames from 'classnames'
import { trackFormEvent } from 'api/gtm'
import styles from './AgeRangeStep.module.scss'
type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const AgeRangeStep: React.FC<Props> = ({ info, onSubmit }) => {
  const ageRanges = [
    {
      age: 18,
      desc: 'Under 20',
    },
    {
      age: 23,
      desc: '21 to 25',
    },
    {
      age: 28,
      desc: '26 to 30',
    },
    {
      age: 33,
      desc: '31 to 35',
    },
    {
      age: 38,
      desc: '36 to 40',
    },
    {
      age: 43,
      desc: '41 to 45',
    },
    {
      age: 48,
      desc: '46 to 50',
    },
    {
      age: 53,
      desc: '51 to 55',
    },
    {
      age: 58,
      desc: '56 to 60',
    },
    {
      age: 63,
      desc: '61 to 65',
    },
    {
      age: 68,
      desc: '66 to 70',
    },
    {
      age: 72,
      desc: 'Over 70',
    },
  ]

  const selectAgeRange = (age: number) => {
    trackFormEvent(AgeRangeStep.displayName, age, 3)

    onSubmit({
      ageRange: age,
    })
  }

  return (
    <section className={styles.agerangestep}>
      <form className='form-step step-agerange' autoComplete='off'>
        <h4 className='title'>Select your age range</h4>
        <div className='content'>
          <div className='age-list mx-auto'>
            {ageRanges.map(range => (
              <button
                key={range.age}
                type='button'
                className={classNames('btn btn-outline-blue', {
                  selected: 0,
                })}
                onClick={() => selectAgeRange(range.age)}
              >
                {range.desc}
              </button>
            ))}
          </div>
        </div>
      </form>
    </section>
  )
}
AgeRangeStep.displayName = 'Select your age range'

export default AgeRangeStep
