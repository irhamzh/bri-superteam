import React from 'react'

// Procurement
// Procurement / Working Order
const WorkingOrder = React.lazy(() => import('../views/Procurement/WorkingOrder'))
const KegiatanLain = React.lazy(() => import('../views/Procurement/WorkingOrder/KegiatanLain'))
const KegiatanPendidikan = React.lazy(() =>
  import('../views/Procurement/WorkingOrder/KegiatanPendidikan')
)
// Procurement / Pengadaan
const PengadaanProcurement = React.lazy(() => import('../views/Procurement/Pengadaan'))
const BarangJasaProcurement = React.lazy(() => import('../views/Procurement/Pengadaan/BarangJasa'))
const PurchaseOrderProcurement = React.lazy(() =>
  import('../views/Procurement/Pengadaan/PurchaseOrder')
)
const TandaTerimaProcurement = React.lazy(() =>
  import('../views/Procurement/Pengadaan/TandaTerima')
)
const EvaluasiProcurement = React.lazy(() => import('../views/Procurement/Pengadaan/Evaluasi'))
// Procurement / Hotel
const HotelProcurement = React.lazy(() => import('../views/Procurement/Hotel'))
const KlasifikasiHotel = React.lazy(() => import('../views/Procurement/Hotel/Klasifikasi'))
const EvaluasiHotel = React.lazy(() => import('../views/Procurement/Hotel/Evaluasi'))
// Procurement / Catering
const CateringProcurement = React.lazy(() => import('../views/Procurement/Catering'))
const KlasifikasiCatering = React.lazy(() => import('../views/Procurement/Catering/Klasifikasi'))
const EvaluasiCatering = React.lazy(() => import('../views/Procurement/Catering/Evaluasi'))
// Procurement / ATK
const ATKProcurement = React.lazy(() => import('../views/Procurement/ATK'))
const KlasifikasiATK = React.lazy(() => import('../views/Procurement/ATK/Klasifikasi'))
const StockOpnameATK = React.lazy(() => import('../views/Procurement/ATK/StockOpname'))
const EvaluasiATK = React.lazy(() => import('../views/Procurement/ATK/Evaluasi'))
// Procurement / Persekot
const PersekotProcurement = React.lazy(() => import('../views/Procurement/Persekot'))
const InputPersekotProcurement = React.lazy(() => import('../views/Procurement/Persekot/Input'))
const PenihilanPersekotProcurement = React.lazy(() =>
  import('../views/Procurement/Persekot/Penihilan')
)

const procurement = [
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
    path: '/procurement/catering/evaluasi',
    exact: true,
    name: 'Evaluasi',
    component: EvaluasiCatering,
  },
  // Procurement / ATK
  {
    path: '/procurement/atk',
    exact: true,
    name: 'ATK',
    component: ATKProcurement,
  },
  {
    path: '/procurement/atk/klasifikasi',
    exact: true,
    name: 'Klasifikasi',
    component: KlasifikasiATK,
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
]

export default procurement
