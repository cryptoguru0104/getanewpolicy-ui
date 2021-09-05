import styles from './HomePage.module.scss'
import ZipcodeForm from './ZipcodeForm'

import CarInsurance from './sections/CarInsurance'
import HowItWorks from './sections/HowItWorks'
import Offer from './sections/Offer'
import WhatsCovered from './sections/WhatsCovered'
import InsuranceRate from './sections/InsuranceRate'
import CarBg from './sections/CarBg'
import Advertise from './sections/Advertise'
import SecondLayout from 'layout/SecondLayout/SecondLayout'

const HomePage = () => (
  <SecondLayout
    title='Compare Affordable Auto Insurance'
    className={styles.homepage}
  >
    <main className={styles.homepage}>
      <section className='container text-center'>
        <h1 className='text-center'>
          The easiest way to find the most affordable auto insurance fast
        </h1>
        <p className='subtext text-center mx-auto'>
          Enter your zip code to get started!
        </p>
        <ZipcodeForm />
      </section>

      <Advertise />
      <Offer />
      <HowItWorks />
      <CarInsurance />
      <WhatsCovered />
      <InsuranceRate />
      <CarBg />
    </main>
  </SecondLayout>
)

export default HomePage
