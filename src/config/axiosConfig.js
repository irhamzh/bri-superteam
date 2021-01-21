import axios from 'axios'

import { API_URL } from './apiConfig'

const BriXios = axios.create({
  baseURL: API_URL,
})

const DefaultXios = axios.create({
  baseURL: API_URL,
})
export { BriXios, DefaultXios }
