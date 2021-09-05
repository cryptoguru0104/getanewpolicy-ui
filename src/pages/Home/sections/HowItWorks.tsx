import styles from './HowItWorks.module.scss'

const HowItWorks = () => (
  <div className='container'>
    <section className={styles.howItWorks}>
      <div className='section-title'>How it works</div>
      <ul>
        <li>
          <div className='img-block'>
            <img src='/images/how-it-works/1.png' alt='desc' />
          </div>
          <div className='text-block'>
            <h3>Answer a few questions online</h3>
            <p>
              Use your time wisely, take two minutes to input some of your basic
              information so that we can quickly filter and list appropriate
              plans that meet your coverage and price goals.
            </p>
          </div>
        </li>
        <li>
          <div className='img-block'>
            <img src='/images/how-it-works/2.png' alt='desc' />
          </div>
          <div className='text-block'>
            <h3>Complete a short phone interview</h3>
            <p>
              After answering a few questions online, a licensed and
              professional agent will call within 15 minutes. They will offer
              you detailed information and answer any questions you may have
              while reviewing all of your coverage options.
            </p>
          </div>
        </li>
        <li>
          <div className='img-block'>
            <img src='/images/how-it-works/3.png' alt='desc' />
          </div>
          <div className='text-block'>
            <h3>Instantly Enjoy Savings</h3>
            <p>
              Within minutes you can seamlessly change policies, cancel old
              coverage same day (with the assistance of your agent), and begin
              paying less without financial consequences.
            </p>
          </div>
        </li>
      </ul>
      <div className='text-center'>
        <button className='btn-primary'>Get Started</button>
      </div>
    </section>
  </div>
)

export default HowItWorks
