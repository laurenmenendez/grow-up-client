import apiUrl from '../apiConfig'
import axios from 'axios'

export const showChildren = user => {
  return axios({
    url: apiUrl + '/children/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
