import { useState, useEffect } from 'react'
import { trackEvent } from 'api/gtm'
import { getClicks } from 'api/penguin'
import ArrowButton from 'components/ArrowButton'
import Spinner from 'components/Spinner'
import ProgressBar from 'components/ProgressBar'
import 'pages/GetQuote/steps/ViewPlanStep.scss'
import './CompareQuotesPage.scss'

const CompareQuotesPage = ({ geoInfo }) => {
  const [state, setState] = useState({
    loading: true,
    clicks: [],
  })

  const handleQuoteClick = (click: PenguinClick, index: number) => {
    window.open(click.url, '_blank')

    trackEvent({
      event: 'cpc_click',
      cpc_placement_name: 'Landing Page Pop Under',
      cpc_placement_id: 3,
      cpc_version: 1,
      cpc_position: `P${index + 1}`,
      cpc_listing_name: click.companyName,
    })
  }

  useEffect(() => {
    const fetchClicks = (zipcode: any) => {
      trackEvent({
        event: 'cpc_request',
        cpc_version: 1,
        cpc_placement_id: 3,
        cpc_placement_name: 'Landing Page Pop Under',
      })

      getClicks({
        url: 'https://getanewpolicy.com',
        zipCode: zipcode,
        cpc_placement_id: 3,
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
    }

    if (geoInfo.zip) {
      fetchClicks(geoInfo.zip)
    } else {
      setState({ loading: false, clicks: [] })
    }
  }, [geoInfo])

  if (state.loading) {
    return <Spinner />
  }

  return (
    <>
      <header>
        <span className='logo'>Get a new policy</span>
      </header>

      <main className='page-compare-quotes'>
        <ProgressBar total={1} current={1} />

        <div className='form-step step-viewplan step-rateviewer'>
          <h4 className='title'>
            Compare at least 2 providers to find the best rate.
          </h4>
          <div className='content'>
            {!state.clicks.length && (
              <p>Sorry, we couldn't find any providers</p>
            )}
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
        </div>
      </main>
    </>
  )
}

export default CompareQuotesPage
