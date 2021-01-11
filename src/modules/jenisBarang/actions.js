import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_JENIS_BARANG_LOADING,
  CREATE_JENIS_BARANG_SUCCESS,
  CREATE_JENIS_BARANG_ERROR,
  UPDATE_JENIS_BARANG_LOADING,
  UPDATE_JENIS_BARANG_SUCCESS,
  UPDATE_JENIS_BARANG_ERROR,
  DELETE_JENIS_BARANG_LOADING,
  DELETE_JENIS_BARANG_SUCCESS,
  DELETE_JENIS_BARANG_ERROR,
} from './types'

export const createJenisBarang = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_JENIS_BARANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createJenisBarang(formData)
    dispatch({ type: CREATE_JENIS_BARANG_SUCCESS, isLoading: false })

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
      type: CREATE_JENIS_BARANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateJenisBarang = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_JENIS_BARANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateJenisBarang(formData, id)
    dispatch({ type: UPDATE_JENIS_BARANG_SUCCESS, isLoading: false })

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
      type: UPDATE_JENIS_BARANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteJenisBarang = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_JENIS_BARANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteJenisBarang(id)
    dispatch({ type: DELETE_JENIS_BARANG_SUCCESS, isLoading: false })

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
      type: DELETE_JENIS_BARANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
