import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import roleReducer from './master/role/reducer'
import profesiReducer from './master/profesi/reducer'
import persekotReducer from './persekot/reducer'
import assetReducer from './asset/reducer'
import roomReducer from './room/reducer'
import vendorReducer from './vendor/reducer'
import persediaanReducer from './persediaan/reducer'
import jenisBarangReducer from './jenisBarang/reducer'
import peralatanItReducer from './peralatan-it/reducer'
import jenisPCReducer from './jenisPC/reducer'
import workingOrderReducer from './workingOrder/reducer'
import purchaseOrderReducer from './purchaseOrder/reducer'
import tandaTerimaReducer from './tandaTerima/reducer'
import evaluasiSupplierReducer from './evaluasiSuplier/reducer'
import providerReducer from './provider/reducer'
import barangSwakelolaReducer from './pengadaan/swakelola/reducer'
import barangPembelianLangsungReducer from './pengadaan/pembelianLangsung/reducer'
import barangPenunjukanLangsungReducer from './pengadaan/penunjukanLangsung/reducer'
import barangPemilihanLangsungReducer from './pengadaan/pemilihanLangsung/reducer'
import barangLelangReducer from './pengadaan/lelang/reducer'
import konsultanSeleksiLangsung from './pengadaan/seleksiLangsung/reducer'
import partnerReducer from './partners/reducer'
import peralatanKerja from './peralatankerja/reducer'
import waterMeter from './waterMeter/reducer'
import lantai from './lantai/reducer'
import item from './item/reducer'
import engineer from './engineer/reducer'
import gedung from './gedung/reducer'
import compressor from './compressor/reducer'
import pompa from './pompa/reducer'
import unitPompa from './unitPompa/reducer'
import jenisGedung from './jenisGedung/reducer'
import jenisRuangan from './jenisRuangan/reducer'
import kebersihan from './kebersihan/reducer'
import lokasi from './lokasi/reducer'
import catering from './catering/reducer'
import procurementCatering from './procurement/catering/reducer'
import procurementAtk from './procurement/atk/reducer'
import procurementHotel from './procurement/hotel/reducer'
import procurementPengadaan from './procurement/pengadaan/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  profesi: profesiReducer,
  persekot: persekotReducer,
  asset: assetReducer,
  room: roomReducer,
  provider: providerReducer,
  vendor: vendorReducer,
  persediaan: persediaanReducer,
  jenisBarang: jenisBarangReducer,
  peralatanIt: peralatanItReducer,
  jenisPC: jenisPCReducer,
  workingOrder: workingOrderReducer,
  purchaseOrder: purchaseOrderReducer,
  tandaTerima: tandaTerimaReducer,
  evaluasiSupplier: evaluasiSupplierReducer,
  barangSwakelola: barangSwakelolaReducer,
  barangPembelianLangsung: barangPembelianLangsungReducer,
  barangPenunjukanLangsung: barangPenunjukanLangsungReducer,
  barangPemilihanLangsung: barangPemilihanLangsungReducer,
  barangLelang: barangLelangReducer,
  konsultanSeleksiLangsung,
  partner: partnerReducer,
  waterMeter,
  peralatanKerja,
  lantai,
  item,
  engineer,
  gedung,
  compressor,
  pompa,
  unitPompa,
  jenisGedung,
  jenisRuangan,
  kebersihan,
  lokasi,
  catering,
  procurementCatering,
  procurementAtk,
  procurementHotel,
  procurementPengadaan,
})

export default rootReducer
