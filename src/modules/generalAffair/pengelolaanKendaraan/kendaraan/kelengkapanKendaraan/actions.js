import Service from '../../../../../config/services'
import { AlertMessage } from '../../../../../helpers'
import {
  CREATE_KELENGKAPAN_KENDARAAN_LOADING,
  CREATE_KELENGKAPAN_KENDARAAN_SUCCESS,
  CREATE_KELENGKAPAN_KENDARAAN_ERROR,
  UPDATE_KELENGKAPAN_KENDARAAN_LOADING,
  UPDATE_KELENGKAPAN_KENDARAAN_SUCCESS,
  UPDATE_KELENGKAPAN_KENDARAAN_ERROR,
  DELETE_KELENGKAPAN_KENDARAAN_LOADING,
  DELETE_KELENGKAPAN_KENDARAAN_SUCCESS,
  DELETE_KELENGKAPAN_KENDARAAN_ERROR,
} from './types'

export const createGAKelengkapanKendaraan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_KELENGKAPAN_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAKelengkapanKendaraan(formData)
    dispatch({ type: CREATE_KELENGKAPAN_KENDARAAN_SUCCESS, isLoading: false })

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
      type: CREATE_KELENGKAPAN_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAKelengkapanKendaraan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_KELENGKAPAN_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAKelengkapanKendaraan(formData, id)
    dispatch({ type: UPDATE_KELENGKAPAN_KENDARAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_KELENGKAPAN_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAKelengkapanKendaraan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_KELENGKAPAN_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAKelengkapanKendaraan(id)
    dispatch({ type: DELETE_KELENGKAPAN_KENDARAAN_SUCCESS, isLoading: false })

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
      type: DELETE_KELENGKAPAN_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
