import React, { useEffect } from 'react'
import ReactHelmet from 'react-helmet'
import TagManager from 'react-gtm-module'
import Footer from './Footer'
import Header from './Header'
import styles from './SecondLayout.module.scss'

type Props = {
  title?: string
  className?: string
  children: React.ReactNode
}

const SecondLayout: React.FC<Props> = ({ title, className, children }) => {
  useEffect(() => {
    document.body.classList.add(styles.secondlayout)

    TagManager.initialize({
      gtmId: process.env.REACT_APP_ANALYTICS_ID,
    })

    if (className) {
      document.body.classList.add(className)
    }

    // scroll to top
    window.scrollTo({ top: 0 })

    return () => {
      document.body.classList.remove(styles.secondlayout)
      if (className) {
        document.body.classList.remove(className)
      }
    }
  }, [className])

  return (
    <>
      <ReactHelmet>
        <title>Get A New Policy - {title}</title>
      </ReactHelmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default SecondLayout
