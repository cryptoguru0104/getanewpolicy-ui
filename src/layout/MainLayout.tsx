import React from 'react'
import TagManager from 'react-gtm-module'
import Footer from './Footer'
import queryString from 'query-string'
import axios from 'axios'
import getStateName from 'data/usStates'
import Spinner from 'components/Spinner'

class MainLayout extends React.Component {
  state: any = {
    geoInfo: {},
    loading: true,
  }

  async componentDidMount() {
    const queryParams = queryString.parse(window.location.search)
    let newState = this.state

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
            queryZip: true,
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

      newState.geoInfo = {
        ...newState.geoInfo,
        flow: queryParams.flow ? queryParams.flow : '1',
      }

    } catch {
      newState = { loading: false }
    }

    this.setState(newState)

    window['dataLayer'] = [
      {
        geo_source: queryParams.zipcode ? 'URL' : 'Maxmind',
        geo_region: newState.geoInfo?.state,
        geo_zip: newState.geoInfo?.zip,
        page_type: 'form',
        form_version: 1,
      },
    ]

    TagManager.initialize({
      gtmId: process.env.REACT_APP_ANALYTICS_ID,
    })
  }

  getChildren = () => {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { geoInfo: this.state.geoInfo })
        }
        return child
      },
    )

    return childrenWithProps
  }

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <>
        {this.getChildren()}
        <Footer />
      </>
    )
  }
}
export default MainLayout
