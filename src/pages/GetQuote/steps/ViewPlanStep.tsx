import React, { useCallback, useState, useEffect } from 'react'
import { getClicks } from 'api/penguin'
import { trackEvent, trackFormEvent } from 'api/gtm'
import ArrowButton from 'components/ArrowButton'
import Spinner from 'components/Spinner'
import './ViewPlanStep.scss'

type Props = {
  info: any
  onSubmit: (values: Object) => void
}

const ViewPlanStep: React.FC<Props> = ({ info, onSubmit }) => {
  const [state, setState] = useState({
    loading: true,
    clicks: [],
  })

  const getBaseGTM = useCallback(
    () => {
      if (info.flow === '3') {
        return {
          cpc_placement_id: 4,
          cpc_placement_name: 'Short Form',
        }
      } else if (info.flow === '4') {
        return {
          cpc_placement_id: 5,
          cpc_placement_name: 'Zip Submit',
        }
      } else {
        return {
          cpc_placement_id: 1,
          cpc_placement_name: 'Intermediary CPC',
        }
      }
    },
    [info],
  )

  const handleQuoteClick = (click: PenguinClick, index: number) => {
    window.open(click.url, '_blank')

    trackFormEvent(ViewPlanStep.displayName, `P${index + 1}`, 1, 'CPC Click')
    trackEvent({
      event: 'cpc_click',
      ...getBaseGTM(),
      cpc_version: 1,
      cpc_listing_name: click.companyName,
      cpc_position: `P${index + 1}`,
    })
  }

  const nextStep = (values) => {
    trackFormEvent(ViewPlanStep.displayName, values.viewPlan)
    onSubmit(values)
  }

  useEffect(() => {
    const age = info.flow !== '4' ? new Date().getFullYear() - info.birthYear : undefined

    trackEvent({
      event: 'cpc_request',
      cpc_version: 1,
      ...getBaseGTM(),
    })

    getClicks(
      {
        url: 'https://getanewpolicy.com',
        zipCode: info.zip,
        age,
        currentlyInsured: info.currentInsurer ? 1 : 0,
        currentInsurer: info.currentInsurer,
        ...getBaseGTM(),
      },
      // eslint-disable-next-line
      info.flow == 3 || info.flow == 4 ? 5 : 2,
    ).then(
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
  }, [info, getBaseGTM])

  if (state.loading) {
    return <Spinner />
  }

  return (
    <form className='form-step step-viewplan' autoComplete='off'>
      <h4 className='title'>
        We’ve found some quick matches in
        <br /> <u>{info.city}</u> based on your answers!
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
        {info.flow !== '3' && info.flow !== '4' && (
          <section className='box mx-auto'>
            <p>
              Get a more <strong>personalized rate</strong>, just click below to
              continue the form
            </p>
            <ArrowButton
              type='button'
              className='btn btn-blue'
              onClick={() =>
                nextStep({
                  viewPlan: 'Continue form',
                })
              }
            >
              Continue form
            </ArrowButton>
          </section>
        )}
      </div>
    </form>
  )
}
ViewPlanStep.displayName = 'CPC Results'

export default ViewPlanStep
