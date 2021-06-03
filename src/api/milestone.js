import apiUrl from '../apiConfig'
import axios from 'axios'

export const showMilestones = (user, id) => {
  return axios({
    url: apiUrl + `/children/${id}/milestones/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
