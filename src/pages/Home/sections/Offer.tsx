import { ReactComponent as ArrowUp } from 'icons/arrow-up.svg'
import { ReactComponent as ArrowDown } from 'icons/arrow-down.svg'
import styles from './Offer.module.scss'

const Offer = () => (
  <div className='container'>
    <section className={styles.offer}>
      <ul className='offer-list'>
        <li>
          <img src='/images/offers/RateFarm.png' alt='offer' />
          <div className='text-center ml-auto cost-box'>
            <span className='arrow-box'>
              <ArrowDown />
            </span>
            <div className='saving-text'>Monthly Cost</div>
          </div>
          <div className='text-center cost-box'>
            <span className='arrow-box'>
              <ArrowUp />
            </span>
            <div className='saving-text'>Annual Savings</div>
          </div>
        </li>

        <li>
          <img src='/images/offers/Gecko.png' alt='offer' />
          <span className='arrow-box ml-auto'>
            <ArrowDown />
          </span>
          <span className='arrow-box'>
            <ArrowUp />
          </span>
        </li>

        <li>
          <img src='/images/offers/Progressor.png' alt='offer' />
          <span className='arrow-box ml-auto'>
            <ArrowDown />
          </span>
          <span className='arrow-box'>
            <ArrowUp />
          </span>
        </li>
        <li>
          <img src='/images/offers/Morestate.png' alt='offer' />
          <span className='arrow-box ml-auto'>
            <ArrowDown />
          </span>
          <span className='arrow-box'>
            <ArrowUp />
          </span>
        </li>
      </ul>
      <div className='overpaying-block'>
        <h2>Stop paying for overpriced auto insurance</h2>
        <p className='text1'>Let us compare the best policies for you.</p>
        <button className='btn-primary'>Get Started</button>
      </div>
    </section>
  </div>
)

export default Offer
