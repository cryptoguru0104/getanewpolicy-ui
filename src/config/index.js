const config = {
  isProduct: process.env.NODE_ENV && process.env.NODE_ENV !== 'development',
  gtmId: process.env.REACT_APP_ANALYTICS_ID
}

export default config;