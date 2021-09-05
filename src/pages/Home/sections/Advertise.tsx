import styles from './Advertise.module.scss'

const Advertise = () => (
  <div className='container'>
    <section className={styles.advertise}>
      <div>As Advertised on:</div>
      <ul>
        <li>
          <img className='usa' src='/images/usa_today.png' alt='advertiser' />
        </li>
        <li>
          <img className='yahoo' src='/images/yahoo.png' alt='advertiser' />
        </li>
        <li>
          <img className='forbes' src='/images/forbes.png' alt='advertiser' />
        </li>
        <li>
          <img className='nbc' src='/images/nbc.png' alt='advertiser' />
        </li>
        <li>
          <img className='cbs' src='/images/cbs.png' alt='advertiser' />
        </li>
      </ul>
    </section>
  </div>
)

export default Advertise
