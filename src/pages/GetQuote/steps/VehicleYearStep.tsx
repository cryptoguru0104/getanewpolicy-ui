import React from 'react'
import Dropdown from 'components/Dropdown'
import './VehicleYearStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const VehicleYearStep: React.FC<Props> = ({ info, onSubmit }) => {
  const startYear = 2022
  const years: Array<number> = []
  const priorYears = []

  for (let i = 0; i < 48; i += 1) {
    if (i < 24) {
      years.push(startYear - i)
    } else {
      priorYears.push(startYear - i)
    }
  }

  const selectYear = (year: number) => {
    trackFormEvent(VehicleYearStep.displayName, year)
    onSubmit({
      vehicleYear: year,
    })
  }

  return (
    <form className='form-step step-vehicleyear' autoComplete='off'>
      <h4 className='title'>Vehicle Year</h4>
      <div className='content'>
        <div className='years-list mx-auto'>
          {years.map((year) => (
            <button
              key={year}
              type='button'
              className='btn btn-outline-blue'
              onClick={() => selectYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <Dropdown
          options={priorYears}
          placeholder='Prior years'
          onChange={(option: any) => selectYear(option.value)}
        />
      </div>
    </form>
  )
}
VehicleYearStep.displayName = 'Vehicle year'

export default VehicleYearStep
