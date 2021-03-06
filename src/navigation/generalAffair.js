import React from 'react'

// General Affair
const GeneralAffair = React.lazy(() => import('../views/GeneralAffair'))
// General Affair / Formasi
const FormasiGA = React.lazy(() => import('../views/GeneralAffair/Formasi'))
const MonitoringFormasiGA = React.lazy(() => import('../views/GeneralAffair/Formasi/Monitoring'))
const UpdateLevelFormasiGA = React.lazy(() => import('../views/GeneralAffair/Formasi/Monitoring'))
// General Affair / Data Pekerja
const DataPekerjaGA = React.lazy(() => import('../views/GeneralAffair/DataPekerja'))
const UploadDataDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/UploadData'))
const PGS_DP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/PGS'))
const KehadiranDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/Kehadiran'))
const PengobatanDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/Pengobatan'))
const RawatInapDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/RawatInap'))
const APS_DP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/APS'))
const MagangDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/Magang'))
const SMKPT_DP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/SMKPT'))
const OutsourcingDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/Outsourcing'))
const LemburDP = React.lazy(() => import('../views/GeneralAffair/DataPekerja/Lembur'))
// General Affair / Pengelola Konsumsi
const PengelolaKonsumsiGA = React.lazy(() => import('../views/GeneralAffair/PengelolaanKonsumsi'))
const WorkingOrderPK = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKonsumsi/WorkingOrder')
)
const KonsumsiKegiatanPK = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKonsumsi/KonsumsiKegiatan')
)
const KonsumsiRapatPK = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKonsumsi/KonsumsiRapat')
)
const KonsumsiSosialisasiPK = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKonsumsi/KonsumsiSosialisasi')
)
// General Affair / Pengelola Kendaraan
const PengelolaanKendaraanGA = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKendaraan')
)
const PenugasanDriver = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKendaraan/PenugasanDriver')
)
const Kendaraan = React.lazy(() => import('../views/GeneralAffair/PengelolaanKendaraan/Kendaraan'))
const BahanBakar = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKendaraan/BahanBakar')
)
const PemesananDiluarDinas = React.lazy(() =>
  import('../views/GeneralAffair/PengelolaanKendaraan/PemesananDiluar')
)
// GA / Evaluasi Klinik
const EvaluasiKlinik = React.lazy(() => import('../views/GeneralAffair/EvaluasiKlinik'))
// GA / Monitor CCTV
const MonitorCCTV = React.lazy(() => import('../views/GeneralAffair/MonitorCCTV'))
// GA / Kegiatan Lain
const KegiatanLain = React.lazy(() => import('../views/GeneralAffair/KegiatanLain'))
const P3K = React.lazy(() => import('../views/GeneralAffair/KegiatanLain/P3K'))
const RekreasiSiswa = React.lazy(() => import('../views/GeneralAffair/KegiatanLain/RekreasiSiswa'))
// GA / Aktivitas
const AktivitasGA = React.lazy(() => import('../views/GeneralAffair/Aktivitas'))
const SecurityAkv = React.lazy(() => import('../views/GeneralAffair/Aktivitas/Security'))
const DriverAkv = React.lazy(() => import('../views/GeneralAffair/Aktivitas/Driver'))
const PramubaktiKurirAkv = React.lazy(() =>
  import('../views/GeneralAffair/Aktivitas/PramubaktiKurir')
)
// GA / Anggaran
const AnggaranGA = React.lazy(() => import('../views/GeneralAffair/Anggaran'))
// GA / Persekot
const PersekotGA = React.lazy(() => import('../views/GeneralAffair/Persekot'))
const InputPersekot = React.lazy(() => import('../views/GeneralAffair/Persekot/Input'))
const PenihilanPersekot = React.lazy(() => import('../views/GeneralAffair/Persekot/Penihilan'))

const GADailyActivities = React.lazy(() => import('../views/GeneralAffair/DailyActivities'))

