import axios from 'axios'

export const LOGIN = ({ username, password }) => axios.post(`/login`, { username, password })