import apiUrl from '../apiConfig'
import axios from 'axios'

export const showMilestones = (user, childId) => {
  return axios({
    url: apiUrl + `/children/${childId}/milestones/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showMilestone = (user, childId, id) => {
  return axios({
    url: apiUrl + `/children/${childId}/milestones/${id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateMilestone = (milestoneData, user, childId, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/children/${childId}/milestones/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      milestone: milestoneData
    }
  })
}

export const createMilestone = (milestoneData, user, childId) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/children/${childId}/milestones/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      milestone: milestoneData
    }
  })
}
