import styles from './AboutPage.module.scss'
import SecondLayout from 'layout/SecondLayout/SecondLayout'

const AboutPage = () => (
  <SecondLayout title='About Us' className={styles.aboutpage}>
    <section className={'container mission'}>
      <div className='title'>
        <h1>Our mission is to help our users save money</h1>
        <button type='button' className='btn-primary'>
          Start saving!
        </button>
      </div>
      <div className='img'>
        <img src='/images/about/about.png' alt='about' />
        <div className='btn-container'>
          <button type='button' className='btn-primary'>
            Start saving!
          </button>
        </div>
      </div>
    </section>
    <section className='container blog-box'>
      <div className='finding'>
        <h2>We’re committed to making a positive and helpful impact:</h2>
        <p>
          After many frustrating years of overpaying for necessary insurance
          coverage, it is more than reasonable to become frustrated and jaded.
          However, with proper and complete coverage option comparison, you'll
          never have to deal with disagreeable service providers or aggressive
          agents trying to price gouge you.
          <br />
          When you work with our talented and caring partners, you can be
          reassured that you will leave with a smile and without the hassle. It
          is our ultimate goal to make sure that you have the right coverage, to
          never have to worry in an emergency, and to spare your savings when
          paying for coverage you must have.
          <br />
          Within every type of insurance there are always several options, in
          both coverage level and premium cost. Access to those choices and a
          helpful ally are the right of everyone searching for coverage. 
        </p>
      </div>
      <div className='divider'></div>
      <div className='partner'>
        <h2>Interested in our leads?</h2>
        <p>
          We have consumers requesting plan comparisons all over the country to
          work with our qualified partners to facilitate these requests. If you
          feel that you could be a good partner, please let us know
        </p>
        <button type='button' className='btn-primary'>
          {' '}
          Become a partner
        </button>
      </div>
    </section>
  </SecondLayout>
)

export default AboutPage
