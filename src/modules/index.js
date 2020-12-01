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
import pendidikan from './pendidikan/reducer'
import hotel from './hotel/reducer'
import generalAffairMonitorCCTV from './generalAffair/monitorCCTV/reducer'
import generalAffairEvaluasiKlinik from './generalAffair/evaluasiKlinik/reducer'
import aktivitasSecurity from './generalAffair/aktivitas/security/reducer'
import checkpoint from './master/checkpoint/reducer'
import aktivitasDriver from './generalAffair/aktivitas/driver/reducer'
import aktivitasCourier from './generalAffair/aktivitas/courier/reducer'
import area from './master/area/reducer'
import jenisObat from './master/jenisObat/reducer'
import aktivitasRekreasi from './generalAffair/aktivitas/rekreasi/reducer'
import aktivitasFirstAid from './generalAffair/aktivitas/firstAid/reducer'
import pengelolaanKonsumsi from './generalAffair/pengelolaanKonsumsi/reducer'
import penugasanDriver from './generalAffair/pengelolaanKendaraan/penugasanDriver/reducer'
import kendaraan from './master/kendaraan/reducer'
import generalAffairKendaraanLuar from './generalAffair/pengelolaanKendaraan/kendaraanLuar/reducer'
import generalAffairBahanBakar from './generalAffair/pengelolaanKendaraan/bahanBakar/reducer'
import generalAffairServiceKendaraan from './generalAffair/pengelolaanKendaraan/kendaraan/serviceKendaraan/reducer'
import generalAffairKelengkapanKendaraan from './generalAffair/pengelolaanKendaraan/kendaraan/kelengkapanKendaraan/reducer'
import generalAffairPajakKendaraan from './generalAffair/pengelolaanKendaraan/kendaraan/pajakKendaraan/reducer'
import generalAffairKirKendaraan from './generalAffair/pengelolaanKendaraan/kendaraan/kirKendaraan/reducer'

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
  pendidikan,
  hotel,
  generalAffairMonitorCCTV,
  generalAffairEvaluasiKlinik,
  aktivitasSecurity,
  checkpoint,
  aktivitasDriver,
  aktivitasCourier,
  area,
  jenisObat,
  aktivitasRekreasi,
  aktivitasFirstAid,
  pengelolaanKonsumsi,
  penugasanDriver,
  kendaraan,
  generalAffairKendaraanLuar,
  generalAffairBahanBakar,
  generalAffairServiceKendaraan,
  generalAffairKelengkapanKendaraan,
  generalAffairPajakKendaraan,
  generalAffairKirKendaraan,
})

export default rootReducer
