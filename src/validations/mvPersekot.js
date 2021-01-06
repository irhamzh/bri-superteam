import * as Yup from 'yup'
import validationWording from './validationWording'

const createSchema = Yup.object().shape({
  date: Yup.date().required(validationWording.required('Tanggal')),
  name: Yup.string().required(validationWording.required('Nama Kegiatan')),
  costNominal: Yup.string().required(validationWording.required('Nominal Biaya')),
})

export default createSchema
