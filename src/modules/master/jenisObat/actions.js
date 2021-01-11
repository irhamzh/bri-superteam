import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_JENIS_OBAT_LOADING,
  CREATE_JENIS_OBAT_SUCCESS,
  CREATE_JENIS_OBAT_ERROR,
  UPDATE_JENIS_OBAT_LOADING,
  UPDATE_JENIS_OBAT_SUCCESS,
  UPDATE_JENIS_OBAT_ERROR,
  DELETE_JENIS_OBAT_LOADING,
  DELETE_JENIS_OBAT_SUCCESS,
  DELETE_JENIS_OBAT_ERROR,
} from './types'

export const createJenisObat = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_JENIS_OBAT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createJenisObat(formData)
    dispatch({ type: CREATE_JENIS_OBAT_SUCCESS, isLoading: false })

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
      type: CREATE_JENIS_OBAT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateJenisObat = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_JENIS_OBAT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateJenisObat(formData, id)
    dispatch({ type: UPDATE_JENIS_OBAT_SUCCESS, isLoading: false })

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
      type: UPDATE_JENIS_OBAT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteJenisObat = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_JENIS_OBAT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteJenisObat(id)
    dispatch({ type: DELETE_JENIS_OBAT_SUCCESS, isLoading: false })

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
      type: DELETE_JENIS_OBAT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
