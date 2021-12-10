import React from 'react'

// Fixed Asset / Anggaran
const FixedAsset = React.lazy(() => import('../views/FixedAsset'))
const AnggaranFA = React.lazy(() => import('../views/FixedAsset/Anggaran'))
const EksploitasiAnggaran = React.lazy(() => import('../views/FixedAsset/Anggaran/Eksploitasi'))
const InvestasiAnggaran = React.lazy(() => import('../views/FixedAsset/Anggaran/Investasi'))
// Fixed Asset / Pengadaan
const Pengadaan = React.lazy(() => import('../views/FixedAsset/Pengadaan'))
const BarangJasa = React.lazy(() => import('../views/FixedAsset/Pengadaan/BarangJasa'))
const JasaKonsultan = React.lazy(() => import('../views/FixedAsset/Pengadaan/JasaKonsultan'))
const PurchaseOrder = React.lazy(() => import('../views/FixedAsset/Pengadaan/PurchaseOrder'))
const TandaTerima = React.lazy(() => import('../views/FixedAsset/Pengadaan/TandaTerima'))
const EvaluasiSupplier = React.lazy(() => import('../views/FixedAsset/Pengadaan/EvaluasiSupplier'))
const WorkingOrderFO = React.lazy(() => import('../views/FixedAsset/Pengadaan/WorkingOrder'))
// Fixed Asset / Aset
const Aset = React.lazy(() => import('../views/FixedAsset/Aset'))
const DaftarAset = React.lazy(() => import('../views/FixedAsset/Aset/DaftarAset'))
const KondisiAset = React.lazy(() => import('../views/FixedAsset/Aset/KondisiAset'))
const Penghapusbukuan = React.lazy(() => import('../views/FixedAsset/Aset/Penghapusbukuan'))
// Fixed Asset / Vendor
const Vendor = React.lazy(() => import('../views/FixedAsset/Vendor'))
const PengangkutanSampah = React.lazy(() => import('../views/FixedAsset/Vendor/PengangkutanSampah'))
const PestControl = React.lazy(() => import('../views/FixedAsset/Vendor/PestControl'))
const PewangiRuangan = React.lazy(() => import('../views/FixedAsset/Vendor/PewangiRuangan'))
const TanamanHias = React.lazy(() => import('../views/FixedAsset/Vendor/TanamanHias'))
const Lift = React.lazy(() => import('../views/FixedAsset/Vendor/Lift'))
const Gandola = React.lazy(() => import('../views/FixedAsset/Vendor/Gondola'))
// Fixed Asset / Persediaan
const Persediaan = React.lazy(() => import('../views/FixedAsset/Persediaan'))
const Aktivitas = React.lazy(() => import('../views/FixedAsset/Persediaan/Aktivitas'))
const Rekapitulasi = React.lazy(() => import('../views/FixedAsset/Persediaan/Rekapitulasi'))
// Fixed Asset / Persekot
const Persekot = React.lazy(() => import('../views/FixedAsset/Persekot'))
const InputPersekot = React.lazy(() => import('../views/FixedAsset/Persekot/Input'))
const PenihilanPersekot = React.lazy(() => import('../views/FixedAsset/Persekot/Penihilan'))
// Fixed Asset / Peralatan It
const PeralatanITFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT'))
const SoundFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT/Sound'))
const PrinterScannerFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT/PrinterScanner'))
const InfokusFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT/Infokus'))
const LaptopFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT/Laptop'))
const PCFA = React.lazy(() => import('../views/FixedAsset/PeralatanIT/PC'))

const FADailyActivities = React.lazy(() => import('../views/FixedAsset/DailyActivities'))


const fixedAsset = [
  // Fixed Asset
  {
    path: '/fixed-asset',
    exact: true,
    name: 'Fixed Asset',
    component: FixedAsset,
  },
  // Fixed Asset / Anggaran
  {
    path: '/fixed-asset/anggaran',
    exact: true,
    name: 'Anggaran',
    component: AnggaranFA,
  },
  {
    path: '/fixed-asset/anggaran/eksploitasi',
    exact: true,
    name: 'Eksploitasi',
    component: EksploitasiAnggaran,
  },
  {
    path: '/fixed-asset/anggaran/investasi',
    exact: true,
    name: 'Investasi',
    component: InvestasiAnggaran,
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
    path: '/fixed-asset/vendor/gondola',
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
  // Fixed Asset / Peralatan IT
  {
    path: '/fixed-asset/peralatan-it',
    exact: true,
    name: 'Peralatan IT',
    component: PeralatanITFA,
  },
  {
    path: '/fixed-asset/peralatan-it/sound',
    exact: true,
    name: 'Sound',
    component: SoundFA,
  },
  {
    path: '/fixed-asset/peralatan-it/printer-scanner',
    exact: true,
    name: 'Printer & Scanner',
    component: PrinterScannerFA,
  },
  {
    path: '/fixed-asset/peralatan-it/laptop',
    exact: true,
    name: 'Laptop',
    component: LaptopFA,
  },
  {
    path: '/fixed-asset/peralatan-it/infokus',
    exact: true,
    name: 'Peralatan IT',
    component: InfokusFA,
  },
  {
    path: '/fixed-asset/peralatan-it/pc',
    exact: true,
    name: 'PC',
    component: PCFA,
  },
  {
    path: '/fixed-asset/daily-activities',
    exact: true,
    name: 'FA Daily Activities',
    component: FADailyActivities,
  },
]

export default fixedAsset
