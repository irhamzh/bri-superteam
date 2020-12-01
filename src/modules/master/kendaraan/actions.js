import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_KENDARAAN_LOADING,
  CREATE_KENDARAAN_SUCCESS,
  CREATE_KENDARAAN_ERROR,
  UPDATE_KENDARAAN_LOADING,
  UPDATE_KENDARAAN_SUCCESS,
  UPDATE_KENDARAAN_ERROR,
  DELETE_KENDARAAN_LOADING,
  DELETE_KENDARAAN_SUCCESS,
  DELETE_KENDARAAN_ERROR,
} from './types'

export const createKendaraan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createKendaraan(formData)
    dispatch({ type: CREATE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: CREATE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateKendaraan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateKendaraan(formData, id)
    dispatch({ type: UPDATE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteKendaraan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteKendaraan(id)
    dispatch({ type: DELETE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: DELETE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
