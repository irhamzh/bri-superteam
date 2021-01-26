import * as Yup from 'yup'
import validationWording from './validationWording'

const createAssetSchema = Yup.object().shape({
  name: Yup.string().required(validationWording.required('Nama Asset')),
  information: Yup.string().required(validationWording.required('Keterangan Asset')),
})

const updateAssetSchema = Yup.object().shape({
  name: Yup.string().required(validationWording.required('Nama Asset')),
  information: Yup.string().required(validationWording.required('Keterangan Asset')),
  condition: Yup.string().required(validationWording.required('Kondisi Asset')),
})

export { createAssetSchema, updateAssetSchema }
