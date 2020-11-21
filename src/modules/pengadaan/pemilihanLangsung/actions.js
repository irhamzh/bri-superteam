import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PEMILIHAN_LANGSUNG_LOADING,
  CREATE_PEMILIHAN_LANGSUNG_SUCCESS,
  CREATE_PEMILIHAN_LANGSUNG_ERROR,
  UPDATE_PEMILIHAN_LANGSUNG_LOADING,
  UPDATE_PEMILIHAN_LANGSUNG_SUCCESS,
  UPDATE_PEMILIHAN_LANGSUNG_ERROR,
  DELETE_PEMILIHAN_LANGSUNG_LOADING,
  DELETE_PEMILIHAN_LANGSUNG_SUCCESS,
  DELETE_PEMILIHAN_LANGSUNG_ERROR,
} from './types'

export const createBarangPemilihanLangsung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PEMILIHAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createBarangPemilihanLangsung(formData)
    dispatch({ type: CREATE_PEMILIHAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: CREATE_PEMILIHAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateBarangPemilihanLangsung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PEMILIHAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateBarangPemilihanLangsung(formData, id)
    dispatch({ type: UPDATE_PEMILIHAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_PEMILIHAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteBarangPemilihanLangsung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PEMILIHAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteBarangPemilihanLangsung(id)
    dispatch({ type: DELETE_PEMILIHAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: DELETE_PEMILIHAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
