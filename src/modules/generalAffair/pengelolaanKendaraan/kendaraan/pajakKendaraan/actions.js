import Service from '../../../../../config/services'
import { AlertMessage } from '../../../../../helpers'
import {
  CREATE_PAJAK_KENDARAAN_LOADING,
  CREATE_PAJAK_KENDARAAN_SUCCESS,
  CREATE_PAJAK_KENDARAAN_ERROR,
  UPDATE_PAJAK_KENDARAAN_LOADING,
  UPDATE_PAJAK_KENDARAAN_SUCCESS,
  UPDATE_PAJAK_KENDARAAN_ERROR,
  DELETE_PAJAK_KENDARAAN_LOADING,
  DELETE_PAJAK_KENDARAAN_SUCCESS,
  DELETE_PAJAK_KENDARAAN_ERROR,
} from './types'

export const createGAPajakKendaraan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PAJAK_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAPajakKendaraan(formData)
    dispatch({ type: CREATE_PAJAK_KENDARAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PAJAK_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAPajakKendaraan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PAJAK_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAPajakKendaraan(formData, id)
    dispatch({ type: UPDATE_PAJAK_KENDARAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PAJAK_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAPajakKendaraan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PAJAK_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAPajakKendaraan(id)
    dispatch({ type: DELETE_PAJAK_KENDARAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PAJAK_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
