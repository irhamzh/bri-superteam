import * as Yup from 'yup'
import validationWording from './validationWording'

const createSchema = Yup.object().shape({
  date: Yup.date().required(validationWording.required('date')),
  name: Yup.string().required(validationWording.required('name')),
  costNominal: Yup.string().required(validationWording.required('costNominal')),
})

export default createSchema
