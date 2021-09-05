import React from 'react'
import { ReactComponent as Arrow } from 'icons/arrow-right.svg'
import styles from './ArrowButton.module.scss'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const ArrowButton: React.FC<Props> = ({ children, ...props }) => (
  <section className={styles.arrowbutton}>
    <div className='arrow-button'>
      <button {...props}>
        {children}
        <div>
          <Arrow />
        </div>
      </button>
    </div>
  </section>
)

export default ArrowButton
