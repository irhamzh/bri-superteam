import * as yup from 'yup'
import validationWording from './validationWording'

const createPeralatanSchema = yup.object().shape({
  jenisPeralatan: yup.string().required(validationWording.required('Jenis Peralatan')),
  merk: yup.string().required(validationWording.required('Merk')),
  sn: yup.string().required(validationWording.required('SN')),
  ruangan: yup.string().required(validationWording.required('Ruangan')),
  kondisi: yup.string().required(validationWording.required('Kondisi')),
  // keterangan: yup.string().required(validationWording.required('keterangan')),
  model: yup.string().required(validationWording.required('Model')),
})

const createInfokusSchema = yup.object().shape({
  jenisPeralatan: yup.string().required(validationWording.required('Jenis Peralatan')),
  merk: yup.string().required(validationWording.required('Merk')),
  sn: yup.string().required(validationWording.required('SN')),
  ruangan: yup.string().required(validationWording.required('Ruangan')),
  kondisi: yup.string().required(validationWording.required('Kondisi')),
  keterangan: yup.string().required(validationWording.required('Keterangan')),
  model: yup.string().required(validationWording.required('Model')),
  tanggal: yup.date().required(validationWording).required('Tanggal'),
  lampTimer: yup.string().required(validationWording.required('Lamp Timer')),
  gantiLampu: yup.string().required(validationWording.required('Ganti Lampu')),
})

export { createPeralatanSchema, createInfokusSchema }
