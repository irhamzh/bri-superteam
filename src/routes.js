import React from 'react'
import ATK from './views/Procurement/ATK'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Role = React.lazy(() => import('./views/Master/Role'))
// Fixed Asset / Pengadaan
const Pengadaan = React.lazy(() => import('./views/FixedAsset/Pengadaan'))
const BarangJasa = React.lazy(() => import('./views/FixedAsset/Pengadaan/BarangJasa'))
const JasaKonsultan = React.lazy(() => import('./views/FixedAsset/Pengadaan/JasaKonsultan'))
const PurchaseOrder = React.lazy(() => import('./views/FixedAsset/Pengadaan/PurchaseOrder'))
const TandaTerima = React.lazy(() => import('./views/FixedAsset/Pengadaan/TandaTerima'))
const EvaluasiSupplier = React.lazy(() => import('./views/FixedAsset/Pengadaan/EvaluasiSupplier'))
const WorkingOrderFO = React.lazy(() => import('./views/FixedAsset/Pengadaan/WorkingOrder'))
// Fixed Asset / Aset
const Aset = React.lazy(() => import('./views/FixedAsset/Aset'))
const DaftarAset = React.lazy(() => import('./views/FixedAsset/Aset/DaftarAset'))
const KondisiAset = React.lazy(() => import('./views/FixedAsset/Aset/KondisiAset'))
const Penghapusbukuan = React.lazy(() => import('./views/FixedAsset/Aset/Penghapusbukuan'))
// Fixed Asset / Vendor
const Vendor = React.lazy(() => import('./views/FixedAsset/Vendor'))
const PengangkutanSampah = React.lazy(() => import('./views/FixedAsset/Vendor/PengangkutanSampah'))
const PestControl = React.lazy(() => import('./views/FixedAsset/Vendor/PestControl'))
const PewangiRuangan = React.lazy(() => import('./views/FixedAsset/Vendor/PewangiRuangan'))
const TanamanHias = React.lazy(() => import('./views/FixedAsset/Vendor/TanamanHias'))
const Lift = React.lazy(() => import('./views/FixedAsset/Vendor/Lift'))
const Gandola = React.lazy(() => import('./views/FixedAsset/Vendor/Gondola'))
// Fixed Asset / Persediaan
const Persediaan = React.lazy(() => import('./views/FixedAsset/Persediaan'))
const Aktivitas = React.lazy(() => import('./views/FixedAsset/Persediaan/Aktivitas'))
const Rekapitulasi = React.lazy(() => import('./views/FixedAsset/Persediaan/Rekapitulasi'))
// Fixed Asset / Persekot
const Persekot = React.lazy(() => import('./views/FixedAsset/Persekot'))
const InputPersekot = React.lazy(() => import('./views/FixedAsset/Persekot/Input'))
const PenihilanPersekot = React.lazy(() => import('./views/FixedAsset/Persekot/Penihilan'))

