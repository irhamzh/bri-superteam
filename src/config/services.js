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

  // Persekot
  static getPersekot(params) {
    return axios.get(`persekots${params}`)
  }

  static getPersekotById(id) {
    return axios.get(`persekots/${id}`)
  }

  static createPersekot(values) {
    return axios.post('persekots', values)
  }

  static updatePersekot(values, id) {
    return axios.put(`persekots/${id}`, values)
  }

  static deletePersekot(id) {
    return axios.delete(`persekots/${id}`)
  }

  // Asset
  static getAsset(params) {
    return axios.get(`assets${params}`)
  }

  static getAssetById(id) {
    return axios.get(`assets/${id}`)
  }

  static createAsset(values) {
    return axios.post('assets', values)
  }

  static updateAsset(values, id) {
    return axios.put(`assets/${id}`, values)
  }

  static deleteAsset(id) {
    return axios.delete(`assets/${id}`)
  }

  // Room
  static getRoom(params) {
    return axios.get(`rooms${params}`)
  }

  static getRoomById(id) {
    return axios.get(`rooms/${id}`)
  }

  static createRoom(values) {
    return axios.post('rooms', values)
  }

  static updateRoom(values, id) {
    return axios.put(`rooms/${id}`, values)
  }

  static deleteRoom(id) {
    return axios.delete(`rooms/${id}`)
  }

  // Vendor
  static getVendor(params) {
    return axios.get(`vendors${params}`)
  }

  static getVendorById(id) {
    return axios.get(`vendors/${id}`)
  }

  static createVendor(values) {
    return axios.post('vendors', values)
  }

  static updateVendor(values, id) {
    return axios.put(`vendors/${id}`, values)
  }

  static deleteVendor(id) {
    return axios.delete(`vendors/${id}`)
  }

  // Persediaan
  static getPersediaan(params) {
    return axios.get(`persediaans${params}`)
  }

  static getPersediaanById(id) {
    return axios.get(`persediaans/${id}`)
  }

  static createPersediaan(values) {
    return axios.post('persediaans', values)
  }

  static updatePersediaan(values, id) {
    return axios.put(`persediaans/${id}`, values)
  }

  static deletePersediaan(id) {
    return axios.delete(`persediaans/${id}`)
  }
}

export default Service
