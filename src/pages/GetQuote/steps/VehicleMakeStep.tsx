import React from 'react'
import Dropdown from 'components/Dropdown'
import otherMakes from 'data/vehicleMakes'
import './VehicleMakeStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const topVehicles = [
  'Ford',
  'Toyota',
  'Chevrolet',
  'Honda',
  'Nissan',
  'Jeep',
  'Dodge',
  'Hyundai',
  'Subaru',
  'Kia',
  'GMC',
  'Mercedes-Benz',
  'Volkswagen',
  'Tesla',
  'BMW',
]

const VehicleMakeStep: React.FC<Props> = ({ info, onSubmit }) => {
  const selectVehicleMake = (make: string) => {
    trackFormEvent(VehicleMakeStep.displayName, make)
    onSubmit({
      vehicleMake: make,
    })
  }

  return (
    <form className='form-step step-vehicle' autoComplete='off'>
      <h4 className='title'>Vehicle make</h4>
      <div className='content'>
        <ul className='vehicle-list mx-auto'>
          {topVehicles.map((vehicle) => (
            <li key={vehicle} onClick={() => selectVehicleMake(vehicle)}>
              <div className='logo-container'>
                <span>
                  <img src={`images/vehicles/${vehicle}.png`} alt={vehicle} />
                </span>
              </div>
              <div className='vehicle-name'>{vehicle}</div>
            </li>
          ))}
        </ul>

        <Dropdown
          options={otherMakes}
          placeholder='Other make'
          onChange={(option: any) => selectVehicleMake(option.value)}
        />
      </div>
    </form>
  )
}
VehicleMakeStep.displayName = 'Vehicle make'

export default VehicleMakeStep
