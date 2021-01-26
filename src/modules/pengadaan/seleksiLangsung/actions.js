import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_SELEKSI_LANGSUNG_LOADING,
  CREATE_SELEKSI_LANGSUNG_SUCCESS,
  CREATE_SELEKSI_LANGSUNG_ERROR,
  UPDATE_SELEKSI_LANGSUNG_LOADING,
  UPDATE_SELEKSI_LANGSUNG_SUCCESS,
  UPDATE_SELEKSI_LANGSUNG_ERROR,
  DELETE_SELEKSI_LANGSUNG_LOADING,
  DELETE_SELEKSI_LANGSUNG_SUCCESS,
  DELETE_SELEKSI_LANGSUNG_ERROR,
} from './types'

export const createKonsultanSeleksiLangsung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_SELEKSI_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createKonsultanSeleksiLangsung(formData)
    dispatch({ type: CREATE_SELEKSI_LANGSUNG_SUCCESS, isLoading: false })

    paramsResponse.title = 'Created'
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
      type: CREATE_SELEKSI_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateKonsultanSeleksiLangsung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_SELEKSI_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateKonsultanSeleksiLangsung(formData, id)
    dispatch({ type: UPDATE_SELEKSI_LANGSUNG_SUCCESS, isLoading: false })

    paramsResponse.title = 'Success'
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
      type: UPDATE_SELEKSI_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteKonsultanSeleksiLangsung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_SELEKSI_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteKonsultanSeleksiLangsung(id)
    dispatch({ type: DELETE_SELEKSI_LANGSUNG_SUCCESS, isLoading: false })

    paramsResponse.title = 'Success'
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
      type: DELETE_SELEKSI_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