// Procurement
// Procurement / Working Order
const WorkingOrder = React.lazy(() => import('./views/Procurement/WorkingOrder'))
const KegiatanLain = React.lazy(() => import('./views/Procurement/WorkingOrder/KegiatanLain'))
const KegiatanPendidikan = React.lazy(() =>
  import('./views/Procurement/WorkingOrder/KegiatanPendidikan')
)
// Procurement / Pengadaan
const PengadaanProcurement = React.lazy(() => import('./views/Procurement/Pengadaan'))
const BarangJasaProcurement = React.lazy(() => import('./views/Procurement/Pengadaan/BarangJasa'))
const PurchaseOrderProcurement = React.lazy(() =>
  import('./views/Procurement/Pengadaan/PurchaseOrder')
)
const TandaTerimaProcurement = React.lazy(() => import('./views/Procurement/Pengadaan/TandaTerima'))
const EvaluasiProcurement = React.lazy(() => import('./views/Procurement/Pengadaan/Evaluasi'))
// Procurement / Hotel
const HotelProcurement = React.lazy(() => import('./views/Procurement/Hotel'))
const KlasifikasiHotel = React.lazy(() => import('./views/Procurement/Hotel/Klasifikasi'))
const AktivitasHotel = React.lazy(() => import('./views/Procurement/Hotel/Aktivitas'))
const EvaluasiHotel = React.lazy(() => import('./views/Procurement/Hotel/Evaluasi'))
// Procurement / Catering
const CateringProcurement = React.lazy(() => import('./views/Procurement/Catering'))
const KlasifikasiCatering = React.lazy(() => import('./views/Procurement/Catering/Klasifikasi'))
const AktivitasCatering = React.lazy(() => import('./views/Procurement/Catering/Aktivitas'))
const EvaluasiCatering = React.lazy(() => import('./views/Procurement/Catering/Evaluasi'))
// Procurement / ATK
const ATKProcurement = React.lazy(() => import('./views/Procurement/ATK'))
const KlasifikasiATK = React.lazy(() => import('./views/Procurement/ATK/Klasifikasi'))
const AktivitasATK = React.lazy(() => import('./views/Procurement/ATK/Aktivitas'))
const StockOpnameATK = React.lazy(() => import('./views/Procurement/ATK/StockOpname'))
const EvaluasiATK = React.lazy(() => import('./views/Procurement/ATK/Evaluasi'))
// Procurement / Persekot
const PersekotProcurement = React.lazy(() => import('./views/Procurement/Persekot'))
const InputPersekotProcurement = React.lazy(() => import('./views/Procurement/Persekot/Input'))
const PenihilanPersekotProcurement = React.lazy(() =>
  import('./views/Procurement/Persekot/Penihilan')
)
// Pengelola Gedung
// Pengelola Gedung / Engineering
const EngineerPG = React.lazy(() => import('./views/PengelolaGedung/Engineer'))
const BasementEngineerPG = React.lazy(() => import('./views/PengelolaGedung/Engineer/Basement'))
const GedungEngineerPG = React.lazy(() => import('./views/PengelolaGedung/Engineer/Gedung'))
// Pengelola Gedung / Peralatan IT
const PeralatanITPG = React.lazy(() => import('./views/PengelolaGedung/PeralatanIT'))
const PeralatanFisik = React.lazy(() => import('./views/PengelolaGedung/PeralatanIT/Fisik'))
const PeralatanJaringan = React.lazy(() => import('./views/PengelolaGedung/PeralatanIT/Jaringan'))
// Pengelola Gedung / Kebersihan
const KebersihanPG = React.lazy(() => import('./views/PengelolaGedung/Kebersihan'))
const InnovationKB = React.lazy(() => import('./views/PengelolaGedung/Kebersihan/Innovation'))
const SmartKB = React.lazy(() => import('./views/PengelolaGedung/Kebersihan/Smart'))
const HalamanKB = React.lazy(() => import('./views/PengelolaGedung/Kebersihan/Halaman'))
const SaranaPendukungKB = React.lazy(() => import('./views/PengelolaGedung/Kebersihan/Pendukung'))
// Pengelola Gedung / Peralatan Kerja
const PeralatanKerjaPG = React.lazy(() => import('./views/PengelolaGedung/PeralatanKerja'))
const TeknisiPK = React.lazy(() => import('./views/PengelolaGedung/PeralatanKerja/Teknisi'))
const CleaningServicePK = React.lazy(() =>
  import('./views/PengelolaGedung/PeralatanKerja/CleaningService')
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  // Fixed Asset
  {
    path: '/fixed-asset',
    exact: true,
    name: 'Fixed Asset',
    component: Pengadaan,
  },
  // Fixed Asset / Pengadaan
  {
    path: '/fixed-asset/pengadaan',
    exact: true,
    name: 'Pengadaan',
    component: Pengadaan,
  },
  {
    path: '/fixed-asset/pengadaan/barang-jasa',
    exact: true,
    name: 'Pengadaan Barang dan/atau Jasa (IT & Non IT)',
    component: BarangJasa,
  },
  {
    path: '/fixed-asset/pengadaan/jasa-konsultan',
    exact: true,
    name: 'Pengadaan Jasa Konsultan',
    component: JasaKonsultan,
  },
  {
    path: '/fixed-asset/pengadaan/purchase-order',
    exact: true,
    name: 'Purchase Order',
    component: PurchaseOrder,
  },
  {
    path: '/fixed-asset/pengadaan/tanda-terima',
    exact: true,
    name: 'Tanda Terima Barang',
    component: TandaTerima,
  },
  {
    path: '/fixed-asset/pengadaan/evaluasi-supplier',
    exact: true,
    name: 'Evaluasi Supplier',
    component: EvaluasiSupplier,
  },
  {
    path: '/fixed-asset/pengadaan/working-order',
    exact: true,
    name: 'Working Order',
    component: WorkingOrderFO,
  },
  // Fixed Asset / Aset
  {
    path: '/fixed-asset/aset',
    exact: true,
    name: 'Aset',
    component: Aset,
  },
  {
    path: '/fixed-asset/aset/daftar-aset',
    exact: true,
    name: 'Daftar Aset',
    component: DaftarAset,
  },
  {
    path: '/fixed-asset/aset/kondisi-aset',
    exact: true,
    name: 'Kondisi Aset',
    component: KondisiAset,
  },
  {
    path: '/fixed-asset/aset/penghapusbukuan-aset',
    exact: true,
    name: 'Penghapusbukuan Aset',
    component: Penghapusbukuan,
  },
  // Fixed Asset / Vendor
  {
    path: '/fixed-asset/vendor',
    exact: true,
    name: 'Vendor',
    component: Vendor,
  },
  {
    path: '/fixed-asset/vendor/pengangkutan-sampah',
    exact: true,
    name: 'Monitoring Pengangkutan Sampah',
    component: PengangkutanSampah,
  },
  {
    path: '/fixed-asset/vendor/pest-control',
    exact: true,
    name: 'Monitoring Pest Control',
    component: PestControl,
  },
  {
    path: '/fixed-asset/vendor/pewangi-ruangan',
    exact: true,
    name: 'Monitoring Pewangi Ruangan',
    component: PewangiRuangan,
  },
  {
    path: '/fixed-asset/vendor/tanaman-hias',
    exact: true,
    name: 'Monitoring Tanaman Hias',
    component: TanamanHias,
  },
  {
    path: '/fixed-asset/vendor/lift',
    exact: true,
    name: 'Monitoring Lift',
    component: Lift,
  },
  {
    path: '/fixed-asset/vendor/gandola',
    exact: true,
    name: 'Monitoring Gandola',
    component: Gandola,
  },
  // Fixed Asset / Persediaan
  {
    path: '/fixed-asset/persediaan',
    exact: true,
    name: 'Persediaan',
    component: Persediaan,
  },
  {
    path: '/fixed-asset/persediaan/aktivitas',
    exact: true,
    name: 'Aktivitas Persediaan',
    component: Aktivitas,
  },
  {
    path: '/fixed-asset/persediaan/rekapitulasi',
    exact: true,
    name: 'Rekapitulasi Persediaan',
    component: Rekapitulasi,
  },
  // Fixed Asset / Persekot
  {
    path: '/fixed-asset/persekot',
    exact: true,
    name: 'Persekot',
    component: Persekot,
  },
  {
    path: '/fixed-asset/persekot/input',
    exact: true,
    name: 'Input Persekot',
    component: InputPersekot,
  },
  {
    path: '/fixed-asset/persekot/penihilan',
    exact: true,
    name: 'Penihilan Persekot',
    component: PenihilanPersekot,
  },

  // Procurement / Working Order
  {
    path: '/procurement',
    exact: true,
    name: 'Procurement',
    component: WorkingOrder,
  },
  {
    path: '/procurement/working-order',
    exact: true,
    name: 'Working Order',
    component: WorkingOrder,
  },
  {
    path: '/procurement/working-order/kegiatan-pendidikan',
    exact: true,
    name: 'Kegiatan Pendidikan',
    component: KegiatanPendidikan,
  },
  {
    path: '/procurement/working-order/kegiatan-lain',
    exact: true,
    name: 'Kegiatan Lain',
    component: KegiatanLain,
  },

  // Procurement / Pengadaan
  {
    path: '/procurement/pengadaan',
    exact: true,
    name: 'Pengadaan',
    component: PengadaanProcurement,
  },
  {
    path: '/procurement/pengadaan/barang-jasa',
    exact: true,
    name: 'Pengadaan Barang dan Jasa',
    component: BarangJasaProcurement,
  },
  {
    path: '/procurement/pengadaan/purchase-order',
    exact: true,
    name: 'Purchase Order',
    component: PurchaseOrderProcurement,
  },
  {
    path: '/procurement/pengadaan/tanda-terima',
    exact: true,
    name: 'Tanda Terima',
    component: TandaTerimaProcurement,
  },
  {
    path: '/procurement/pengadaan/evaluasi',
    exact: true,
    name: 'Evaluasi',
    component: EvaluasiProcurement,
  },
  // Procurement / Hotel
  {
    path: '/procurement/hotel',
    exact: true,
    name: 'Hotel',
    component: HotelProcurement,
  },
  {
    path: '/procurement/hotel/klasifikasi',
    exact: true,
    name: 'Klasifikasi',
    component: KlasifikasiHotel,
  },
  {
    path: '/procurement/hotel/aktivitas',
    exact: true,
    name: 'Aktivitas',
    component: AktivitasHotel,
  },
  {
    path: '/procurement/hotel/evaluasi',
    exact: true,
    name: 'Evaluasi',
    component: EvaluasiHotel,
  },
  // Procurement / Catering
  {
    path: '/procurement/catering',
    exact: true,
    name: 'Catering',
    component: CateringProcurement,
  },
  {
    path: '/procurement/catering/klasifikasi',
    exact: true,
    name: 'Klasifikasi',
    component: KlasifikasiCatering,
  },
  {
    path: '/procurement/catering/aktivitas',
    exact: true,
    name: 'Aktivitas',
    component: AktivitasCatering,
  },
  {
    path: '/procurement/catering/evaluasi',
    exact: true,
    name: 'Evaluasi',
    component: EvaluasiCatering,
  },
  // Procurement / ATK
  {
    path: '/procurement/atk',
    exact: true,
    name: 'Catering',
    component: ATKProcurement,
  },
  {
    path: '/procurement/atk/klasifikasi',
    exact: true,
    name: 'Klasifikasi',
    component: KlasifikasiATK,
  },
  {
    path: '/procurement/atk/aktivitas',
    exact: true,
    name: 'Aktivitas',
    component: AktivitasATK,
  },
  {
    path: '/procurement/atk/stock-opname',
    exact: true,
    name: 'Stock Opname',
    component: StockOpnameATK,
  },
  {
    path: '/procurement/atk/evaluasi',
    exact: true,
    name: 'Evaluasi',
    component: EvaluasiATK,
  },
  // Procurement / Persekot
  {
    path: '/procurement/persekot',
    exact: true,
    name: 'Persekot',
    component: PersekotProcurement,
  },
  {
    path: '/procurement/persekot/input',
    exact: true,
    name: 'Input Persekot',
    component: InputPersekotProcurement,
  },
  {
    path: '/procurement/persekot/penihilan',
    exact: true,
    name: 'Penihilan Persekot',
    component: PenihilanPersekotProcurement,
  },
  // Pengelola Gedung
  {
    path: '/pengelola-gedung',
    exact: true,
    name: 'Pengelola Gedung',
    component: Pengadaan,
  },
  // Pengelola Gedung / Engineer
  {
    path: '/pengelola-gedung/engineer',
    exact: true,
    name: 'Engineer',
    component: EngineerPG,
  },
  {
    path: '/pengelola-gedung/engineer/basement',
    exact: true,
    name: 'Basement',
    component: BasementEngineerPG,
  },
  {
    path: '/pengelola-gedung/engineer/gedung',
    exact: true,
    name: 'Gedung',
    component: GedungEngineerPG,
  },
  // Pengelola Gedung / Peralatan IT
  {
    path: '/pengelola-gedung/peralatan-it',
    exact: true,
    name: 'Peralatan IT',
    component: PeralatanITPG,
  },
  {
    path: '/pengelola-gedung/peralatan-it/fisik',
    exact: true,
    name: 'Teknisi IT - Fisik',
    component: PeralatanFisik,
  },
  {
    path: '/pengelola-gedung/peralatan-it/jaringan',
    exact: true,
    name: 'Teknisi IT - Jaringan',
    component: PeralatanJaringan,
  },
  // Pengelola Gedung / Kebersihan
  {
    path: '/pengelola-gedung/kebersihan',
    exact: true,
    name: 'Kebersihan',
    component: KebersihanPG,
  },
  {
    path: '/pengelola-gedung/kebersihan/innovation-building',
    exact: true,
    name: 'Innovation Building',
    component: InnovationKB,
  },
  {
    path: '/pengelola-gedung/kebersihan/smart-building',
    exact: true,
    name: 'Smart Building',
    component: SmartKB,
  },
  {
    path: '/pengelola-gedung/kebersihan/halaman',
    exact: true,
    name: 'Halaman',
    component: HalamanKB,
  },
  {
    path: '/pengelola-gedung/kebersihan/sarana-pendukung',
    exact: true,
    name: 'Sarana Pendukung',
    component: SaranaPendukungKB,
  },
  // Pengelola Gedung / Peralatan Kerja
  {
    path: '/pengelola-gedung/peralatan-kerja',
    exact: true,
    name: 'Peralatan Kerja',
    component: PeralatanKerjaPG,
  },
  {
    path: '/pengelola-gedung/peralatan-kerja/teknisi',
    exact: true,
    name: 'Peralatan Teknisi',
    component: TeknisiPK,
  },
  {
    path: '/pengelola-gedung/peralatan-kerja/cleaning-service',
    exact: true,
    name: 'Peralatan Cleaning Service',
    component: CleaningServicePK,
  },
  {
    path: '/akun',
    exact: true,
    name: 'Account',
    component: Role,
  },
  {
    path: '/akun/role',
    name: 'Role',
    component: Role,
  },
]

export default routes
