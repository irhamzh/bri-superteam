/* eslint-disable no-param-reassign */
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

  // Master Provider
  static getProvider(params) {
    if (!params) params = ''
    return axios.get(`providers${params}`)
  }

  static getProviderById(id) {
    return axios.get(`providers/${id}`)
  }

  static createProvider(values) {
    return axios.post('providers', values)
  }

  static updateProvider(values, id) {
    return axios.put(`providers/${id}`, values)
  }

  static deleteProvider(id) {
    return axios.delete(`providers/${id}`)
  }

  // Master Partner
  static getPartner(params) {
    return axios.get(`partners${params}`)
  }

  static getPartnerById(id) {
    return axios.get(`partners/${id}`)
  }

  static createPartner(values) {
    return axios.post('partners', values)
  }

  static updatePartner(values, id) {
    return axios.put(`partners/${id}`, values)
  }

  static deletePartner(id) {
    return axios.delete(`partners/${id}`)
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
    if (!params) params = ''
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

  // JenisBarang
  static getJenisBarang(params) {
    if (!params) params = ''
    return axios.get(`type-item${params}`)
  }

  static getJenisBarangById(id) {
    return axios.get(`type-item/${id}`)
  }

  static createJenisBarang(values) {
    return axios.post('type-item', values)
  }

  static updateJenisBarang(values, id) {
    return axios.put(`type-item/${id}`, values)
  }

  static deleteJenisBarang(id) {
    return axios.delete(`type-item/${id}`)
  }

  // Peralatan IT
  static getPeralatanIT(params) {
    return axios.get(`peralatan-it${params}`)
  }

  static getPeralatanITById(id) {
    return axios.get(`peralatan-it/${id}`)
  }

  static createPeralatanIT(values) {
    return axios.post('peralatan-it', values)
  }

  static updatePeralatanIT(values, id) {
    return axios.put(`peralatan-it/${id}`, values)
  }

  static deletePeralatanIT(id) {
    return axios.delete(`peralatan-it/${id}`)
  }

  // JenisPC
  static getJenisPC(params) {
    if (!params) params = ''
    return axios.get(`type-pc${params}`)
  }

  static getJenisPCById(id) {
    return axios.get(`type-pc/${id}`)
  }

  static createJenisPC(values) {
    return axios.post('type-pc', values)
  }

  static updateJenisPC(values, id) {
    return axios.put(`type-pc/${id}`, values)
  }

  static deleteJenisPC(id) {
    return axios.delete(`type-pc/${id}`)
  }

  // Working Order
  static getWorkingOrder(params) {
    if (!params) params = ''
    return axios.get(`working-orders${params}`)
  }

  static getWorkingOrderById(id) {
    return axios.get(`working-orders/${id}`)
  }

  static createWorkingOrder(values) {
    return axios.post('working-orders', values)
  }

  static updateWorkingOrder(values, id) {
    return axios.put(`working-orders/${id}`, values)
  }

  static deleteWorkingOrder(id) {
    return axios.delete(`working-orders/${id}`)
  }

  // Purchase Order
  static getPurchaseOrder(params) {
    if (!params) params = ''
    return axios.get(`purchase-orders${params}`)
  }

  static getPurchaseOrderById(id) {
    return axios.get(`purchase-orders/${id}`)
  }

  static createPurchaseOrder(values) {
    return axios.post('purchase-orders', values)
  }

  static updatePurchaseOrder(values, id) {
    return axios.put(`purchase-orders/${id}`, values)
  }

  static deletePurchaseOrder(id) {
    return axios.delete(`purchase-orders/${id}`)
  }

  // Tanda Terima
  static getTandaTerima(params) {
    if (!params) params = ''
    return axios.get(`tanda-terima-barang${params}`)
  }

  static getTandaTerimaById(id) {
    return axios.get(`tanda-terima-barang/${id}`)
  }

  static createTandaTerima(values) {
    return axios.post('tanda-terima-barang', values)
  }

  static updateTandaTerima(values, id) {
    return axios.put(`tanda-terima-barang/${id}`, values)
  }

  static deleteTandaTerima(id) {
    return axios.delete(`tanda-terima-barang/${id}`)
  }

  // Evaluasi Supplier
  static getEvaluasiSupplier(params) {
    if (!params) params = ''
    return axios.get(`evaluasi-suppliers${params}`)
  }

  static getEvaluasiSupplierById(id) {
    return axios.get(`evaluasi-suppliers/${id}`)
  }

  static createEvaluasiSupplier(values) {
    return axios.post('evaluasi-suppliers', values)
  }

  static updateEvaluasiSupplier(values, id) {
    return axios.put(`evaluasi-suppliers/${id}`, values)
  }

  static deleteEvaluasiSupplier(id) {
    return axios.delete(`evaluasi-suppliers/${id}`)
  }

  // Swakelola
  static getBarangSwakelola(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/barang/swakelola${params}`)
  }

  static getBarangSwakelolaById(id) {
    return axios.get(`pengadaans/barang/swakelola/${id}`)
  }

  static createBarangSwakelola(values) {
    return axios.post('pengadaans/barang/swakelola', values)
  }

  static updateBarangSwakelola(values, id) {
    return axios.put(`pengadaans/barang/swakelola/${id}`, values)
  }

  static deleteBarangSwakelola(id) {
    return axios.delete(`pengadaans/barang/swakelola/${id}`)
  }

  // Pembelian Langsung
  static getBarangPembelianLangsung(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/barang/pembelian-langsung${params}`)
  }

  static getBarangPembelianLangsungById(id) {
    return axios.get(`pengadaans/barang/pembelian-langsung/${id}`)
  }

  static createBarangPembelianLangsung(values) {
    return axios.post('pengadaans/barang/pembelian-langsung', values)
  }

  static updateBarangPembelianLangsung(values, id) {
    return axios.put(`pengadaans/barang/pembelian-langsung/${id}`, values)
  }

  static deleteBarangPembelianLangsung(id) {
    return axios.delete(`pengadaans/barang/pembelian-langsung/${id}`)
  }

  // Pemilihan Langsung
  static getBarangPenunjukanLangsung(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/barang/penunjukan-langsung${params}`)
  }

  static getBarangPenunjukanLangsungById(id) {
    return axios.get(`pengadaans/barang/penunjukan-langsung/${id}`)
  }

  static createBarangPenunjukanLangsung(values) {
    return axios.post('pengadaans/barang/penunjukan-langsung', values)
  }

  static updateBarangPenunjukanLangsung(values, id) {
    return axios.put(`pengadaans/barang/penunjukan-langsung/${id}`, values)
  }

  static deleteBarangPenunjukanLangsung(id) {
    return axios.delete(`pengadaans/barang/penunjukan-langsung/${id}`)
  }

  // Pemilihan Langsung
  static getBarangPemilihanLangsung(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/barang/pemilihan-langsung${params}`)
  }

  static getBarangPemilihanLangsungById(id) {
    return axios.get(`pengadaans/barang/pemilihan-langsung/${id}`)
  }

  static createBarangPemilihanLangsung(values) {
    return axios.post('pengadaans/barang/pemilihan-langsung', values)
  }

  static updateBarangPemilihanLangsung(values, id) {
    return axios.put(`pengadaans/barang/pemilihan-langsung/${id}`, values)
  }

  static deleteBarangPemilihanLangsung(id) {
    return axios.delete(`pengadaans/barang/pemilihan-langsung/${id}`)
  }

  // Lelang
  static getBarangLelang(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/barang/lelang${params}`)
  }

  static getBarangLelangById(id) {
    return axios.get(`pengadaans/barang/lelang/${id}`)
  }

  static createBarangLelang(values) {
    return axios.post('pengadaans/barang/lelang', values)
  }

  static updateBarangLelang(values, id) {
    return axios.put(`pengadaans/barang/lelang/${id}`, values)
  }

  static deleteBarangLelang(id) {
    return axios.delete(`pengadaans/barang/lelang/${id}`)
  }
}

export default Service
