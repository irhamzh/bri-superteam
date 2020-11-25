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
}

export default Service
