import React from 'react'
import cookie from 'react-cookies'
import axios from 'axios'
import { getVehicleTrim } from 'api/penguin'
import { trackFormEvent } from 'api/gtm'
import ProgressBar from 'components/ProgressBar'
import { ReactComponent as ArrowBack } from 'icons/arrow-left-small.svg'
import steps from './steps'

type Props = {
  geoInfo?: any
}

type MyState = {
  info: any
  currentStep: number
}
class Form5 extends React.Component<Props, MyState> {
  defaultInfo = {
    homewoner: 'Yes',
    married: 'Yes',
    gender: 'Male',
    military: 'No',
  }

  actualSteps: any[]

  constructor(props: Props) {
    super(props)

    const { geoInfo } = props

    this.state = {
      info: {
        ...this.defaultInfo,
        ...geoInfo,
      },
      currentStep: geoInfo && geoInfo.queryZip ? 1 : 0,
    }

    this.actualSteps = [...steps]
    let interCPCIndex = this.actualSteps.findIndex(
      (element) => element.displayName === 'CPC Results',
    )

    switch (geoInfo.flow) {
      case '1':
        this.actualSteps.splice(interCPCIndex, 1)
        break
      case '3':
        this.actualSteps = this.actualSteps.slice(0, interCPCIndex + 1)
        break
      case '4':
        this.actualSteps = [
          steps[0], // zip step
          steps[interCPCIndex],
        ]
        break
      default:
        break
    }
  }

  async componentDidMount() {
    window.history.pushState(
      null,
      '',
      window.location.pathname + window.location.search,
    )
    window.addEventListener('popstate', this.onBackButtonEvent)

    const cookieData = cookie.load('Form5')

    // load the saved info from cookie or initialize from scratch
    if (cookieData) {
      const newState = {
        ...cookieData,
        loading: false,
      }
      // get flow value from query params always
      newState.info.flow = this.props.geoInfo.flow
      // prevent the issue when the current step is over the steps lengths
      newState.currentStep = Math.min(
        newState.currentStep,
        this.actualSteps.length - 1,
      )
      this.setState(newState)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onBackButtonEvent)
  }

  onBackButtonEvent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.currentStep === 0) {
      if (
        window.confirm('Are you sure to back? You will lost your information.')
      ) {
        window.history.back()
      }
    } else {
      this.goToPrevious()
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }
  }

  goToPrevious = () => {
    const updatedInfo = {
      ...this.state,
      currentStep: this.state.currentStep - 1,
    }
    cookie.save('Form5', updatedInfo, { path: '/' })
    this.setState(updatedInfo, () => {
      window.scrollTo(0, 0)
    })

    trackFormEvent(
      this.actualSteps[this.state.currentStep].displayName,
      '',
      1,
      'back',
      'pass',
    )
  }

  goToNext = async (form: any, stepCount: number = 1) => {
    const updatedInfo = {
      ...this.state.info,
      ...form,
    }
    const updatedState = {
      info: updatedInfo,
      currentStep: this.state.currentStep + stepCount,
    }

    // save only if stepCount is 0
    if (stepCount === 0) {
      cookie.save('Form5', updatedState, { path: '/' })
      this.setState(updatedState)
      return
    }

    const stepName = this.actualSteps[this.state.currentStep].displayName

    // submit lead form if address step
    if (stepName === 'Contact details') {
      const leadData = {
        ...updatedState.info,
        vehicleList: undefined,
        url: document.location.href,
        confirmationUrl: 'https://fletcher.name',
        trustedFormCertUrl: (
          document.getElementsByName(
            'xxTrustedFormCertUrl',
          )[0] as HTMLInputElement
        )?.value,
        jornayaLeadID: (
          document.getElementById('leadid_token') as HTMLInputElement
        )?.value,
        tcpaDisclosure: document.getElementById('tcp_text')?.innerText,
      }

      // modify slightly
      leadData.state = leadData.stateCode
      leadData.homeowner = leadData.homeowner === 'Yes' ? 'true' : 'false'
      leadData.married = leadData.married === 'Yes' ? 'true' : 'false'
      leadData.gender = leadData.gender === 'Male' ? 'M' : 'F'
      leadData.military = leadData.military === 'Yes' ? 'true' : 'false'

      delete leadData.stateCode
      delete leadData.vehicleList

      if (updatedState.info.vehicleList.length > 0) {
        leadData.vehicleOneMake = updatedState.info.vehicleList[0].make
        leadData.vehicleOneModel = updatedState.info.vehicleList[0].model
        leadData.vehicleOneYear = updatedState.info.vehicleList[0].year

        try {
          const { data: vehicleOneTrim } = await getVehicleTrim(
            leadData.vehicleOneYear,
            leadData.vehicleOneMake,
            leadData.vehicleOneModel,
          )
          leadData.vehicleOneVIN = vehicleOneTrim.data[0]?.vin || 'N/A'
          leadData.vehicleOneTrim = vehicleOneTrim.data[0]?.trim || 'N/A'
        } catch {}
      }
      if (updatedState.info.vehicleList.length > 1) {
        leadData.vehicleTwoMake = updatedState.info.vehicleList[1].make
        leadData.vehicleTwoModel = updatedState.info.vehicleList[1].model
        leadData.vehicleTwoYear = updatedState.info.vehicleList[1].year

        try {
          const { data: vehicleTwoTrim } = await getVehicleTrim(
            leadData.vehicleTwoYear,
            leadData.vehicleTwoMake,
            leadData.vehicleTwoModel,
          )
          leadData.vehicleTwoVIN = vehicleTwoTrim.data[0]?.vin || 'N/A'
          leadData.vehicleTwoTrim = vehicleTwoTrim.data[0]?.trim || 'N/A'
        } catch {}
      }

      if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
        axios.post('https://penguin.oapi.me/api/lead/3/submit', leadData)
      } else {
        console.log(leadData)
      }
    }

    // check if the final step is submitted
    if (this.state.currentStep < this.actualSteps.length - 1) {
      cookie.save('Form5', updatedState, { path: '/' })
      this.setState(updatedState, () => {
        window.scrollTo(0, 0)
      })
    }
  }
  render() {
    const StepComponent = this.actualSteps[this.state.currentStep]

    return (
      <>
        <header>
          <span className='logo'>Get a new policy</span>
          <span className='location'>{this.state.info.state}</span>
        </header>

        {this.state.currentStep > 0 && (
          <span
            className='btn-back'
            role='button'
            onClick={this.goToPrevious}
            title='Back previous'
          >
            <ArrowBack />
          </span>
        )}

        <ProgressBar
          total={this.actualSteps.length}
          current={this.state.currentStep + 1}
        />
        <main className='form-container'>
          <StepComponent info={this.state.info} onSubmit={this.goToNext} />
        </main>
      </>
    )
  }
}

export default Form5
