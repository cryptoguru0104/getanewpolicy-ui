import { useCallback, useEffect, useState } from 'react'

const Test = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const fetchData = (params) => {
    return 'fetching data...'
  }

  const getParams = useCallback(
    () => {
      return {}
    },
    [],
  )

  const toggle = () => {
    setLoading(!loading)
  }

  useEffect(() => {
    console.log(fetchData(getParams()))
  }, [getParams])

  return (
    <div>
      <button onClick={toggle}>Test</button>
    </div>
  )
}

export default Test
