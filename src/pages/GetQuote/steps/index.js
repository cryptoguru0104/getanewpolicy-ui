import ZipCodeStep from './ZipCodeStep'
import CurrentInsurerStep from './CurrentInsurerStep'
import BirthMonthStep from './BirthMonthStep'
import BirthDayStep from './BirthDayStep'
import BirthYearStep from './BirthYearStep'
import ViewPlanStep from './ViewPlanStep'
import VehicleYearStep from './VehicleYearStep'
import VehicleMakeStep from './VehicleMakeStep'
import VehicleModelStep from './VehicleModelStep'
import VehicleAnotherStep from './VehicleAnotherStep'
import DriverStep from './DriverStep'
import NameStep from './NameStep'
import AddressStep from './AddressStep'
import RateViewerStep from './RateViewerStep'

const components = [
  RateViewerStep,
  AddressStep,
  NameStep,
  DriverStep,
  VehicleAnotherStep,
  VehicleModelStep,
  VehicleMakeStep,
  VehicleYearStep,
  ViewPlanStep,
  BirthYearStep,
  BirthDayStep,
  BirthMonthStep,
  CurrentInsurerStep,
  ZipCodeStep,
].reverse()


export default components