import React from 'react'

// Financial Admin
const FinancialAdmin = React.lazy(() => import('../views/FinancialAdmin'))
const TambahanKasFI = React.lazy(() => import('../views/FinancialAdmin/TambahanKas'))
const PaymentFI = React.lazy(() => import('../views/FinancialAdmin/Payment'))
const PersekotFI = React.lazy(() => import('../views/FinancialAdmin/Persekot'))
const LOPPersekotFI = React.lazy(() => import('../views/FinancialAdmin/Persekot/LOP'))
const DLKPersekotFI = React.lazy(() => import('../views/FinancialAdmin/Persekot/DLK'))
const UploadFI = React.lazy(() => import('../views/FinancialAdmin/Upload'))
const BrismartUploadFI = React.lazy(() => import('../views/FinancialAdmin/Upload/Brismart'))
const BrinetUploadFI = React.lazy(() => import('../views/FinancialAdmin/Upload/Brinet'))
const TitipanUploadFI = React.lazy(() => import('../views/FinancialAdmin/Upload/Titipan'))
const PaymentFIFixedAsset = React.lazy(() => import('../views/FinancialAdmin/Payment/FixedAsset'))
const PaymentFIGeneralAffair = React.lazy(() =>
  import('../views/FinancialAdmin/Payment/GeneralAffair')
)
const PaymentFIFinance = React.lazy(() => import('../views/FinancialAdmin/Payment/Finance'))
const PaymentFIProcurement = React.lazy(() => import('../views/FinancialAdmin/Payment/Procurement'))

const financialAdmin = [
  // Financial Admin
  {
    path: '/financial-admin',
    exact: true,
    name: 'Financial Admin',
    component: FinancialAdmin,
  },
  {
    path: '/financial-admin/tambahan-kas',
    exact: true,
    name: 'Tambahan Kas',
    component: TambahanKasFI,
  },
  {
    path: '/financial-admin/persekot',
    exact: true,
    name: 'Persekot',
    component: PersekotFI,
  },
  {
    path: '/financial-admin/persekot/lop',
    exact: true,
    name: 'LOP',
    component: LOPPersekotFI,
  },
  {
    path: '/financial-admin/persekot/dlk',
    exact: true,
    name: 'DLK',
    component: DLKPersekotFI,
  },
  {
    path: '/financial-admin/upload',
    exact: true,
    name: 'Upload',
    component: UploadFI,
  },
  {
    path: '/financial-admin/upload/brismart',
    exact: true,
    name: 'Brismart',
    component: BrismartUploadFI,
  },
  {
    path: '/financial-admin/upload/brinet',
    exact: true,
    name: 'Brinet',
    component: BrinetUploadFI,
  },
  {
    path: '/financial-admin/upload/titipan',
    exact: true,
    name: 'Titipan',
    component: TitipanUploadFI,
  },

  // Financial Admin - Payment
  {
    path: '/financial-admin/payment',
    exact: true,
    name: 'Payment',
    component: PaymentFI,
  },
  {
    path: '/fixed-asset/payment',
    exact: true,
    name: 'Payment',
    component: PaymentFIFixedAsset,
  },
  {
    path: '/general-affair/payment',
    exact: true,
    name: 'Payment',
    component: PaymentFIGeneralAffair,
  },
  {
    path: '/financial-admin/payment/finance',
    exact: true,
    name: 'Finance',
    component: PaymentFIFinance,
  },
  {
    path: '/procurement/payment',
    exact: true,
    name: 'Payment',
    component: PaymentFIProcurement,
  },
]

export default financialAdmin
