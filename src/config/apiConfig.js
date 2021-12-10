const BASE_URL = {
  production: 'https://asia-southeast2-geochat-252415.cloudfunctions.net/api',
  staging: 'https://asia-southeast2-bricorpu-5ee48.cloudfunctions.net/api', // server staging sementara
  development: 'http://localhost:5001/geochat-252415/asia-southeast2/api',
}

const ENV = process.env.REACT_APP_BUILD_ENV || 'production'
// const ENV = process.env.REACT_APP_BUILD_ENV || 'development'

export const API_URL = `${BASE_URL[ENV]}/v1`
export const API_FILE = BASE_URL[ENV]
