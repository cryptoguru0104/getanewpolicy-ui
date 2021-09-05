import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import './VehicleModelStep.scss'
import { trackFormEvent } from 'api/gtm'

type Props = {
  info: any
  onSubmit: (values: Object, stepCount?: number) => void
}
const VehicleModelStep: React.FC<Props> = ({ info, onSubmit }) => {
  const [state, setState] = useState({
    loading: true,
    models: [],
  })

  const selectModel = (vehicleModel: string) => {
    const vehicleList = [
      ...(info.vehicleList || []),
      {
        id: info.vehicleYear + info.vehicleMake + vehicleModel,
        year: info.vehicleYear,
        make: info.vehicleMake,
        model: vehicleModel,
      }
    ]

    trackFormEvent(VehicleModelStep.displayName, vehicleModel)
    onSubmit({ vehicleList }, Math.min(vehicleList.length, 2))
  }

  useEffect(() => {
    axios
      .get(
        `https://penguin.oapi.me/api/vehicle/vehicle-model`,
        {
          params: {
            year: Math.min(2021, info.vehicleYear),
            make: info.vehicleMake.toUpperCase(),
          },
        },
      )
      .then(
        (res) => {
          setState({
            loading: false,
            models: res.data?.data || [],
          })
        },
        () => {
          alert('Sorry, failed on loading models')
          setState({ loading: false, models: [] })
        },
      )
  }, [info])

  if (state.loading) {
    return <Spinner />
  }

  return (
    <form className='form-step step-vehiclemodel' autoComplete='off'>
      <h4 className='title'>Vehicle model</h4>
      <div className='content'>
        <div className='model-list mx-auto'>
          {state.models.map((model) => (
            <button
              key={model}
              type='button'
              className='btn btn-outline-blue'
              onClick={() => selectModel(model)}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

VehicleModelStep.displayName = 'Vehicle model'


export default VehicleModelStep
