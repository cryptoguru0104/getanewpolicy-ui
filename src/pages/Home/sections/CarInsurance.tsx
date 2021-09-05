import styles from './CarInsurance.module.scss'

const CarInsurance = () => (
  <section className={styles.carInsurance}>
    <img
      src='/images/home/mobile-insurance_cover.png'
      alt='bg'
      className='mobile-bg'
    />
    <div className='content-block'>
      <h2>What does car insurance cover?</h2>
      <p>
        Auto policies cover minor accidents and damages, total damages, and can
        even provide liability/medical protection for your family and property.
        There are several types and levels of auto insurance that provide
        financial security for your travel safety. Our expert agents will help
        you find the right coverage plan within your budget.
      </p>
      <button type='button' className='btn-primary'>
        Get Started
      </button>
    </div>
    <div className='gradient-bg'></div>
    <img src='/images/home/insurance_cover_bg.png' alt='bg' className='bg' />
  </section>
)

export default CarInsurance
