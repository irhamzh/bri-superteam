import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Role = React.lazy(() => import('./views/Master/Role'))
// Fixed Asset / Pengadaan
const Pengadaan = React.lazy(() => import('./views/FixedAsset/Pengadaan'))
const BarangJasa = React.lazy(() => import('./views/FixedAsset/Pengadaan/BarangJasa'))
const JasaKonsultan = React.lazy(() => import('./views/FixedAsset/Pengadaan/JasaKonsultan'))
const PurchaseOrder = React.lazy(() => import('./views/FixedAsset/Pengadaan/PurchaseOrder'))
const TandaTerima = React.lazy(() => import('./views/FixedAsset/Pengadaan/TandaTerima'))
const EvaluasiSupplier = React.lazy(() => import('./views/FixedAsset/Pengadaan/EvaluasiSupplier'))
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
