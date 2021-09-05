import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import GetQuote from 'pages/GetQuote'
import CompareQuotes from 'pages/CompareQuotes'
import Home from 'pages/Home'
import AboutPage from 'pages/About'
import FAQPage from 'pages/FAQs'
import ContactPage from 'pages/Contact/ContactPage'
import PrivacyPolicyPage from 'pages/PrivacyPolicy'
import SimpleQuotePage from 'pages/SimpleQuote'
import TermsOfUsePage from 'pages/TermsOfUse'

class App extends React.Component {
  componentDidMount() {
    this.appHeight()
    // window.addEventListener('resize', this.appHeight)
   
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.appHeight)
  }

  appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  
  render() {
    return (
      <Switch>
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <Route path='/get-quote'>
          <GetQuote />
        </Route>
        <Route path='/compare-quotes'>
          <CompareQuotes />
        </Route>
        <Route path='/about-us'>
          <AboutPage />
        </Route>
        <Route path='/faq'>
          <FAQPage />
        </Route>
        <Route path='/contact'>
          <ContactPage />
        </Route>
        <Route path='/privacy-policy'>
          <PrivacyPolicyPage />
        </Route>
        <Route path='/terms-of-use'>
          <TermsOfUsePage />
        </Route>
        <Route path='/simple-quote'>
          <SimpleQuotePage />
        </Route>
        <Route
          path='/redirect'
          render={() => window.location.replace(' https://getanewpolicy.com')}
        />
        <Redirect to='/redirect' />
      </Switch>
    )
  }
}

export default App
