const BASE_URL = {
  production: 'http://localhost:8000',
  staging: 'https://asia-southeast2-geochat-252415.cloudfunctions.net/api',
  development: 'https://asia-southeast2-geochat-252415.cloudfunctions.net/api',
  // development: 'http://localhost:5001/geochat-252415/asia-southeast2/api',
}

const ENV = process.env.REACT_APP_BUILD_ENV || 'development'

export const API_URL = `${BASE_URL[ENV]}/v1`
export const API_FILE = BASE_URL[ENV]