const generalAffair = [
  // General Affair
  {
    path: '/general-affair',
    exact: true,
    name: 'General Affair',
    component: GeneralAffair,
  },
  {
    path: '/general-affair/formasi',
    exact: true,
    name: 'Formasi',
    component: FormasiGA,
  },
  {
    path: '/general-affair/formasi/monitoring',
    exact: true,
    name: 'Monitoring Formasi',
    component: MonitoringFormasiGA,
  },
  {
    path: '/general-affair/formasi/update-level',
    exact: true,
    name: 'Update Level Jabatan',
    component: UpdateLevelFormasiGA,
  },
  // General Affair / Data Pekerja
  {
    path: '/general-affair/data-pekerja',
    exact: true,
    name: 'Data Pekerja',
    component: DataPekerjaGA,
  },
  {
    path: '/general-affair/data-pekerja/upload-data',
    exact: true,
    name: 'Upload Data Pekerja',
    component: UploadDataDP,
  },
  {
    path: '/general-affair/data-pekerja/pgs-pjs',
    exact: true,
    name: 'Input Data PGS/PJS',
    component: PGS_DP,
  },
  {
    path: '/general-affair/data-pekerja/kehadiran',
    exact: true,
    name: 'Input Data Kehadiran',
    component: KehadiranDP,
  },
  {
    path: '/general-affair/data-pekerja/pengobatan',
    exact: true,
    name: 'Input Data Reimburse Pengobatan',
    component: PengobatanDP,
  },
  {
    path: '/general-affair/data-pekerja/rawat-inap',
    exact: true,
    name: 'Input Data Pengajuan Rawat Inap',
    component: RawatInapDP,
  },
  {
    path: '/general-affair/data-pekerja/aps',
    exact: true,
    name: 'Input Data APS',
    component: APS_DP,
  },
  {
    path: '/general-affair/data-pekerja/magang-pkl',
    exact: true,
    name: 'Input Data Magang dan PKL',
    component: MagangDP,
  },
  {
    path: '/general-affair/data-pekerja/smkpt',
    exact: true,
    name: 'Input Data Sistem Manajemen Kinerja Pekerja Tetap',
    component: SMKPT_DP,
  },
  {
    path: '/general-affair/data-pekerja/outsourcing',
    exact: true,
    name: 'Input Data Penilaian Outsourcing',
    component: OutsourcingDP,
  },
  {
    path: '/general-affair/data-pekerja/lembur',
    exact: true,
    name: 'Lembur',
    component: LemburDP,
  },
  // GA / Pengelolaan Konsumsi
  {
    path: '/general-affair/pengelolaan-konsumsi',
    exact: true,
    name: 'Pengelolaan Konsumsi',
    component: PengelolaKonsumsiGA,
  },
  {
    path: '/general-affair/pengelolaan-konsumsi/working-order',
    exact: true,
    name: 'Working Order',
    component: WorkingOrderPK,
  },
  {
    path: '/general-affair/pengelolaan-konsumsi/konsumsi-kegiatan',
    exact: true,
    name: 'Konsumsi Kegiatan',
    component: KonsumsiKegiatanPK,
  },
  {
    path: '/general-affair/pengelolaan-konsumsi/konsumsi-rapat',
    exact: true,
    name: 'Konsumsi Rapat',
    component: KonsumsiRapatPK,
  },
  {
    path: '/general-affair/pengelolaan-konsumsi/konsumsi-sosialisasi',
    exact: true,
    name: 'Konsumsi Sosialisasi',
    component: KonsumsiSosialisasiPK,
  },
  // GA / Pengelolaan Kegiatan
  {
    path: '/general-affair/pengelolaan-kendaraan',
    exact: true,
    name: 'Pengelolaan Kendaraan',
    component: PengelolaanKendaraanGA,
  },
  {
    path: '/general-affair/pengelolaan-kendaraan/penugasan-driver',
    exact: true,
    name: 'Penugasan Driver',
    component: PenugasanDriver,
  },
  {
    path: '/general-affair/pengelolaan-kendaraan/kendaraan',
    exact: true,
    name: 'Kendaraan',
    component: Kendaraan,
  },
  {
    path: '/general-affair/pengelolaan-kendaraan/bahan-bakar',
    exact: true,
    name: 'Bahan Bakar',
    component: BahanBakar,
  },
  {
    path: '/general-affair/pengelolaan-kendaraan/pemesanan-diluar-dinas',
    exact: true,
    name: 'Pemesanan diluar Kendaraan Dinas',
    component: PemesananDiluarDinas,
  },
  // GA / Evaluasi Klinik
  {
    path: '/general-affair/evaluasi-klinik',
    exact: true,
    name: 'Evaluasi Klinik',
    component: EvaluasiKlinik,
  },
  // GA / Monitor CCTV
  {
    path: '/general-affair/monitor-cctv',
    exact: true,
    name: 'Monitor CCTV',
    component: MonitorCCTV,
  },
  // GA/ Kegiatan Lain
  {
    path: '/general-affair/kegiatan-lain',
    exact: true,
    name: 'Kegiatan Lainnya',
    component: KegiatanLain,
  },
  {
    path: '/general-affair/kegiatan-lain/p3k',
    exact: true,
    name: 'P3K',
    component: P3K,
  },
  {
    path: '/general-affair/kegiatan-lain/rekreasi-siswa',
    exact: true,
    name: 'Rekreasi Siswa',
    component: RekreasiSiswa,
  },
  // GA / Aktivitas
  {
    path: '/general-affair/aktivitas',
    exact: true,
    name: 'Aktivitas',
    component: AktivitasGA,
  },
  {
    path: '/general-affair/aktivitas/security',
    exact: true,
    name: 'Security',
    component: SecurityAkv,
  },
  {
    path: '/general-affair/aktivitas/driver',
    exact: true,
    name: 'Driver',
    component: DriverAkv,
  },
  {
    path: '/general-affair/aktivitas/pramubakti-kurir',
    exact: true,
    name: 'Pramubakti Khusus Kurir',
    component: PramubaktiKurirAkv,
  },
  // GA / Anggaran
  {
    path: '/general-affair/anggaran',
    exact: true,
    name: 'Anggaran',
    component: AnggaranGA,
  },
  // GA / Persekot
  {
    path: '/general-affair/persekot',
    exact: true,
    name: 'Persekot',
    component: PersekotGA,
  },
  {
    path: '/general-affair/persekot/input',
    exact: true,
    name: 'Input Persekot',
    component: InputPersekot,
  },
  {
    path: '/general-affair/persekot/penihilan',
    exact: true,
    name: 'Penihilan Persekot',
    component: PenihilanPersekot,
  },
  {
    path: '/general-affair/daily-activities',
    exact: true,
    name: 'GA Daily Activities',
    component: GADailyActivities,
  },
]

export default generalAffair
