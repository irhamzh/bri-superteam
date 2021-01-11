import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_KENDARAAN_LUAR_LOADING,
  CREATE_KENDARAAN_LUAR_SUCCESS,
  CREATE_KENDARAAN_LUAR_ERROR,
  UPDATE_KENDARAAN_LUAR_LOADING,
  UPDATE_KENDARAAN_LUAR_SUCCESS,
  UPDATE_KENDARAAN_LUAR_ERROR,
  DELETE_KENDARAAN_LUAR_LOADING,
  DELETE_KENDARAAN_LUAR_SUCCESS,
  DELETE_KENDARAAN_LUAR_ERROR,
} from './types'

export const createGAKendaraanLuar = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_KENDARAAN_LUAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAKendaraanLuar(formData)
    dispatch({ type: CREATE_KENDARAAN_LUAR_SUCCESS, isLoading: false })

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
      type: CREATE_KENDARAAN_LUAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAKendaraanLuar = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_KENDARAAN_LUAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAKendaraanLuar(formData, id)
    dispatch({ type: UPDATE_KENDARAAN_LUAR_SUCCESS, isLoading: false })

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
      type: UPDATE_KENDARAAN_LUAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAKendaraanLuar = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_KENDARAAN_LUAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAKendaraanLuar(id)
    dispatch({ type: DELETE_KENDARAAN_LUAR_SUCCESS, isLoading: false })

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
      type: DELETE_KENDARAAN_LUAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
