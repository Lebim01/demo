import axios from 'axios'

export const GET_PLANS = () => axios.get('/plans')

export const GET_PLAN = (uuid) => axios.get('/plans/'+uuid)

export const CREATE_PLAN = (data) => axios.post('/plans/', data)

export const UPDATE_PLAN = (uuid, data) => axios.post('/plans/'+uuid, data)

export const DELETE_PLAN = (uuid) => axios.delete('/plans/'+uuid)

export const REPORT_PLAN = (uuid, data) => axios.post('/plans/'+uuid+'/report', data)