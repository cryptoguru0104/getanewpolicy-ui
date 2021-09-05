import styles from './InsuranceRate.module.scss'

const InsuranceRate = () => (
  <section className={styles.InsuranceRate}>
    {/* <div className='bg' /> */}
    <div className='white-bg' />

    <h2 className='text-center'>
      Here’s what helps determine your car insurance rates:
    </h2>
    <div className='rate-list'>
      <div>
        <h4>Vehicle</h4>
        <p>
          The year, make, and model of your vehicle can affect your premium. For
          example, luxury vehicles typically cost more to cover, repair, and
          potentially replace.
        </p>
      </div>
      <div>
        <h4>Coverage</h4>
        <p>
          The level of coverage you choose will be directly reflected in your
          premium with higher/more inclusive coverage causing a higher premium.
        </p>
      </div>
      <div>
        <h4>Credit Score</h4>
        <p>
          Most insurers will use your credit score to estimate their risk of
          insuring you against missing a payment or defaulting on the coverage,
          as well as, using score to set premiums.
        </p>
      </div>
      <div>
        <h4>Driving History</h4>
        <p>
          Based on your driving and claims history, insurance companies will
          estimate the cost risk of insuring you and adjust your premiums to
          offset higher probability of having to pay out.
        </p>
      </div>
      <div>
        <h4>Address</h4>
        <p>
          Areas, cities, or zip codes with low crime or low traffic will
          typically offer lower premiums when compared to other areas that have
          a higher risk of accident or theft.
        </p>
      </div>
      <div>
        <h4>Age</h4>
        <p>
          Traditionally younger individuals will cost more to cover when
          compared to older or more seasoned drivers.
        </p>
      </div>
    </div>

    <div className='container text-center'>
      <button className='btn-primary'>Get Started</button>
    </div>
  </section>
)

export default InsuranceRate
