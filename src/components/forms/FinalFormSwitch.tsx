import './FinalFormSwitch.scss'

type Props = {
  input: any
  trueValue?: string
  falseValue?: string
}

const FinalFormSwitch: React.FC<Props> = ({
  input,
  trueValue = 'Yes',
  falseValue = 'No',
}) => {
  const selectTrue = () => input.onChange(trueValue)
  const selectFalse = () => input.onChange(falseValue)

  return (
    <div
      className={`btn btn-outline-blue input-switch ${
        input.value === trueValue ? 'switched-on' : 'switched-off'
      }`}
    >
      <div role='button' onClick={selectTrue}>
        {trueValue}
      </div>
      <div role='button' onClick={selectFalse}>
        {falseValue}
      </div>
      <div className='switch'></div>
    </div>
  )
}

export default FinalFormSwitch
