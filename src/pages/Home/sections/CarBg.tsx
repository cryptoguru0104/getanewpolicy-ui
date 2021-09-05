import styles from './CarBg.module.scss'

const CarBg = () => (
  <section className={styles.carBg}>
    <img src='/images/home/car.png' alt='car' className='car' />
    <img src='/images/home/mobile-car.png' alt='car' className='mobile-car' />
  </section>
)

export default CarBg
