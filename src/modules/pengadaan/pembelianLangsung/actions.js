import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PEMBELIAN_LANGSUNG_LOADING,
  CREATE_PEMBELIAN_LANGSUNG_SUCCESS,
  CREATE_PEMBELIAN_LANGSUNG_ERROR,
  UPDATE_PEMBELIAN_LANGSUNG_LOADING,
  UPDATE_PEMBELIAN_LANGSUNG_SUCCESS,
  UPDATE_PEMBELIAN_LANGSUNG_ERROR,
  DELETE_PEMBELIAN_LANGSUNG_LOADING,
  DELETE_PEMBELIAN_LANGSUNG_SUCCESS,
  DELETE_PEMBELIAN_LANGSUNG_ERROR,
} from './types'

export const createBarangPembelianLangsung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PEMBELIAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createBarangPembelianLangsung(formData)
    dispatch({ type: CREATE_PEMBELIAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: CREATE_PEMBELIAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateBarangPembelianLangsung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PEMBELIAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateBarangPembelianLangsung(formData, id)
    dispatch({ type: UPDATE_PEMBELIAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_PEMBELIAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteBarangPembelianLangsung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PEMBELIAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteBarangPembelianLangsung(id)
    dispatch({ type: DELETE_PEMBELIAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: DELETE_PEMBELIAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
