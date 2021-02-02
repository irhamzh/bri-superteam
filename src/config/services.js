// // /* eslint-disable no-param-reassign */
// import axios from 'axios'
// // // import { signOut } from '../modules/auth/actions'
// // // import { UNAUTHENTICATED } from '../modules/auth/types'
// import { API_URL } from './apiConfig'
// // // import configStore from './configStore'

// axios.defaults.baseURL = `${API_URL}`
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
// // // axios.interceptors.response.use(
// // //   (response) => {
// // //     return response
// //   },
// //   (error) => {
// //     if (error.response?.status === 401 && !window.location.href.includes('/login')) {
// //       window.location = '/'
// //     }

// //     return Promise.reject(error)
// //   }
// // )
import axios from '../helpers/AxiosInterceptor'
import { DefaultXios } from './axiosConfig'

class Service {
  // Authentication
  static signIn(values) {
    return DefaultXios.post('/users/login', values)
    // const { email, password } = values
    // return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  static signUp(values) {
    return axios.post('/users', values)
    // const { email, password } = values
    // return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  static verifyToken() {
    return axios.get('/users/token-data')
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

  // User
  static getUser(params) {
    if (!params) params = ''
    return axios.get(`users${params}`)
  }

  static getUserById(id) {
    return axios.get(`users/${id}`)
  }

  static createUser(values) {
    return axios.post('users', values)
  }

  static updateUser(values, id) {
    return axios.put(`users/${id}`, values)
  }

  static deleteUser(id) {
    return axios.delete(`users/${id}`)
  }

  // Role
  static getRoles(params) {
    if (!params) params = ''
    return axios.get(`roles${params}`)
  }

  static getRoleById(id) {
    return axios.get(`roles/${id}`)
  }

  static createRole(values) {
    return axios.post('roles', values)
  }

  static updateRole(values, id) {
    return axios.put(`roles/${id}`, values)
  }

  static deleteRole(id) {
    return axios.delete(`roles/${id}`)
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
    if (!params) params = ''
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

  static approvePersekot(values, id) {
    return axios.put(`persekots/${id}/approve`, values)
  }

  static penihilanPersekot(values) {
    return axios.post('persekots/penihilan', values)
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

  static uploadAsset(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }
    return axios.post('assets/excel', formData)
  }

  static penghapusbukuanAsset(values) {
    return axios.post('assets/penghapusbukuan', values)
  }

  static approveAsset(values, id) {
    return axios.put(`assets/penghapusbukuan/${id}/approve`, values)
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
    return axios.get(`monitoring-vendors${params}`)
  }

  static getVendorById(id) {
    return axios.get(`monitoring-vendors/${id}`)
  }

  static createVendor(values) {
    return axios.post('monitoring-vendors', values)
  }

  static updateVendor(values, id) {
    return axios.put(`monitoring-vendors/${id}`, values)
  }

  static deleteVendor(id) {
    return axios.delete(`monitoring-vendors/${id}`)
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

  static getKonsultanPenunjukanLangsung(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/konsultan/penunjukan-langsung${params}`)
  }

  static getKonsultanPenunjukanLangsungById(id) {
    return axios.get(`pengadaans/konsultan/penunjukan-langsung/${id}`)
  }

  static createKonsultanPenunjukanLangsung(values) {
    return axios.post('pengadaans/konsultan/penunjukan-langsung', values)
  }

  static updateKonsultanPenunjukanLangsung(values, id) {
    return axios.put(`pengadaans/konsultan/penunjukan-langsung/${id}`, values)
  }

  static deleteKonsultanPenunjukanLangsung(id) {
    return axios.delete(`pengadaans/konsultan/penunjukan-langsung/${id}`)
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

  // Seleksi Langsung
  static getKonsultanSeleksiLangsung(params) {
    if (!params) params = ''
    return axios.get(`pengadaans/konsultan/seleksi-langsung${params}`)
  }

  static getKonsultanSeleksiLangsungById(id) {
    return axios.get(`pengadaans/konsultan/seleksi-langsung/${id}`)
  }

  static createKonsultanSeleksiLangsung(values) {
    return axios.post('pengadaans/konsultan/seleksi-langsung', values)
  }

  static updateKonsultanSeleksiLangsung(values, id) {
    return axios.put(`pengadaans/konsultan/seleksi-langsung/${id}`, values)
  }

  static deleteKonsultanSeleksiLangsung(id) {
    return axios.delete(`pengadaans/konsultan/seleksi-langsung/${id}`)
  }

  // PG Peralatan IT
  static getPGPeralatanIT(params) {
    return axios.get(`pg-it-tools${params}`)
  }

  static getPGPeralatanITById(id) {
    return axios.get(`pg-it-tools/${id}`)
  }

  static createPGPeralatanIT(values) {
    return axios.post('pg-it-tools', values)
  }

  static updatePGPeralatanIT(values, id) {
    return axios.put(`pg-it-tools/${id}`, values)
  }

  static deletePGPeralatanIT(id) {
    return axios.delete(`pg-it-tools/${id}`)
  }

  // Peralatan Kerja
  static getPeralatanKerja(params) {
    return axios.get(`pg-working-tools${params}`)
  }

  static getPeralatanKerjaById(id) {
    return axios.get(`pg-working-tools/${id}`)
  }

  static createPeralatanKerja(values) {
    return axios.post('pg-working-tools', values)
  }

  static updatePeralatanKerja(values, id) {
    return axios.put(`pg-working-tools/${id}`, values)
  }

  static deletePeralatanKerja(id) {
    return axios.delete(`pg-working-tools/${id}`)
  }

  // Water Meter
  static getWaterMeter(params) {
    if (!params) params = ''
    return axios.get(`water-meters${params}`)
  }

  static getWaterMeterById(id) {
    return axios.get(`water-meters/${id}`)
  }

  static createWaterMeter(values) {
    return axios.post('water-meters', values)
  }

  static updateWaterMeter(values, id) {
    return axios.put(`water-meters/${id}`, values)
  }

  static deleteWaterMeter(id) {
    return axios.delete(`water-meters/${id}`)
  }

  // Lantai
  static getLantai(params) {
    if (!params) params = ''
    return axios.get(`floors${params}`)
  }

  static getLantaiById(id) {
    return axios.get(`floors/${id}`)
  }

  static createLantai(values) {
    return axios.post('floors', values)
  }

  static updateLantai(values, id) {
    return axios.put(`floors/${id}`, values)
  }

  static deleteLantai(id) {
    return axios.delete(`floors/${id}`)
  }

  // Item
  static getItem(params) {
    if (!params) params = ''
    return axios.get(`items${params}`)
  }

  static getItemById(id) {
    return axios.get(`items/${id}`)
  }

  static createItem(values) {
    return axios.post('items', values)
  }

  static updateItem(values, id) {
    return axios.put(`items/${id}`, values)
  }

  static deleteItem(id) {
    return axios.delete(`items/${id}`)
  }

  // Engineer Basement Water Meter
  static getEngineerBasementWM(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-basements/water-meter${params}`)
  }

  static getEngineerBasementWMById(id) {
    return axios.get(`pg-engineer-basements/water-meter/${id}`)
  }

  static createEngineerBasementWM(values) {
    return axios.post('pg-engineer-basements/water-meter', values)
  }

  static updateEngineerBasementWM(values, id) {
    return axios.put(`pg-engineer-basements/water-meter/${id}`, values)
  }

  static deleteEngineerBasementWM(id) {
    return axios.delete(`pg-engineer-basements/water-meter/${id}`)
  }

  // Engineer Basement Listrik
  static getEngineerBasementListrik(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-basements/electrify${params}`)
  }

  static getEngineerBasementListrikById(id) {
    return axios.get(`pg-engineer-basements/electrify/${id}`)
  }

  static createEngineerBasementListrik(values) {
    return axios.post('pg-engineer-basements/electrify', values)
  }

  static updateEngineerBasementListrik(values, id) {
    return axios.put(`pg-engineer-basements/electrify/${id}`, values)
  }

  static deleteEngineerBasementListrik(id) {
    return axios.delete(`pg-engineer-basements/electrify/${id}`)
  }

  // Engineer Basement STP
  static getEngineerBasementSTP(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-basements/stp${params}`)
  }

  static getEngineerBasementSTPById(id) {
    return axios.get(`pg-engineer-basements/stp/${id}`)
  }

  static createEngineerBasementSTP(values) {
    return axios.post('pg-engineer-basements/stp', values)
  }

  static updateEngineerBasementSTP(values, id) {
    return axios.put(`pg-engineer-basements/stp/${id}`, values)
  }

  static deleteEngineerBasementSTP(id) {
    return axios.delete(`pg-engineer-basements/stp/${id}`)
  }

  // Engineer Basement plumbing
  static getEngineerBasementPlumbing(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-basements/plumbing${params}`)
  }

  static getEngineerBasementPlumbingById(id) {
    return axios.get(`pg-engineer-basements/plumbing/${id}`)
  }

  static createEngineerBasementPlumbing(values) {
    return axios.post('pg-engineer-basements/plumbing', values)
  }

  static updateEngineerBasementPlumbing(values, id) {
    return axios.put(`pg-engineer-basements/plumbing/${id}`, values)
  }

  static deleteEngineerBasementPlumbing(id) {
    return axios.delete(`pg-engineer-basements/plumbing/${id}`)
  }

  // Engineer Basement AC
  static getEngineerBasementAC(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-basements/ac${params}`)
  }

