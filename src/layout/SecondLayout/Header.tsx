import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { ReactComponent as TogglerIcon } from 'icons/navbar-toggler.svg'
import { useState } from 'react'

const Header = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false)

  const toggleMenu = () => {
    setMenuOpened(!menuOpened)
  }

  return (
    <header className={styles.header}>
      <div className='container'>
        <Link to='/' className='logo'>
          Get a new policy
        </Link>

        <button type='button' className='navbar-toggler' onClick={toggleMenu}>
          <TogglerIcon />
        </button>

        <nav className={`menu ${menuOpened && 'opened'}`}>
          <ul>
            <li>
              <NavLink to='/' activeClassName={styles.activeLink} exact>
                <span></span>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to='/about-us' activeClassName={styles.activeLink}>
                <span></span>
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink to='/faq' activeClassName={styles.activeLink}>
                <span></span>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' activeClassName={styles.activeLink}>
                <span></span>
                CONTACT
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
