import ReactDropdown from 'react-dropdown'
import { ReactComponent as Arrow } from 'icons/dropdown.svg'
import 'react-dropdown/style.css'
import './Dropdown.scss'

const Dropdown = (props: any) => (
  <ReactDropdown
    {...props}
    controlClassName='btn btn-white'
    arrowClosed={<Arrow />}
    arrowOpen={<Arrow className='rotated' />}
  />
)

export default Dropdown
