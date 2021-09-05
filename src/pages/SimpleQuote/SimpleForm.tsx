import React from 'react'
import cookie from 'react-cookies'
import Footer from 'layout/SimpleQuoteLayout/Footer'
import steps from './steps'
import { trackFormEvent } from 'api/gtm'

type Props = {
  geoInfo?: any
}
type MyState = {
  info: any
  currentStep: number
}
class SimpleForm extends React.Component<Props, MyState> {
  //const [currentStep, setCurrentStep] = useState<number>(0)
  //const [info, setInfo] = useState<any>()

  constructor(props: Props) {
    super(props)

    this.state = {
      info: {
        ...props.geoInfo,
      },
      currentStep: 0,
    }
  }

  async componentDidMount() {
    window.history.pushState(
      null,
      '',
      window.location.pathname + window.location.search,
    )
    window.addEventListener('popstate', this.onBackButtonEvent)

    const cookieData = cookie.load('Simple-Quote')

    if (cookieData) {
      this.setState({
        ...cookieData,
        loading: false,
      })
    }

    document.body.style.backgroundColor = '#f6f6f6'
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onBackButtonEvent)
    document.body.style.backgroundColor = 'initial'
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
      ...this.state.info,
      currentStep: this.state.currentStep - 1,
    }
    cookie.save('Simple-Quote', updatedInfo, { path: '/' })
    this.setState(updatedInfo)

    trackFormEvent(
      steps[this.state.currentStep].displayName,
      '',
      3,
      'back',
      'pass',
    )
  }

  goNext = async (form: any, stepCount: number = 1) => {
    const updatedInfo = {
      ...this.state.info,
      ...form,
    }
    const updatedState = {
      info: updatedInfo,
      currentStep: this.state.currentStep + stepCount,
    }

    if (stepCount === 0) {
      cookie.save('Simple-Quote', updatedState, { path: '/' })
      this.setState(updatedState)
      return
    }

    if (this.state.currentStep < steps.length - 1) {
      cookie.save('Simple-Quote', updatedState, { path: '/' })
      this.setState(updatedState)
    }
  }
  render() {
    const StepComponent = steps[this.state.currentStep]

    return (
      <>
        <StepComponent info={this.state.info} onSubmit={this.goNext} />
        <Footer step={this.state.currentStep} />
      </>
    )
  }
}
export default SimpleForm
