import { BriXios, DefaultXios } from '../config/axiosConfig'
// import * as TokenStorage from './LocalStorageHandler'

import LocalStorageService from './LocalStorageService'

// LocalstorageService
const localStorageService = LocalStorageService.getService()

// Add a request interceptor
BriXios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Add a response interceptor
BriXios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config
    console.log(
      error?.response?.data,
      error?.response?.status === 401 && error?.response?.data?.canRefresh === false,
      'condition'
    )
    if (error?.response?.status === 401 && error?.response?.data?.canRefresh === false) {
      window.location.replace('/#/login')
      return Promise.reject(error)
    }

    if (
      error?.response?.status === 401 &&
      error?.response?.data?.canRefresh === true &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const refreshToken = localStorageService.getRefreshToken()
      console.log({ refreshToken })
      return DefaultXios.get(`/users/refresh-token?token=${refreshToken}`).then((res) => {
        console.log(res, 'mabur')
        if (res?.status === 200) {
          localStorageService.setToken(res.data)
          BriXios.defaults.headers.common.Authorization = `Bearer ${localStorageService.getAccessToken()}`
          return BriXios(originalRequest)
        }
      })
      // .catch((e) => {
      //   //cel
      //   // window.location.href = '/login'
      //   // return Promise.reject(error)
      // })
    }
    return Promise.reject(error)
  }
)

export default BriXios
