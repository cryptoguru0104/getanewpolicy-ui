import React from 'react'
import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import queryString from 'query-string'
import axios from 'axios'
import getStateName from 'data/usStates'
import Header from './Header'
import Spinner from 'components/Spinner'
type Props = {
  children: React.ReactNode
}
const SimpleLayout: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<any>({
    geoInfo: {},
    loading: true,
  })

  useEffect(() => {
    async function fetchQuery() {
      const queryParams = queryString.parse(window.location.search)
      let newState: any = {}
      // check query string if zip exists ex: https://getanewpolicy.com/form?zipcode=78701
      try {
        if (queryParams.zipcode) {
          const { data: zipInfo } = await axios.get(
            'https://penguin.oapi.me/api/services/check-zip-us',
            {
              params: { zip: queryParams.zipcode },
            },
          )
          newState = {
            loading: false,
            geoInfo: {
              ...zipInfo,
              state: getStateName(zipInfo.state),
              stateCode: zipInfo.state,
            },
          }
        } else {
          const { data: locationInfo } = await axios.get(
            'https://geoip-js.com/geoip/v2.1/city/me?referrer=https://getanewpolicy.com',
          )

          newState = {
            loading: false,
            geoInfo: {
              state: locationInfo.subdivisions?.[0].names?.en,
              zip: locationInfo.postal?.code,
            },
          }
        }
      } catch {
        newState = { loading: false }
      }
      setState(newState)

      window['dataLayer'] = [
        {
          geo_source: queryParams.zipcode ? 'URL' : 'Maxmind',
          geo_region: newState.geoInfo.state,
          geo_zip: newState.geoInfo.zip,
          page_type: 'form',
          form_version: 3,
        },
      ]

      TagManager.initialize({
        gtmId: process.env.REACT_APP_ANALYTICS_ID,
      })
    }

    fetchQuery()
  }, [])

  const getChildren = () => {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { geoInfo: state.geoInfo })
      }
      return child
    })

    return childrenWithProps
  }
  return state.loading ? (
    <Spinner />
  ) : (
    <>
      <Header />
      {getChildren()}
    </>
  )
}

export default SimpleLayout
