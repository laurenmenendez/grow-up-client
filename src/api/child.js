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

export const createChild = (childData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/children/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      child: {
        name: childData.name,
        age: childData.age
      }
    }
  })
}

export const updateChild = (childData, user, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/children/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      child: childData
    }
  })
}

export const showChild = (user, id) => {
  return axios({
    url: apiUrl + `/children/${id}/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const deleteChild = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/children/${id}/`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
