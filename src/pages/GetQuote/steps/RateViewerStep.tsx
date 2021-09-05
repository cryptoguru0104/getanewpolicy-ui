import React, { useState, useEffect } from 'react'
import { getClicks } from 'api/penguin'
import ArrowButton from 'components/ArrowButton'
import Spinner from 'components/Spinner'
import './ViewPlanStep.scss'
import './RateViewerStep.scss'
import { trackEvent, trackFormEvent } from 'api/gtm'

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

    trackFormEvent(RateViewerStep.displayName, `P${index + 1}`, 1, 'CPC Click')
    trackEvent({
      event: 'cpc_click',
      cpc_placement_name: 'Confirmation Page',
      cpc_placement_id: 2,
      cpc_version: 1,
      cpc_listing_name: click.companyName,
      cpc_position: `P${index + 1}`,
      form_version: 1,
    })
  }

  useEffect(() => {
    const age = new Date().getFullYear() - info.birthYear

    trackEvent({
      event: 'cpc_request',
      cpc_version: 1,
      cpc_placement_id: 2,
      cpc_placement_name: 'Confirmation Page',
    })
    getClicks({
      url: 'https://getanewpolicy.com',
      zipCode: info.zip,
      age,
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
    <form
      className='form-step step-viewplan step-rateviewer'
      autoComplete='off'
    >
      <h4 className='title'>
        {info.firstName}, please compare multiple
        <br /> providers to find the best rates!
      </h4>
      <div className='content'>
        <ul className='match-list'>
          {state.clicks.map((click: PenguinClick, index) => (
            <li
              key={click.companyName}
              onClick={() => handleQuoteClick(click, index)}
            >
              <div className='number'>{index + 1}</div>
              <div className='logo'>
                <img src={click.imageUrl} alt='insurer' />
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
    </form>
  )
}
RateViewerStep.displayName = 'Confirmation CPC Feed'

export default RateViewerStep