  static getEngineerBasementACById(id) {
    return axios.get(`pg-engineer-basements/ac/${id}`)
  }

  static createEngineerBasementAC(values) {
    return axios.post('pg-engineer-basements/ac', values)
  }

  static updateEngineerBasementAC(values, id) {
    return axios.put(`pg-engineer-basements/ac/${id}`, values)
  }

  static deleteEngineerBasementAC(id) {
    return axios.delete(`pg-engineer-basements/ac/${id}`)
  }

  // Engineer Gedung Room
  static getEngineerGedungRoom(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-buildings/room${params}`)
  }

  static getEngineerGedungRoomById(id) {
    return axios.get(`pg-engineer-buildings/room/${id}`)
  }

  static createEngineerGedungRoom(values) {
    return axios.post('pg-engineer-buildings/room', values)
  }

  static updateEngineerGedungRoom(values, id) {
    return axios.put(`pg-engineer-buildings/room/${id}`, values)
  }

  static deleteEngineerGedungRoom(id) {
    return axios.delete(`pg-engineer-buildings/room/${id}`)
  }

  // Engineer Gedung ME
  static getEngineerGedungME(params) {
    if (!params) params = ''
    return axios.get(`pg-engineer-buildings/mechanical-electrical${params}`)
  }

  static getEngineerGedungMEById(id) {
    return axios.get(`pg-engineer-buildings/mechanical-electrical/${id}`)
  }

  static createEngineerGedungME(values) {
    return axios.post('pg-engineer-buildings/mechanical-electrical', values)
  }

  static updateEngineerGedungME(values, id) {
    return axios.put(`pg-engineer-buildings/mechanical-electrical/${id}`, values)
  }

  static deleteEngineerGedungME(id) {
    return axios.delete(`pg-engineer-buildings/mechanical-electrical/${id}`)
  }

  // Gedung
  static getGedung(params) {
    if (!params) params = ''
    return axios.get(`buildings${params}`)
  }

  static getGedungById(id) {
    return axios.get(`buildings/${id}`)
  }

  static createGedung(values) {
    return axios.post('buildings', values)
  }

  static updateGedung(values, id) {
    return axios.put(`buildings/${id}`, values)
  }

  static deleteGedung(id) {
    return axios.delete(`buildings/${id}`)
  }

  // Compressor
  static getCompressor(params) {
    if (!params) params = ''
    return axios.get(`compressors${params}`)
  }

  static getCompressorById(id) {
    return axios.get(`compressors/${id}`)
  }

  static createCompressor(values) {
    return axios.post('compressors', values)
  }

  static updateCompressor(values, id) {
    return axios.put(`compressors/${id}`, values)
  }

  static deleteCompressor(id) {
    return axios.delete(`compressors/${id}`)
  }

  // Pompa
  static getPompa(params) {
    if (!params) params = ''
    return axios.get(`pumps${params}`)
  }

  static getPompaById(id) {
    return axios.get(`pumps/${id}`)
  }

  static createPompa(values) {
    return axios.post('pumps', values)
  }

  static updatePompa(values, id) {
    return axios.put(`pumps/${id}`, values)
  }

  static deletePompa(id) {
    return axios.delete(`pumps/${id}`)
  }

  // Unit Pompa
  static getUnitPompa(params) {
    if (!params) params = ''
    return axios.get(`pump-units${params}`)
  }

  static getUnitPompaById(id) {
    return axios.get(`pump-units/${id}`)
  }

  static createUnitPompa(values) {
    return axios.post('pump-units', values)
  }

  static updateUnitPompa(values, id) {
    return axios.put(`pump-units/${id}`, values)
  }

  static deleteUnitPompa(id) {
    return axios.delete(`pump-units/${id}`)
  }

  // Jenis Gedung
  static getJenisGedung(params) {
    if (!params) params = ''
    return axios.get(`building-types${params}`)
  }

  static getJenisGedungById(id) {
    return axios.get(`building-types/${id}`)
  }

  static createJenisGedung(values) {
    return axios.post('building-types', values)
  }

  static updateJenisGedung(values, id) {
    return axios.put(`building-types/${id}`, values)
  }

  static deleteJenisGedung(id) {
    return axios.delete(`building-types/${id}`)
  }

  // Jenis Ruangan
  static getJenisRuangan(params) {
    if (!params) params = ''
    return axios.get(`room-types${params}`)
  }

  static getJenisRuanganById(id) {
    return axios.get(`room-types/${id}`)
  }

  static createJenisRuangan(values) {
    return axios.post('room-types', values)
  }

  static updateJenisRuangan(values, id) {
    return axios.put(`room-types/${id}`, values)
  }

  static deleteJenisRuangan(id) {
    return axios.delete(`room-types/${id}`)
  }

  // Lokasi
  static getLokasi(params) {
    if (!params) params = ''
    return axios.get(`locations${params}`)
  }

  static getLokasiById(id) {
    return axios.get(`locations/${id}`)
  }

  static createLokasi(values) {
    return axios.post('locations', values)
  }

  static updateLokasi(values, id) {
    return axios.put(`locations/${id}`, values)
  }

  static deleteLokasi(id) {
    return axios.delete(`locations/${id}`)
  }

  // Kebersihan Halaman
  static getKebersihanHalaman(params) {
    if (!params) params = ''
    return axios.get(`pg-sanitations/yard${params}`)
  }

  static getKebersihanHalamanById(id) {
    return axios.get(`pg-sanitations/yard/${id}`)
  }

  static createKebersihanHalaman(values) {
    return axios.post('pg-sanitations/yard', values)
  }

  static updateKebersihanHalaman(values, id) {
    return axios.put(`pg-sanitations/yard/${id}`, values)
  }

  static deleteKebersihanHalaman(id) {
    return axios.delete(`pg-sanitations/yard/${id}`)
  }

  // Kebersihan Smart
  static getKebersihanSmart(params) {
    if (!params) params = ''
    return axios.get(`pg-sanitations/smart-building${params}`)
  }

  static getKebersihanSmartById(id) {
    return axios.get(`pg-sanitations/smart-building/${id}`)
  }

  static createKebersihanSmart(values) {
    return axios.post('pg-sanitations/smart-building', values)
  }

  static updateKebersihanSmart(values, id) {
    return axios.put(`pg-sanitations/smart-building/${id}`, values)
  }

  static deleteKebersihanSmart(id) {
    return axios.delete(`pg-sanitations/smart-building/${id}`)
  }

  // Kebersihan Pendukung
  static getKebersihanPendukung(params) {
    if (!params) params = ''
    return axios.get(`pg-sanitations/sarana-pendukung${params}`)
  }

  static getKebersihanPendukungById(id) {
    return axios.get(`pg-sanitations/sarana-pendukung/${id}`)
  }

  static createKebersihanPendukung(values) {
    return axios.post('pg-sanitations/sarana-pendukung', values)
  }

  static updateKebersihanPendukung(values, id) {
    return axios.put(`pg-sanitations/sarana-pendukung/${id}`, values)
  }

  static deleteKebersihanPendukung(id) {
    return axios.delete(`pg-sanitations/sarana-pendukung/${id}`)
  }

  // Kebersihan Innovation
  static getKebersihanInnovation(params) {
    if (!params) params = ''
    return axios.get(`pg-sanitations/innovation-building${params}`)
  }

  static getKebersihanInnovationById(id) {
    return axios.get(`pg-sanitations/innovation-building/${id}`)
  }

  static createKebersihanInnovation(values) {
    return axios.post('pg-sanitations/innovation-building', values)
  }

  static updateKebersihanInnovation(values, id) {
    return axios.put(`pg-sanitations/innovation-building/${id}`, values)
  }

  static deleteKebersihanInnovation(id) {
    return axios.delete(`pg-sanitations/innovation-building/${id}`)
  }

  // Get All Pengadaan
  static getAllPengadaan(params) {
    if (!params) params = ''
    return axios.get(`pengadaans${params}`)
  }

  // Catering
  static getCatering(params) {
    if (!params) params = ''
    return axios.get(`caterings${params}`)
  }

  static getCateringById(id) {
    return axios.get(`caterings/${id}`)
  }

  static createCatering(values) {
    return axios.post('caterings', values)
  }

  static updateCatering(values, id) {
    return axios.put(`caterings/${id}`, values)
  }

  static deleteCatering(id) {
    return axios.delete(`caterings/${id}`)
  }

  // Catering
  static getPREvaluasiCatering(params) {
    if (!params) params = ''
    return axios.get(`pr-catering-evaluations${params}`)
  }

  static getPREvaluasiCateringById(id) {
    return axios.get(`pr-catering-evaluations/${id}`)
  }

  static createPREvaluasiCatering(values) {
    return axios.post('pr-catering-evaluations', values)
  }

  static updatePREvaluasiCatering(values, id) {
    return axios.put(`pr-catering-evaluations/${id}`, values)
  }

  static deletePREvaluasiCatering(id) {
    return axios.delete(`pr-catering-evaluations/${id}`)
  }

  static getPRKlasifikasiCatering(params) {
    if (!params) params = ''
    return axios.get(`pr-catering-clasifications${params}`)
  }

  static getPRKlasifikasiCateringById(id) {
    return axios.get(`pr-catering-clasifications/${id}`)
  }

  static createPRKlasifikasiCatering(values) {
    return axios.post('pr-catering-clasifications', values)
  }

  static updatePRKlasifikasiCatering(values, id) {
    return axios.put(`pr-catering-clasifications/${id}`, values)
  }

  static deletePRKlasifikasiCatering(id) {
    return axios.delete(`pr-catering-clasifications/${id}`)
  }

  // All Catering PR
  static getPRCatering(params) {
    if (!params) params = ''
    return axios.get(`pr-catering${params}`)
  }

  static getPRCateringById(id) {
    return axios.get(`pr-catering/${id}`)
  }

  static createPRCatering(values) {
    return axios.post('pr-catering', values)
  }

  static updatePRCatering(values, id) {
    return axios.put(`pr-catering/${id}`, values)
  }

  static deletePRCatering(id) {
    return axios.delete(`pr-catering/${id}`)
  }

  // ATK
  static getPREvaluasiAtk(params) {
    if (!params) params = ''
    return axios.get(`pr-atk-evaluations${params}`)
  }

  static getPREvaluasiAtkById(id) {
    return axios.get(`pr-atk-evaluations/${id}`)
  }

  static createPREvaluasiAtk(values) {
    return axios.post('pr-atk-evaluations', values)
  }

  static updatePREvaluasiAtk(values, id) {
    return axios.put(`pr-atk-evaluations/${id}`, values)
  }

  static deletePREvaluasiAtk(id) {
    return axios.delete(`pr-atk-evaluations/${id}`)
  }

  static getPRKlasifikasiAtk(params) {
    if (!params) params = ''
    return axios.get(`pr-atk-clasifications${params}`)
  }

  static getPRKlasifikasiAtkById(id) {
    return axios.get(`pr-atk-clasifications/${id}`)
  }

  static createPRKlasifikasiAtk(values) {
    return axios.post('pr-atk-clasifications', values)
  }

  static updatePRKlasifikasiAtk(values, id) {
    return axios.put(`pr-atk-clasifications/${id}`, values)
  }

  static deletePRKlasifikasiAtk(id) {
    return axios.delete(`pr-atk-clasifications/${id}`)
  }

  // All ATK
  static getPRAtk(params) {
    if (!params) params = ''
    return axios.get(`pr-atk${params}`)
  }

  static getPRAtkById(id) {
    return axios.get(`pr-atk/${id}`)
  }

  static createPRAtk(values) {
    return axios.post('pr-atk', values)
  }

  static updatePRAtk(values, id) {
    return axios.put(`pr-atk/${id}`, values)
  }

  static deletePRAtk(id) {
    return axios.delete(`pr-atk/${id}`)
  }

  static getPRStokOpnameAtk(params) {
    if (!params) params = ''
    return axios.get(`pr-atk-stock-opnames${params}`)
  }

  static getPRStokOpnameAtkById(id) {
    return axios.get(`pr-atk-stock-opnames/${id}`)
  }

  static createPRStokOpnameAtk(values) {
    return axios.post('pr-atk-stock-opnames', values)
  }

  static updatePRStokOpnameAtk(values, id) {
    return axios.put(`pr-atk-stock-opnames/${id}`, values)
  }

  static deletePRStokOpnameAtk(id) {
    return axios.delete(`pr-atk-stock-opnames/${id}`)
  }

  // Hotel
  static getPREvaluasiHotel(params) {
    if (!params) params = ''
    return axios.get(`pr-hotel-evaluations${params}`)
  }

  static getPREvaluasiHotelById(id) {
    return axios.get(`pr-hotel-evaluations/${id}`)
  }

  static createPREvaluasiHotel(values) {
    return axios.post('pr-hotel-evaluations', values)
  }

  static updatePREvaluasiHotel(values, id) {
    return axios.put(`pr-hotel-evaluations/${id}`, values)
  }

  static deletePREvaluasiHotel(id) {
    return axios.delete(`pr-hotel-evaluations/${id}`)
  }

  static getPRKlasifikasiHotel(params) {
    if (!params) params = ''
    return axios.get(`pr-hotel-clasifications${params}`)
  }

  static getPRKlasifikasiHotelById(id) {
    return axios.get(`pr-hotel-clasifications/${id}`)
  }

  static createPRKlasifikasiHotel(values) {
    return axios.post('pr-hotel-clasifications', values)
  }

  static updatePRKlasifikasiHotel(values, id) {
    return axios.put(`pr-hotel-clasifications/${id}`, values)
  }

  static deletePRKlasifikasiHotel(id) {
    return axios.delete(`pr-hotel-clasifications/${id}`)
  }

  // All hotel

  static getPRHotel(params) {
    if (!params) params = ''
    return axios.get(`pr-hotel${params}`)
  }

  static getPRHotelById(id) {
    return axios.get(`pr-hotel/${id}`)
  }

  static createPRHotel(values) {
    return axios.post('pr-hotel', values)
  }

  static updatePRHotel(values, id) {
    return axios.put(`pr-hotel/${id}`, values)
  }

  static deletePRHotel(id) {
    return axios.delete(`pr-hotel/${id}`)
  }

  // Pengadaan
  static getPREvaluasiPengadaan(params) {
    if (!params) params = ''
    return axios.get(`pr-pengadaan-evaluations${params}`)
  }

  static getPREvaluasiPengadaanById(id) {
    return axios.get(`pr-pengadaan-evaluations/${id}`)
  }

  static createPREvaluasiPengadaan(values) {
    return axios.post('pr-pengadaan-evaluations', values)
  }

  static updatePREvaluasiPengadaan(values, id) {
    return axios.put(`pr-pengadaan-evaluations/${id}`, values)
  }

  static deletePREvaluasiPengadaan(id) {
    return axios.delete(`pr-pengadaan-evaluations/${id}`)
  }

  static getPRBarangJasaPengadaan(params) {
    if (!params) params = ''
    return axios.get(`pr-pengadaan-jasa-barangs${params}`)
  }

  static getPRBarangJasaPengadaanById(id) {
    return axios.get(`pr-pengadaan-jasa-barangs/${id}`)
  }

  static createPRBarangJasaPengadaan(values) {
    return axios.post('pr-pengadaan-jasa-barangs', values)
  }

  static updatePRBarangJasaPengadaan(values, id) {
    return axios.put(`pr-pengadaan-jasa-barangs/${id}`, values)
  }

  static deletePRBarangJasaPengadaan(id) {
    return axios.delete(`pr-pengadaan-jasa-barangs/${id}`)
  }

  static getPRTandaTerimaPengadaan(params) {
    if (!params) params = ''
    return axios.get(`pr-pengadaan-tanda-terima-barangs${params}`)
  }

  static getPRTandaTerimaPengadaanById(id) {
    return axios.get(`pr-pengadaan-tanda-terima-barangs/${id}`)
  }

  static createPRTandaTerimaPengadaan(values) {
    return axios.post('pr-pengadaan-tanda-terima-barangs', values)
  }

  static updatePRTandaTerimaPengadaan(values, id) {
    return axios.put(`pr-pengadaan-tanda-terima-barangs/${id}`, values)
  }

  static deletePRTandaTerimaPengadaan(id) {
    return axios.delete(`pr-pengadaan-tanda-terima-barangs/${id}`)
  }

  static getPRPurchasePengadaan(params) {
    if (!params) params = ''
    return axios.get(`pr-pengadaan-purchase-orders${params}`)
  }

  static getPRPurchasePengadaanById(id) {
    return axios.get(`pr-pengadaan-purchase-orders/${id}`)
  }

  static createPRPurchasePengadaan(values) {
    return axios.post('pr-pengadaan-purchase-orders', values)
  }

  static updatePRPurchasePengadaan(values, id) {
    return axios.put(`pr-pengadaan-purchase-orders/${id}`, values)
  }

  static deletePRPurchasePengadaan(id) {
    return axios.delete(`pr-pengadaan-purchase-orders/${id}`)
  }

  // Pendidikan
  static getPendidikan(params) {
    if (!params) params = ''
    return axios.get(`educations${params}`)
  }

  static getPendidikanById(id) {
    return axios.get(`educations/${id}`)
  }

  static createPendidikan(values) {
    return axios.post('educations', values)
  }

  static updatePendidikan(values, id) {
    return axios.put(`educations/${id}`, values)
  }

  static deletePendidikan(id) {
    return axios.delete(`educations/${id}`)
  }

  // Hotel
  static getHotel(params) {
    if (!params) params = ''
    return axios.get(`hotels${params}`)
  }

  static getHotelById(id) {
    return axios.get(`hotels/${id}`)
  }

  static createHotel(values) {
    return axios.post('hotels', values)
  }

  static updateHotel(values, id) {
    return axios.put(`hotels/${id}`, values)
  }

  static deleteHotel(id) {
    return axios.delete(`hotels/${id}`)
  }

  // Checkpoint
  static getCheckpoint(params) {
    if (!params) params = ''
    return axios.get(`checkpoints${params}`)
  }

  static getCheckpointById(id) {
    return axios.get(`checkpoints/${id}`)
  }

  static createCheckpoint(values) {
    return axios.post('checkpoints', values)
  }

  static updateCheckpoint(values, id) {
    return axios.put(`checkpoints/${id}`, values)
  }

  static deleteCheckpoint(id) {
    return axios.delete(`checkpoints/${id}`)
  }

  // Area
  static getArea(params) {
    if (!params) params = ''
    return axios.get(`areas${params}`)
  }

  static getAreaById(id) {
    return axios.get(`areas/${id}`)
  }

  static createArea(values) {
    return axios.post('areas', values)
  }

  static updateArea(values, id) {
    return axios.put(`areas/${id}`, values)
  }

  static deleteArea(id) {
    return axios.delete(`areas/${id}`)
  }

  // Jenis Obaat
  static getJenisObat(params) {
    if (!params) params = ''
    return axios.get(`medicine-types${params}`)
  }

  static getJenisObatById(id) {
    return axios.get(`medicine-types/${id}`)
  }

  static createJenisObat(values) {
    return axios.post('medicine-types', values)
  }

  static updateJenisObat(values, id) {
    return axios.put(`medicine-types/${id}`, values)
  }

  static deleteJenisObat(id) {
    return axios.delete(`medicine-types/${id}`)
  }

  // Master Kendaraan
  static getKendaraan(params) {
    if (!params) params = ''
    return axios.get(`vehicles${params}`)
  }

  static getKendaraanById(id) {
    return axios.get(`vehicles/${id}`)
  }

  static createKendaraan(values) {
    return axios.post('vehicles', values)
  }

  static updateKendaraan(values, id) {
    return axios.put(`vehicles/${id}`, values)
  }

  static deleteKendaraan(id) {
    return axios.delete(`vehicles/${id}`)
  }

  // Master Uker
  static getUker(params) {
    if (!params) params = ''
    return axios.get(`ukers${params}`)
  }

  static getUkerById(id) {
    return axios.get(`ukers/${id}`)
  }

  static createUker(values) {
    return axios.post('ukers', values)
  }

  static updateUker(values, id) {
    return axios.put(`ukers/${id}`, values)
  }

  static deleteUker(id) {
    return axios.delete(`ukers/${id}`)
  }

  // Monitor CCTV
  static getMonitorCCTV(params) {
    if (!params) params = ''
    return axios.get(`ga-monitoring-cctvs${params}`)
  }

  static getMonitorCCTVById(id) {
    return axios.get(`ga-monitoring-cctvs/${id}`)
  }

  static createMonitorCCTV(values) {
    return axios.post('ga-monitoring-cctvs', values)
  }

  static updateMonitorCCTV(values, id) {
    return axios.put(`ga-monitoring-cctvs/${id}`, values)
  }

  static deleteMonitorCCTV(id) {
    return axios.delete(`ga-monitoring-cctvs/${id}`)
  }

  // Evaluasi Klinik
  static getEvaluasiKlinik(params) {
    if (!params) params = ''
    return axios.get(`ga-clinic-evaluations${params}`)
  }

  static getEvaluasiKlinikById(id) {
    return axios.get(`ga-clinic-evaluations/${id}`)
  }

  static createEvaluasiKlinik(values) {
    return axios.post('ga-clinic-evaluations', values)
  }

  static updateEvaluasiKlinik(values, id) {
    return axios.put(`ga-clinic-evaluations/${id}`, values)
  }

  static deleteEvaluasiKlinik(id) {
    return axios.delete(`ga-clinic-evaluations/${id}`)
  }

  // Aktivitas Security
  static getAktivitasSecurity(params) {
    if (!params) params = ''
    return axios.get(`ga-activities/security${params}`)
  }

  static getAktivitasSecurityById(id) {
    return axios.get(`ga-activities/security/${id}`)
  }

  static createAktivitasSecurity(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post('ga-activities/security', formData)
  }

  static updateAktivitasSecurity(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.put(`ga-activities/security/${id}`, formData)
  }

  static deleteAktivitasSecurity(id) {
    return axios.delete(`ga-activities/security/${id}`)
  }

  // Aktivitas Driver
  static getAktivitasDriver(params) {
    if (!params) params = ''
    return axios.get(`ga-activities/driver${params}`)
  }

  static getAktivitasDriverById(id) {
    return axios.get(`ga-activities/driver/${id}`)
  }

  static createAktivitasDriver(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post('ga-activities/driver', formData)
  }

  static updateAktivitasDriver(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.put(`ga-activities/driver/${id}`, formData)
  }

  static deleteAktivitasDriver(id) {
    return axios.delete(`ga-activities/driver/${id}`)
  }

  // Aktivitas Courier
  static getAktivitasCourier(params) {
    if (!params) params = ''
    return axios.get(`ga-activities/courier${params}`)
  }

  static getAktivitasCourierById(id) {
    return axios.get(`ga-activities/courier/${id}`)
  }

  static createAktivitasCourier(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post('ga-activities/courier', formData)
  }

  static updateAktivitasCourier(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.put(`ga-activities/courier/${id}`, formData)
  }

  static deleteAktivitasCourier(id) {
    return axios.delete(`ga-activities/courier/${id}`)
  }

  // Aktivitas First Aid
  static getAktivitasFirstAid(params) {
    if (!params) params = ''
    return axios.get(`ga-activities/first-aid-kit${params}`)
  }

  static getAktivitasFirstAidById(id) {
    return axios.get(`ga-activities/first-aid-kit/${id}`)
  }

  static createAktivitasFirstAid(values) {
    return axios.post('ga-activities/first-aid-kit', values)
  }

  static updateAktivitasFirstAid(values, id) {
    return axios.put(`ga-activities/first-aid-kit/${id}`, values)
  }

  static deleteAktivitasFirstAid(id) {
    return axios.delete(`ga-activities/first-aid-kit/${id}`)
  }

  // Aktivitas Rekreasi
  static getAktivitasRekreasi(params) {
    if (!params) params = ''
    return axios.get(`ga-activities/recreation${params}`)
  }

  static getAktivitasRekreasiById(id) {
    return axios.get(`ga-activities/recreation/${id}`)
  }

  static createAktivitasRekreasi(values) {
    return axios.post('ga-activities/recreation', values)
  }

  static updateAktivitasRekreasi(values, id) {
    return axios.put(`ga-activities/recreation/${id}`, values)
  }

  static deleteAktivitasRekreasi(id) {
    return axios.delete(`ga-activities/recreation/${id}`)
  }

  // Pengelolaan Konsumsi
  static getPengelolaanKonsumsi(params) {
    if (!params) params = ''
    return axios.get(`ga-consumption${params}`)
  }

  static getPengelolaanKonsumsiById(id) {
    return axios.get(`ga-consumption/${id}`)
  }

  static createPengelolaanKonsumsi(values) {
    return axios.post('ga-consumption', values)
  }

  static updatePengelolaanKonsumsi(values, id) {
    return axios.put(`ga-consumption/${id}`, values)
  }

  static deletePengelolaanKonsumsi(id) {
    return axios.delete(`ga-consumption/${id}`)
  }

  // Pengelolaan Kendaraan - Penugasan Driver
  static getPenugasanDriver(params) {
    if (!params) params = ''
    return axios.get(`ga-driver-assignment${params}`)
  }

  static getPenugasanDriverById(id) {
    return axios.get(`ga-driver-assignment/${id}`)
  }

  static createPenugasanDriver(values) {
    return axios.post('ga-driver-assignment', values)
  }

  static updatePenugasanDriver(values, id) {
    return axios.put(`ga-driver-assignment/${id}`, values)
  }

  static deletePenugasanDriver(id) {
    return axios.delete(`ga-driver-assignment/${id}`)
  }

  // Pengelolaan Kendaraan - Pemesanan Kendaraan Luar
  static getGAKendaraanLuar(params) {
    if (!params) params = ''
    return axios.get(`ga-external-vehicles${params}`)
  }

  static getGAKendaraanLuarById(id) {
    return axios.get(`ga-external-vehicles/${id}`)
  }

  static createGAKendaraanLuar(values) {
    return axios.post('ga-external-vehicles', values)
  }

  static updateGAKendaraanLuar(values, id) {
    return axios.put(`ga-external-vehicles/${id}`, values)
  }

  static deleteGAKendaraanLuar(id) {
    return axios.delete(`ga-external-vehicles/${id}`)
  }

  // Pengelolaan Kendaraan - Bahan Bakar
  static getGABahanBakar(params) {
    if (!params) params = ''
    return axios.get(`ga-fuel${params}`)
  }

  static getGABahanBakarById(id) {
    return axios.get(`ga-fuel/${id}`)
  }

  static createGABahanBakar(values) {
    return axios.post('ga-fuel', values)
  }

  static updateGABahanBakar(values, id) {
    return axios.put(`ga-fuel/${id}`, values)
  }

  static deleteGABahanBakar(id) {
    return axios.delete(`ga-fuel/${id}`)
  }

  // Pengelolaan Kendaraan - Service Kendaraan
  static getGAServiceKendaraan(params) {
    if (!params) params = ''
    return axios.get(`ga-vehicles/service${params}`)
  }

  static getGAServiceKendaraanById(id) {
    return axios.get(`ga-vehicles/service/${id}`)
  }

  static createGAServiceKendaraan(values) {
    return axios.post('ga-vehicles/service', values)
  }

  static updateGAServiceKendaraan(values, id) {
    return axios.put(`ga-vehicles/service/${id}`, values)
  }

  static deleteGAServiceKendaraan(id) {
    return axios.delete(`ga-vehicles/service/${id}`)
  }

  // Pengelolaan Kendaraan - Kelengkapan Kendaraan
  static getGAKelengkapanKendaraan(params) {
    if (!params) params = ''
    return axios.get(`ga-vehicles/accessories${params}`)
  }

  static getGAKelengkapanKendaraanById(id) {
    return axios.get(`ga-vehicles/accessories/${id}`)
  }

  static createGAKelengkapanKendaraan(values) {
    return axios.post('ga-vehicles/accessories', values)
  }

  static updateGAKelengkapanKendaraan(values, id) {
    return axios.put(`ga-vehicles/accessories/${id}`, values)
  }

  static deleteGAKelengkapanKendaraan(id) {
    return axios.delete(`ga-vehicles/accessories/${id}`)
  }

  // Pengelolaan Kendaraan - Pajak Kendaraan
  static getGAPajakKendaraan(params) {
    if (!params) params = ''
    return axios.get(`ga-vehicles/tax${params}`)
  }

  static getGAPajakKendaraanById(id) {
    return axios.get(`ga-vehicles/tax/${id}`)
  }

  static createGAPajakKendaraan(values) {
    return axios.post('ga-vehicles/tax', values)
  }

  static updateGAPajakKendaraan(values, id) {
    return axios.put(`ga-vehicles/tax/${id}`, values)
  }

  static deleteGAPajakKendaraan(id) {
    return axios.delete(`ga-vehicles/tax/${id}`)
  }

  // Pengelolaan Kendaraan - KIR Kendaraan
  static getGAKirKendaraan(params) {
    if (!params) params = ''
    return axios.get(`ga-vehicles/kir${params}`)
  }

  static getGAKirKendaraanById(id) {
    return axios.get(`ga-vehicles/kir/${id}`)
  }

  static createGAKirKendaraan(values) {
    return axios.post('ga-vehicles/kir', values)
  }

  static updateGAKirKendaraan(values, id) {
    return axios.put(`ga-vehicles/kir/${id}`, values)
  }

  static deleteGAKirKendaraan(id) {
    return axios.delete(`ga-vehicles/kir/${id}`)
  }

  // Data Pekerja - Upload data pekerja
  static getGAPekerja(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/employee${params}`)
  }

  static getGAPekerjaById(id) {
    return axios.get(`ga-employees/employee/${id}`)
  }

  static createGAPekerja(values) {
    return axios.post('ga-employees/employee', values)
  }

  static updateGAPekerja(values, id) {
    return axios.put(`ga-employees/employee/${id}`, values)
  }

  static deleteGAPekerja(id) {
    return axios.delete(`ga-employees/employee/${id}`)
  }

  static uploadGAPekerja(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`ga-employees/employee/excel`, formData)
  }

  // Data Pekerja - PGS PJS
  static getGAPgsPjs(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/pgspjs${params}`)
  }

  static getGAPgsPjsById(id) {
    return axios.get(`ga-employees/pgspjs/${id}`)
  }

  static createGAPgsPjs(values) {
    return axios.post('ga-employees/pgspjs', values)
  }

  static updateGAPgsPjs(values, id) {
    return axios.put(`ga-employees/pgspjs/${id}`, values)
  }

  static deleteGAPgsPjs(id) {
    return axios.delete(`ga-employees/pgspjs/${id}`)
  }

  // Data Pekerja - Kehadiran
  static getGAKehadiran(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/attendance${params}`)
  }

  static getGAKehadiranById(id) {
    return axios.get(`ga-employees/attendance/${id}`)
  }

  static createGAKehadiran(values) {
    return axios.post('ga-employees/attendance', values)
  }

  static updateGAKehadiran(values, id) {
    return axios.put(`ga-employees/attendance/${id}`, values)
  }

  static deleteGAKehadiran(id) {
    return axios.delete(`ga-employees/attendance/${id}`)
  }

  static uploadGAKehadiran(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`ga-employees/attendance/excel`, formData)
  }

  // Data Pekerja - APS
  static getGAAps(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/aps${params}`)
  }

  static getGAApsById(id) {
    return axios.get(`ga-employees/aps/${id}`)
  }

  static createGAAps(values) {
    return axios.post('ga-employees/aps', values)
  }

  static updateGAAps(values, id) {
    return axios.put(`ga-employees/aps/${id}`, values)
  }

  static deleteGAAps(id) {
    return axios.delete(`ga-employees/aps/${id}`)
  }

  // Data Pekerja - Internship
  static getGAInternship(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/internship${params}`)
  }

  static getGAInternshipById(id) {
    return axios.get(`ga-employees/internship/${id}`)
  }

  static createGAInternship(values) {
    return axios.post('ga-employees/internship', values)
  }

  static updateGAInternship(values, id) {
    return axios.put(`ga-employees/internship/${id}`, values)
  }

  static deleteGAInternship(id) {
    return axios.delete(`ga-employees/internship/${id}`)
  }

  // Data Pekerja - Lembur
  static getGALembur(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/overtime${params}`)
  }

  static getGALemburById(id) {
    return axios.get(`ga-employees/overtime/${id}`)
  }

  static createGALembur(values) {
    return axios.post('ga-employees/overtime', values)
  }

  static updateGALembur(values, id) {
    return axios.put(`ga-employees/overtime/${id}`, values)
  }

  static deleteGALembur(id) {
    return axios.delete(`ga-employees/overtime/${id}`)
  }

  // Data Pekerja - Formasi
  static getFormasi(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/formation${params}`)
  }

  static getFormasiById(id) {
    return axios.get(`ga-employees/formation/${id}`)
  }

  static createFormasi(values) {
    return axios.post('ga-employees/formation', values)
  }

  static updateFormasi(values, id) {
    return axios.put(`ga-employees/formation/${id}`, values)
  }

  static deleteFormasi(id) {
    return axios.delete(`ga-employees/formation/${id}`)
  }

  // General Affair - Penilaian Outsourcing

  static getGAPenilaianOutsourcing(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/outsourcing/formated${params}`)
  }

  static getGAPenilaianOutsourcingById(id) {
    return axios.get(`ga-employees/outsourcing/${id}`)
  }

  static createGAPenilaianOutsourcing(values) {
    return axios.post('ga-employees/outsourcing', values)
  }

  static updateGAPenilaianOutsourcing(values, id) {
    return axios.put(`ga-employees/outsourcing/${id}`, values)
  }

  static deleteGAPenilaianOutsourcing(id) {
    return axios.delete(`ga-employees/outsourcing/${id}`)
  }

  static uploadGAPenilaianOutsourcing(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`ga-employees/outsourcing/excel`, formData)
  }

  // General Affair - SMKPT

  static getGASmkpt(params) {
    if (!params) params = ''
    return axios.get(`ga-employees/performance-management/formated${params}`)
  }

  static getGASmkptById(id) {
    return axios.get(`ga-employees/performance-management/${id}`)
  }

  static createGASmkpt(values) {
    return axios.post('ga-employees/performance-management', values)
  }

  static updateGASmkpt(values, id) {
    return axios.put(`ga-employees/performance-management/${id}`, values)
  }

  static deleteGASmkpt(id) {
    return axios.delete(`ga-employees/performance-management/${id}`)
  }

  static uploadGASmkpt(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`ga-employees/performance-management/excel`, formData)
  }

  // General Affair - Anggaran

  static getGAAnggaran(params) {
    if (!params) params = ''
    return axios.get(`ga-budgets${params}`)
  }

  static getGAAnggaranById(id) {
    return axios.get(`ga-budgets/${id}`)
  }

  static createGAAnggaran(values) {
    return axios.post('ga-budgets', values)
  }

  static updateGAAnggaran(values, id) {
    return axios.put(`ga-budgets/${id}`, values)
  }

  static deleteGAAnggaran(values, id) {
    return axios.post(`ga-budgets/penggunaan/delete/${id}`, values)
  }

  // Dashboard
  static getDashboardProcurement(params) {
    if (!params) params = ''
    return axios.get(`/pr-pengadaan-jasa-barangs/dashboard${params}`)
  }

  static getFullProcurement(params) {
    if (!params) params = ''
    return axios.get(`/pr-pengadaan-jasa-barangs/full${params}`)
  }

  static getDashboardFixedAsset(params) {
    if (!params) params = ''
    return axios.get(`/pengadaans/dashboard${params}`)
  }

  static getFullFixedAsset(params) {
    if (!params) params = ''
    return axios.get(`/pengadaans/full${params}`)
  }

  static getDashboardGeneralAffair(params) {
    if (!params) params = ''
    return axios.get(`/working-orders/dashboard${params}`)
  }

  static getFullGeneralAffair(params) {
    if (!params) params = ''
    return axios.get(`/working-orders${params}`)
  }

  static getDashboardFinancialAdmin(params) {
    if (!params) params = ''
    return axios.get(`/fa-payments/dashboard${params}`)
  }

  static getFullFinancialAdmin(params) {
    if (!params) params = ''
    return axios.get(`/fa-payments${params}`)
  }

  // Approval - Fixed Asset
  static approveProcessFixedAsset(id) {
    return axios.put(`/pengadaans/${id}/approve-process`, { id })
  }

  static approveWabagFixedAsset(id) {
    return axios.put(`/pengadaans/${id}/approve-wabag`, { id })
  }

  static approveKabagFixedAsset(id) {
    return axios.put(`/pengadaans/${id}/approve-kabag`, { id })
  }

  static approveFinishFixedAsset(id) {
    return axios.put(`/pengadaans/${id}/finish`, { id })
  }

  // Approval - Procurement
  static approveProcessProcurement(id) {
    return axios.put(`/pr-pengadaan-jasa-barangs/${id}/approve-process`)
  }

  static approveWabagProcurement(id) {
    return axios.put(`/pr-pengadaan-jasa-barangs/${id}/approve-wabag`)
  }

  static approveKabagProcurement(id) {
    return axios.put(`/pr-pengadaan-jasa-barangs/${id}/approve-kabag`)
  }

  static approveFinishProcurement(id) {
    return axios.put(`/pr-pengadaan-jasa-barangs/${id}/finish`)
  }

  // Approval - General Admin
  static approveProcessGeneralAffair(id) {
    return axios.put(`/working-orders/${id}/approve-process`)
  }

  static approveWabagGeneralAffair(id) {
    return axios.put(`/working-orders/${id}/approve-wabag`)
  }

  static approveKabagGeneralAffair(id) {
    return axios.put(`/working-orders/${id}/approve-kabag`)
  }

  static approveFinishGeneralAffair(id) {
    return axios.put(`/working-orders/${id}/finish`)
  }

  // Approval - Financial Admin
  static approveProcessFinancialAdmin(id) {
    return axios.put(`/fa-payments/${id}/approve-process`)
  }

  static approveWabagFinancialAdmin(id) {
    return axios.put(`/fa-payments/${id}/approve-wabag`)
  }

  static approveKabagFinancialAdmin(id) {
    return axios.put(`/fa-payments/${id}/approve-kabag`)
  }

  static approveFinishFinancialAdmin(id) {
    return axios.put(`/fa-payments/${id}/finish`)
  }

  // Financial Admin
  static getFITambahanKas(params) {
    if (!params) params = ''
    return axios.get(`fa-cashes${params}`)
  }

  static getFITambahanKasById(id) {
    return axios.get(`fa-cashes/${id}`)
  }

  static createFITambahanKas(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.post('fa-cashes', formData)
  }

  static updateFITambahanKas(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.put(`fa-cashes/${id}`, formData)
  }

  static deleteFITambahanKas(id) {
    return axios.delete(`fa-cashes/${id}`)
  }

  // Financial Admin - payment

  static getFIPayment(params) {
    if (!params) params = ''
    return axios.get(`fa-payments${params}`)
  }

  static getFIPaymentById(id) {
    return axios.get(`fa-payments/${id}`)
  }

  static createFIPayment(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.post('fa-payments', formData)
  }

  static updateFIPayment(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.put(`fa-payments/${id}`, formData)
  }

  static deleteFIPayment(id) {
    return axios.delete(`fa-payments/${id}`)
  }

  static penihilanFIPayment(values) {
    return axios.post('fa-payments/penihilan', values)
  }

  static approveFIPayment(values, id) {
    return axios.put(`fa-payments/penihilan/${id}/approve`, values)
  }

  // Financial Admin - Upload

  static getFIUpload(params) {
    if (!params) params = ''
    return axios.get(`fa-uploads${params}`)
  }

  static getFIUploadById(id) {
    return axios.get(`fa-uploads/${id}`)
  }

  static createFIUpload(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.post('fa-uploads', formData)
  }

  static updateFIUpload(values, id) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])

      if (name === 'lampiran' && values[name].length > 0) {
        values[name].forEach((item) => formData.append(name, item))
      }
    }

    return axios.put(`fa-uploads/${id}`, formData)
  }

  static deleteFIUpload(id) {
    return axios.delete(`fa-uploads/${id}`)
  }

  // Anggaran

  static getAnggaranEksploitasi(params) {
    if (!params) params = ''
    return axios.get(`fa-anggaran-exploitations${params}`)
  }

  static getAnggaranEksploitasiById(id) {
    return axios.get(`fa-anggaran-exploitations/${id}`)
  }

  static uploadAnggaranEksploitasi(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`fa-anggaran-exploitations/excel`, formData)
  }

  static getAnggaranInvestasi(params) {
    if (!params) params = ''
    return axios.get(`fa-anggaran-investations${params}`)
  }

  static getAnggaranInvestasiById(id) {
    return axios.get(`fa-anggaran-investations/${id}`)
  }

  static uploadAnggaranInvestasi(values) {
    const formData = new FormData()
    const keys = Object.keys(values)
    for (let i = 0; i < keys.length; i += 1) {
      const name = keys[i]
      formData.append(name, values[name])
    }

    return axios.post(`fa-anggaran-investations/excel`, formData)
  }

  static getFXAnggaran(params) {
    if (!params) params = ''
    return axios.get(`fx-budgets${params}`)
  }

  static getFXAnggaranById(id) {
    return axios.get(`fx-budgets/${id}`)
  }

  static createFXAnggaran(values) {
    return axios.post('fx-budgets', values)
  }

  static updateFXAnggaran(values, id) {
    return axios.put(`fx-budgets/${id}`, values)
  }

  static deleteFXAnggaran(values, id) {
    return axios.post(`fx-budgets/penggunaan/delete/${id}`, values)
  }
}

export default Service
