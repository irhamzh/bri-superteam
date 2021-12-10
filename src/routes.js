import React from 'react'

import {
  fixedAsset,
  pengelolaGedung,
  procurement,
  financialAdmin,
  generalAffair,
} from './navigation'

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const FixedAsset = React.lazy(() => import('./views/Dashboard/FixedAsset'))
const FABelumBerjalan = React.lazy(() => import('./views/Dashboard/FixedAsset/BelumBerjalan'))
const FAProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/FixedAsset/ProsesPersetujuan')
)
const FABelumSelesai = React.lazy(() => import('./views/Dashboard/FixedAsset/BelumSelesai'))
const FASelesai = React.lazy(() => import('./views/Dashboard/FixedAsset/Selesai'))
const FAApprovedProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/FixedAsset/ApprovedProsesPersetujuan')
)
const FAApprovedSelesai = React.lazy(() => import('./views/Dashboard/FixedAsset/ApprovedSelesai'))

// Procurement
const Procurement = React.lazy(() => import('./views/Dashboard/Procurement'))
const PRBelumBerjalan = React.lazy(() => import('./views/Dashboard/Procurement/BelumBerjalan'))
const PRProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/Procurement/ProsesPersetujuan')
)
const PRBelumSelesai = React.lazy(() => import('./views/Dashboard/Procurement/BelumSelesai'))
const PRSelesai = React.lazy(() => import('./views/Dashboard/Procurement/Selesai'))
const PRApprovedProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/Procurement/ApprovedProsesPersetujuan')
)
const PRApprovedSelesai = React.lazy(() => import('./views/Dashboard/Procurement/ApprovedSelesai'))

// General Affair
const GeneralAffair = React.lazy(() => import('./views/Dashboard/GeneralAffair'))
const GABelumBerjalan = React.lazy(() => import('./views/Dashboard/GeneralAffair/BelumBerjalan'))
const GAProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/GeneralAffair/ProsesPersetujuan')
)
const GABelumSelesai = React.lazy(() => import('./views/Dashboard/GeneralAffair/BelumSelesai'))
const GASelesai = React.lazy(() => import('./views/Dashboard/GeneralAffair/Selesai'))
const GAApprovedProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/GeneralAffair/ApprovedProsesPersetujuan')
)
const GAApprovedSelesai = React.lazy(() =>
  import('./views/Dashboard/GeneralAffair/ApprovedSelesai')
)

// Financial Admin
const FinancialAdmin = React.lazy(() => import('./views/Dashboard/FinancialAdmin'))
const FIBelumBerjalan = React.lazy(() => import('./views/Dashboard/FinancialAdmin/BelumBerjalan'))
const FIProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/FinancialAdmin/ProsesPersetujuan')
)
const FIBelumSelesai = React.lazy(() => import('./views/Dashboard/FinancialAdmin/BelumSelesai'))
const FISelesai = React.lazy(() => import('./views/Dashboard/FinancialAdmin/Selesai'))
const FIApprovedProsesPersetujuan = React.lazy(() =>
  import('./views/Dashboard/FinancialAdmin/ApprovedProsesPersetujuan')
)
const FIApprovedSelesai = React.lazy(() =>
  import('./views/Dashboard/FinancialAdmin/ApprovedSelesai')
)

