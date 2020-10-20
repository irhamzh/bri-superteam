import axios from 'axios'
import { API_URL } from './apiConfig'
import firebase from './firebase'

axios.defaults.baseURL = `${API_URL}`
axios.defaults.headers.common.Authorization = localStorage.getItem('token')

class Service {
  // Authentication
  static signIn(values) {
    // return axios.post('/auth/sign-in', values)
    const { email, password } = values
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  static signUp(values) {
    // return axios.post('/auth/sign-up', values)
    const { email, password } = values
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  static verifyToken() {
    return axios.get('/profile')
  }

  static changePassword(values, id) {
    return axios.put(`/auth/change-password/${id}`, values)
  }

  static forgotPassword(values) {
    return axios.post('/auth/forgot-password', values)
  }

  static resetPassword(values, id) {
    return axios.put(`/auth/forgot-password/${id}`, values)
  }

  // Role
  static getRoles(params) {
    return axios.get(`role${params}`)
  }

  static getRoleById(id) {
    return axios.get(`role/${id}`)
  }

  static createRole(values) {
    return axios.post('role', values)
  }

  static updateRole(values, id) {
    return axios.put(`role/${id}`, values)
  }

  static deleteRole(id) {
    return axios.delete(`role/${id}`)
  }

  // Master Profesi
  static getMasterProfesi(params) {
    return axios.get(`master-profesi${params}`)
  }

  static getMasterProfesiById(id) {
    return axios.get(`master-profesi/${id}`)
  }

  static createMasterProfesi(values) {
    return axios.post('master-profesi', values)
  }

  static updateMasterProfesi(values, id) {
    return axios.put(`master-profesi/${id}`, values)
  }

  static deleteMasterProfesi(id) {
    return axios.delete(`master-profesi/${id}`)
  }
}

export default Service
