import React from 'react'

const PengelolaGedung = React.lazy(() => import('../views/PengelolaGedung'))

// Pengelola Gedung
// Pengelola Gedung / Engineering
const EngineerPG = React.lazy(() => import('../views/PengelolaGedung/Engineer'))
const BasementEngineerPG = React.lazy(() => import('../views/PengelolaGedung/Engineer/Basement'))
const GedungEngineerPG = React.lazy(() => import('../views/PengelolaGedung/Engineer/Gedung'))
// Pengelola Gedung / Peralatan IT
const PeralatanITPG = React.lazy(() => import('../views/PengelolaGedung/PeralatanIT'))
const PeralatanFisik = React.lazy(() => import('../views/PengelolaGedung/PeralatanIT/Fisik'))
const PeralatanJaringan = React.lazy(() => import('../views/PengelolaGedung/PeralatanIT/Jaringan'))
// Pengelola Gedung / Kebersihan
const KebersihanPG = React.lazy(() => import('../views/PengelolaGedung/Kebersihan'))
const InnovationKB = React.lazy(() => import('../views/PengelolaGedung/Kebersihan/Innovation'))
const SmartKB = React.lazy(() => import('../views/PengelolaGedung/Kebersihan/Smart'))
const HalamanKB = React.lazy(() => import('../views/PengelolaGedung/Kebersihan/Halaman'))
const SaranaPendukungKB = React.lazy(() => import('../views/PengelolaGedung/Kebersihan/Pendukung'))
// Pengelola Gedung / Peralatan Kerja
const PeralatanKerjaPG = React.lazy(() => import('../views/PengelolaGedung/PeralatanKerja'))
const TeknisiPK = React.lazy(() => import('../views/PengelolaGedung/PeralatanKerja/Teknisi'))
const CleaningServicePK = React.lazy(() =>
  import('../views/PengelolaGedung/PeralatanKerja/CleaningService')
)

const pengelolaGedung = [
  // Pengelola Gedung
  {
    path: '/pengelola-gedung',
    exact: true,
    name: 'Pengelola Gedung',
    component: PengelolaGedung,
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
]

export default pengelolaGedung