// Master
const Role = React.lazy(() => import('./views/Master/Role'))
const Ruangan = React.lazy(() => import('./views/Master/Ruangan'))
const JenisBarang = React.lazy(() => import('./views/Master/JenisBarang'))
const JenisPC = React.lazy(() => import('./views/Master/JenisPC'))
const Provider = React.lazy(() => import('./views/Master/Provider'))
const Rekanan = React.lazy(() => import('./views/Master/Rekanan'))
const WaterMeter = React.lazy(() => import('./views/Master/WaterMeter'))
const Lantai = React.lazy(() => import('./views/Master/Lantai'))
const Item = React.lazy(() => import('./views/Master/Item'))
const Gedung = React.lazy(() => import('./views/Master/Gedung'))
const Compressor = React.lazy(() => import('./views/Master/Compressor'))
const Pompa = React.lazy(() => import('./views/Master/Pompa'))
const UnitPompa = React.lazy(() => import('./views/Master/UnitPompa'))
const JenisGedung = React.lazy(() => import('./views/Master/JenisGedung'))
const JenisRuangan = React.lazy(() => import('./views/Master/JenisRuangan'))
const Lokasi = React.lazy(() => import('./views/Master/Lokasi'))
const Catering = React.lazy(() => import('./views/Master/Catering'))
const Pendidikan = React.lazy(() => import('./views/Master/Pendidikan'))
const Hotel = React.lazy(() => import('./views/Master/Hotel'))
const Checkpoint = React.lazy(() => import('./views/Master/Checkpoint'))
const Area = React.lazy(() => import('./views/Master/Area'))
const JenisObat = React.lazy(() => import('./views/Master/JenisObat'))
const MasterKendaraan = React.lazy(() => import('./views/Master/Kendaraan'))
const Uker = React.lazy(() => import('./views/Master/Uker'))
const User = React.lazy(() => import('./views/Master/User'))
const Formasi = React.lazy(() => import('./views/Master/Formasi'))
const Pajak = React.lazy(() => import('./views/Master/Pajak'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/dashboard/fixed-asset',
    exact: true,
    name: 'Fixed Asset',
    component: FixedAsset,
  },
  {
    path: '/dashboard/fixed-asset/belum-berjalan',
    exact: true,
    name: 'Belum Berjalan',
    component: FABelumBerjalan,
  },
  {
    path: '/dashboard/fixed-asset/proses-persetujuan',
    exact: true,
    name: 'Proses Persetujuan',
    component: FAProsesPersetujuan,
  },
  {
    path: '/dashboard/fixed-asset/belum-selesai',
    exact: true,
    name: 'Belum Selesai',
    component: FABelumSelesai,
  },
  {
    path: '/dashboard/fixed-asset/selesai',
    exact: true,
    name: 'Selesai',
    component: FASelesai,
  },
  {
    path: '/dashboard/fixed-asset/approved-proses-persetujuan',
    exact: true,
    name: 'Approval oleh Wakabag (Proses Persetujuan)',
    component: FAApprovedProsesPersetujuan,
  },
  {
    path: '/dashboard/fixed-asset/approved-selesai',
    exact: true,
    name: 'Approval oleh Kabag (Kegiatan Selesai)',
    component: FAApprovedSelesai,
  },
  // Procurement
  {
    path: '/dashboard/procurement',
    exact: true,
    name: 'Procurement',
    component: Procurement,
  },
  {
    path: '/dashboard/procurement/belum-berjalan',
    exact: true,
    name: 'Belum Berjalan',
    component: PRBelumBerjalan,
  },
  {
    path: '/dashboard/procurement/proses-persetujuan',
    exact: true,
    name: 'Proses Persetujuan',
    component: PRProsesPersetujuan,
  },
  {
    path: '/dashboard/procurement/belum-selesai',
    exact: true,
    name: 'Belum Selesai',
    component: PRBelumSelesai,
  },
  {
    path: '/dashboard/procurement/selesai',
    exact: true,
    name: 'Selesai',
    component: PRSelesai,
  },
  {
    path: '/dashboard/procurement/approved-proses-persetujuan',
    exact: true,
    name: 'Approval oleh Wakabag (Proses Persetujuan)',
    component: PRApprovedProsesPersetujuan,
  },
  {
    path: '/dashboard/procurement/approved-selesai',
    exact: true,
    name: 'Approval oleh Kabag (Kegiatan Selesai)',
    component: PRApprovedSelesai,
  },

  // General Affair
  {
    path: '/dashboard/general-affair',
    exact: true,
    name: 'General Affair',
    component: GeneralAffair,
  },
  {
    path: '/dashboard/general-affair/belum-berjalan',
    exact: true,
    name: 'Belum Berjalan',
    component: GABelumBerjalan,
  },
  {
    path: '/dashboard/general-affair/proses-persetujuan',
    exact: true,
    name: 'Proses Persetujuan',
    component: GAProsesPersetujuan,
  },
  {
    path: '/dashboard/general-affair/belum-selesai',
    exact: true,
    name: 'Belum Selesai',
    component: GABelumSelesai,
  },
  {
    path: '/dashboard/general-affair/selesai',
    exact: true,
    name: 'Selesai',
    component: GASelesai,
  },
  {
    path: '/dashboard/general-affair/approved-proses-persetujuan',
    exact: true,
    name: 'Approval oleh Wa kabag (Proses Persetujuan)',
    component: GAApprovedProsesPersetujuan,
  },
  {
    path: '/dashboard/general-affair/approved-selesai',
    exact: true,
    name: 'Approval oleh Kabag (Kegiatan Selesai)',
    component: GAApprovedSelesai,
  },

  // Financial Admin
  {
    path: '/dashboard/financial-admin',
    exact: true,
    name: 'Financial Admin',
    component: FinancialAdmin,
  },
  {
    path: '/dashboard/financial-admin/belum-berjalan',
    exact: true,
    name: 'Belum Berjalan',
    component: FIBelumBerjalan,
  },
  {
    path: '/dashboard/financial-admin/proses-persetujuan',
    exact: true,
    name: 'Proses Persetujuan',
    component: FIProsesPersetujuan,
  },
  {
    path: '/dashboard/financial-admin/belum-selesai',
    exact: true,
    name: 'Belum Selesai',
    component: FIBelumSelesai,
  },
  {
    path: '/dashboard/financial-admin/selesai',
    exact: true,
    name: 'Selesai',
    component: FISelesai,
  },
  {
    path: '/dashboard/financial-admin/approved-proses-persetujuan',
    exact: true,
    name: 'Approval oleh Wakabag (Proses Persetujuan)',
    component: FIApprovedProsesPersetujuan,
  },
  {
    path: '/dashboard/financial-admin/approved-selesai',
    exact: true,
    name: 'Approval oleh Kabag (Kegiatan Selesai)',
    component: FIApprovedSelesai,
  },


  // Fixed Asset
  ...fixedAsset,
  ...pengelolaGedung,
  ...procurement,
  ...financialAdmin,
  ...generalAffair,

  // Master
  {
    path: '/master/users',
    exact: true,
    name: 'User',
    component: User,
  },
  {
    path: '/master/roles',
    name: 'Role',
    component: Role,
  },
  {
    path: '/master/rooms',
    name: 'Role',
    component: Ruangan,
  },
  {
    path: '/master/type-item',
    name: 'Jenis Barang',
    component: JenisBarang,
  },
  {
    path: '/master/type-pc',
    name: 'Jenis PC',
    component: JenisPC,
  },
  {
    path: '/master/providers',
    name: 'Provider',
    component: Provider,
  },

  {
    path: '/master/partners',
    name: 'Rekanan',
    component: Rekanan,
  },
  {
    path: '/master/water-meter',
    name: 'Water Meter',
    component: WaterMeter,
  },
  {
    path: '/master/lantai',
    name: 'Lantai',
    component: Lantai,
  },
  {
    path: '/master/item',
    name: 'Item',
    component: Item,
  },
  {
    path: '/master/gedung',
    name: 'Gedung',
    component: Gedung,
  },
  {
    path: '/master/compressor',
    name: 'Compressor',
    component: Compressor,
  },
  {
    path: '/master/pompa',
    name: 'Pompa',
    component: Pompa,
  },
  {
    path: '/master/unit-pompa',
    name: 'Unit Pompa',
    component: UnitPompa,
  },
  {
    path: '/master/building-types',
    name: 'Jenis Gedung',
    component: JenisGedung,
  },
  {
    path: '/master/room-types',
    name: 'Jenis Ruangan',
    component: JenisRuangan,
  },
  {
    path: '/master/lokasi',
    name: 'Lokasi',
    component: Lokasi,
  },
  {
    path: '/master/catering',
    name: 'Catering',
    component: Catering,
  },
  {
    path: '/master/pendidikan',
    name: 'Pendidikan',
    component: Pendidikan,
  },
  {
    path: '/master/hotel',
    name: 'Hotel',
    component: Hotel,
  },
  {
    path: '/master/checkpoint',
    name: 'Checkpoint',
    component: Checkpoint,
  },
  {
    path: '/master/area',
    name: 'Area',
    component: Area,
  },
  {
    path: '/master/jenis-obat',
    name: 'Jenis Obat',
    component: JenisObat,
  },
  {
    path: '/master/vehicles',
    name: 'Kendaraan',
    component: MasterKendaraan,
  },
  {
    path: '/master/ukers',
    name: 'Uker',
    component: Uker,
  },
  {
    path: '/master/formasi',
    name: 'Formasi',
    component: Formasi,
  },
  {
    path: '/master/pajak',
    name: 'Pajak',
    component: Pajak,
  },

]

export default routes
