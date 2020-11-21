import * as Yup from 'yup'

const jenisBarangSchema = Yup.object().shape({
  name: Yup.string().required('Nama Jenis Barang belum diisi'),
})

export default jenisBarangSchema
