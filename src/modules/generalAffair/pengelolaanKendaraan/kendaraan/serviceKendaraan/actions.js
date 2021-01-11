import Service from '../../../../../config/services'
import { AlertMessage } from '../../../../../helpers'
import {
  CREATE_SERVICE_KENDARAAN_LOADING,
  CREATE_SERVICE_KENDARAAN_SUCCESS,
  CREATE_SERVICE_KENDARAAN_ERROR,
  UPDATE_SERVICE_KENDARAAN_LOADING,
  UPDATE_SERVICE_KENDARAAN_SUCCESS,
  UPDATE_SERVICE_KENDARAAN_ERROR,
  DELETE_SERVICE_KENDARAAN_LOADING,
  DELETE_SERVICE_KENDARAAN_SUCCESS,
  DELETE_SERVICE_KENDARAAN_ERROR,
} from './types'

export const createGAServiceKendaraan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_SERVICE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAServiceKendaraan(formData)
    dispatch({ type: CREATE_SERVICE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: CREATE_SERVICE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAServiceKendaraan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_SERVICE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAServiceKendaraan(formData, id)
    dispatch({ type: UPDATE_SERVICE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_SERVICE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAServiceKendaraan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_SERVICE_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAServiceKendaraan(id)
    dispatch({ type: DELETE_SERVICE_KENDARAAN_SUCCESS, isLoading: false })

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
      type: DELETE_SERVICE_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
