import * as Yup from 'yup'

const roomSchema = Yup.object().shape({
  name: Yup.string().required('Nama Ruangan belum diisi'),
})

export default roomSchema
