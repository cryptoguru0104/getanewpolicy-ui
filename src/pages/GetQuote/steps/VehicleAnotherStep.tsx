import { trackFormEvent } from 'api/gtm'
import React from 'react'
import './VehicleAnotherStep.scss'

type Props = {
  info: any
  onSubmit: (values: Object, stepCount?: number) => void
}

const VehicleAnotherStep: React.FC<Props> = ({ info, onSubmit }) => {
  const vehicleList = info.vehicleList || []

  const selectYes = () => {
    trackFormEvent(VehicleAnotherStep.displayName, 'Yes')
    onSubmit({ addAnother: 'Yes' }, -3)
  }

  const selectNo = () => {
    trackFormEvent(VehicleAnotherStep.displayName, 'No')
    onSubmit({ addAnother: 'No' })
  }

  const deleteVehicle = (index: number) => {
    const updatedList = vehicleList.filter((_, i: number) => i !== index)
    onSubmit(
      {
        vehicleList: updatedList,
      },
      !updatedList.length ? -3 : 0, // go back tot he year step if no vehicle was listed
    )
  }

  return (
    <form className='form-step step-vehicleanother' autoComplete='off'>
      <h4 className='title'>Add another vehicle?</h4>
      <p className='comment'>(Saves an additional 20%)</p>
      <div className='content'>
        <div className='options'>
          <button
            type='button'
            className='btn btn-outline-blue'
            onClick={selectYes}
          >
            Yes
          </button>
          <button
            type='button'
            className='btn btn-outline-blue'
            onClick={selectNo}
          >
            No
          </button>
        </div>

        <ul className='vehicle-list'>
          {vehicleList.map((vehicle: any, index: number) => (
            <li key={index} className='btn-white'>
              <div className='number'>0{index + 1} |</div>
              <div className='vehicle-name'>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </div>
              <div
                className='btn-delete'
                role='button'
                title='Delete vehicle'
                onClick={() => deleteVehicle(index)}
              >
                DELETE
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  )
}
VehicleAnotherStep.displayName = 'Add another vehicle?'

export default VehicleAnotherStep
