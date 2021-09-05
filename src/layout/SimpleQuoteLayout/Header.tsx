import React from 'react'
import { ReactComponent as LockIcon } from 'icons/lock.svg'
import styles from './Header.module.scss'
const Header = () => {
  return (
    <section className={styles.header}>
      <section>
        <div className="title">
          <h2> Get a new policy</h2>
          <h3>Committed to helping seniors since 2012</h3>
        </div>
        <div className='secure-note'>
          <LockIcon />
          Your privacy is safe and secure. Tuesday, 27, 2021
        </div>
      </section>
      <section>
        <h1>
          Auto insurance costs are increasing every year! 
        </h1>
        <h4>
        — take this as a sign to check rates before it really is to late 
        </h4>
      </section>
    </section>
  )
}

export default Header
