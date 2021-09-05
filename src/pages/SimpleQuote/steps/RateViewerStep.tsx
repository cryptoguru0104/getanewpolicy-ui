import React, { useState, useEffect } from 'react'
import { getClicks } from 'api/penguin'
import ArrowButton from 'components/ArrowButton'
import Spinner from 'components/Spinner'
import { ReactComponent as Star } from 'icons/star.svg'
import { trackEvent, trackFormEvent } from 'api/gtm'
import styles from './RateViewerStep.module.scss'
type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const RateViewerStep: React.FC<Props> = ({ info, onSubmit }) => {
  const [state, setState] = useState({
    loading: true,
    clicks: [],
  })

  const handleQuoteClick = (click: PenguinClick, index: number) => {
    window.open(click.url, '_blank')

    trackFormEvent(RateViewerStep.displayName, `P${index + 1}`, 3, 'CPC Click')
    trackEvent( {
      event: 'cpc_click',
      cpc_version: 1,
      form_version: 3,
      cpc_placement_id: 4,
      cpc_placement_name: 'Short Form',
      cpc_listing_name: click.companyName,
      cpc_position:`P${index + 1}`, 
    })
  }

  useEffect(() => {
    trackEvent({
      event: 'cpc_request',
      cpc_version: 1,
      form_version: 3,
      cpc_placement_id: 4,
      cpc_placement_name: 'Short Form',
    })
    getClicks({
      url: 'https://getanewpolicy.com',
      zipCode: info.zip,
      age: info.ageRange,
      currentlyInsured: info.currentInsurer ? 1 : 0,
      currentInsurer: info.currentInsurer,
      cpc_placement_id: 2,
    }).then(
      (res) => {
        setState({
          loading: false,
          clicks: res.data?.data || [],
        })
      },
      () => {
        alert('Sorry, failed on loading clicks')
        setState({ loading: false, clicks: [] })
      },
    )
  }, [info])

  if (state.loading) {
    return <Spinner />
  }

  return (
    <section className={styles.ratestep}>
      <form
        className='form-step step-viewplan step-rateviewer'
        autoComplete='off'
      >
        <div className='content'>
          <ul className='mx-auto match-list'>
            {state.clicks.map((click: PenguinClick, index) => (
              <li
                key={click.companyName}
                onClick={() => handleQuoteClick(click, index)}
              >
                <div className='d-flex'>
                  <div className='number'>{index + 1}</div>
                  <div className='logo'>
                    <img src={click.imageUrl} alt='insurer' />
                  </div>
                </div>
                <div
                  className='desc'
                  dangerouslySetInnerHTML={{ __html: click.headline }}
                />
                <ArrowButton type='button' className='btn btn-blue'>
                  View My Quote
                </ArrowButton>
              </li>
            ))}
          </ul>
        </div>
        <section className='mx-auto respect-text'>
          <p>
            “Not only did we lower our Auto Insurance payment, but we now have
            better coverage for all our vehicles”
          </p>
          <div className='rating'>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <h4> Susie G.</h4>
          <div className='icons'>
            <img src='images/simple-quote/secure_ssl.png' alt='secure' />
            <img
              src='images/simple-quote/accredited_business.png'
              alt='business'
            />
            <img src='images/simple-quote/norton_lifelock.png' alt='norton' />
          </div>
        </section>
      </form>
    </section>
  )
}
RateViewerStep.displayName = 'Confirmation CPC Feed'

export default RateViewerStep
