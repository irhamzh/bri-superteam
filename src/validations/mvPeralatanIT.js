import * as yup from 'yup'
import validationWording from './validationWording'

const createPeralatanSchema = yup.object().shape({
  jenisPeralatan: yup.string().required(validationWording.required('jenis peralatan')),
  merk: yup.string().required(validationWording.required('merk')),
  sn: yup.string().required(validationWording.required('sn')),
  ruangan: yup.string().required(validationWording.required('ruangan')),
  kondisi: yup.string().required(validationWording.required('kondisi')),
  // keterangan: yup.string().required(validationWording.required('keterangan')),
  model: yup.string().required(validationWording.required('model')),
})

const createInfokusSchema = yup.object().shape({
  jenisPeralatan: yup.string().required(validationWording.required('jenis peralatan')),
  merk: yup.string().required(validationWording.required('merk')),
  sn: yup.string().required(validationWording.required('sn')),
  ruangan: yup.string().required(validationWording.required('ruangan')),
  kondisi: yup.string().required(validationWording.required('kondisi')),
  keterangan: yup.string().required(validationWording.required('keterangan')),
  model: yup.string().required(validationWording.required('model')),
  tanggal: yup.date().required(validationWording).required('tanggal'),
  lampTimer: yup.string().required(validationWording.required('lampTimer')),
  gantiLampu: yup.string().required(validationWording.required('gantiLampu')),
})

export { createPeralatanSchema, createInfokusSchema }
