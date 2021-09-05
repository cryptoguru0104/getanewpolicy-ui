import axios from 'axios'
import queryString from 'query-string'

export function getClicks(leadData: any, maxResults: number = 5): Promise<any> {
  const queryParams = queryString.parse(window.location.search)

  return axios.post(`https://penguin.oapi.me/api/click/get-links`, {
    token: '0ce30349-d383-4e9d-8185-b3cf288b889f',
    maxResults,
    t1: queryParams.t1,
    t2: queryParams.t2 || leadData.cpc_placement_id,
    t3: queryParams.t3,
    t4: queryParams.t4,
    t5: queryParams.t5,
    lead: leadData,
  })
}

export function getVehicleTrim(year: string | number, make: string, model: string) {
  return axios.get('https://penguin.oapi.me/api/vehicle/vehicle-trim', {
    params: {
      year,
      make: make.toUpperCase(),
      model: model.toUpperCase(),
    }
  })
}