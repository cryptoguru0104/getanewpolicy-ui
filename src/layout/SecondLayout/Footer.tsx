import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <div className='container'>
      <hr className='mobile-pad' />
      <nav>
        <div className='logo'>Get a new policy</div>
        <ul>
          <li>
            <Link to='/terms-of-use'>Terms of Use</Link>
          </li>
          <li>
            <Link to='/privacy-policy'>Privacy Policy</Link>
          </li>
          <li>
            <Link to='/contact'>Contact us</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <div className='disclaimer'>
        Disclaimer: The operator of this website is not an insurance broker or
        an insurance company, is not a representative or an agent to any broker
        or insurance company, does not endorse any particular broker or
        insurance provider and does not make any insurance decisions. We will
        submit the information you provide to a broker or an insurance company.
        This website does not constitute an offer or solicitation for automobile
        or other insurance. Providing your information on this Site does not
        guarantee that you will be approved for automobile or other insurance.
        Not all insurance providers can or will insure your vehicle. The quotes,
        rates or savings advertised by\on this website are not necessarily
        available from all providers or advertisers. Your actual quotes, rates
        or savings will vary based on many different factors like: Coverage
        Limits, Deductibles, Driving History, Education, Occupation, Type of
        vehicle, Location & more. For questions regarding your insurance policy,
        please contact your broker or insurance company directly. Residents of
        some states may not be eligible for insurance or may be subject to large
        premiums. You are under no obligation to use our website or service to
        initiate contact, nor apply for insurance or any product with any broker
        or insurance company. We receive compensation, in the form of referral
        fees, from the insurance carriers, aggregators, or other offers that we
        direct you to. Therefore, the amount of compensation provided, along
        with other factors, may impact which policy / offer you are presented.
        The offer you receive may be coming from the company that bid the most
        for your information. This website does not always provide you with an
        offer with the best rates or terms. Our website does not include all
        companies or all available offers. We encourage you to research all
        available insurance policy options relative to your situation. All
        trademarks and copyrights are the property of their respective owners.
      </div>
    </div>
  </footer>
)

export default Footer
