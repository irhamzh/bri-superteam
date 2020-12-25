/* eslint-disable import/prefer-default-export */
import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  UPLOAD_ANGGARAN_EKSPLOITASI_LOADING,
  UPLOAD_ANGGARAN_EKSPLOITASI_SUCCESS,
  UPLOAD_ANGGARAN_EKSPLOITASI_ERROR,
} from './types'

export const uploadAnggaranEksploitasi = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_ANGGARAN_EKSPLOITASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadAnggaranEksploitasi(formData)
    dispatch({ type: UPLOAD_ANGGARAN_EKSPLOITASI_SUCCESS, isLoading: false })

    paramsResponse.title = 'Uploaded'
    paramsResponse.text = res.data.message
    AlertMessage.success(paramsResponse).then(() => {
      if (refresh) {
        refresh()
      } else {
        window.location.reload()
      }
    })
  } catch (err) {
    ObjError = err.response && err.response.data.message

    dispatch({
      type: UPLOAD_ANGGARAN_EKSPLOITASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
