import styles from './WhatsCovered.module.scss'

const WhatsCovered = () => (
  <section className={styles.WhatsCovered}>
    <h2 className='text-center'>What’s covered</h2>
    <div className='covered-block'>
      <div>
        <h4>Coverage</h4>
        <ul>
          <li>Liability Coverage</li>
          <li>Uninsured Motorists Coverage</li>
          <li>Comprehensive Coverage</li>
        </ul>
      </div>
      <div>
        <h4>Protects Against</h4>
        <ul>
          <li>Paying out of pocket for repairs caused by an accident.</li>
          <li>
            Paying out of pocket for repairs to your own vehicle or self when
            someone else is the cause of an accident.
          </li>
          <li>
            Paying out of pocket for damages beyond just collision repairs.
          </li>
        </ul>
      </div>
      <div>
        <h4>Like If</h4>
        <ul>
          <li>An accident is deemed to be your own fault.</li>
          <li>
            An accident is caused by someone else who does not have any
            coverage.
          </li>
          <li>
          </li>
        </ul>
      </div>
    </div>
    <div className='btn-container'>
      <button type='button' className='btn-primary'>
        Get Started
      </button>
    </div>
  </section>
)

export default WhatsCovered
