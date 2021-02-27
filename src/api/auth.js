import axios from 'axios'

export const LOGIN = ({ username, password }) => axios.post(`/auth/login`, { username, password })

export const REGISTER = ({ username, password }) => axios.post('/auth/register', { username, password })