import React from 'react'
import ArrowButton from 'components/ArrowButton'
import Dropdown from 'components/Dropdown'
import otherInsurers from 'data/insurerList'
import { trackFormEvent } from 'api/gtm'
import styles from './CurrentInsurerStep.module.scss'
type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const topInsurers = [
  'State Farm',
  'Geico',
  'Progressive',
  'Allstate',
  'USAA',
  'Liberty Mutual',
  'Farmers Insurance',
  'Nationwide',
  'American Family',
]

const CurrentInsurerStep: React.FC<Props> = ({ onSubmit }) => {
  const selectInsurer = (insurer: string | null) => {
    trackFormEvent(CurrentInsurerStep.displayName, insurer, 3)

    onSubmit({
      currentlyInsured: insurer ? 'true' : 'false',
      currentInsurer: insurer,
    })
  }

  return (
    <section className={styles.insurerstep}>
      <form className='form-step step-insurer' autoComplete='off'>
        <h4 className='title'>Select your current insurer</h4>
        <div className='content'>
          <ul className='insurer-list mx-auto'>
            {topInsurers.map((insurer) => (
              <li key={insurer} onClick={() => selectInsurer(insurer)}>
                <img src={`images/insurers/${insurer}.png`} alt='insurer' />
              </li>
            ))}
          </ul>

          <div className='select-button'>
            <Dropdown
              options={otherInsurers}
              placeholder='See more providers'
              onChange={(option: any) => selectInsurer(option.value)}
            />

            <ArrowButton
              type='button'
              className='btn btn-white'
              onClick={() => selectInsurer(null)}
            >
              Not Currently Insured
            </ArrowButton>
          </div>
        </div>
      </form>
    </section>
  )
}
CurrentInsurerStep.displayName = 'Select your current insurer'

export default CurrentInsurerStep
