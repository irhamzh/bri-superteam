import Service from '../../../../../config/services'
import { AlertMessage } from '../../../../../helpers'
import {
  CREATE_KIR_KENDARAAN_LOADING,
  CREATE_KIR_KENDARAAN_SUCCESS,
  CREATE_KIR_KENDARAAN_ERROR,
  UPDATE_KIR_KENDARAAN_LOADING,
  UPDATE_KIR_KENDARAAN_SUCCESS,
  UPDATE_KIR_KENDARAAN_ERROR,
  DELETE_KIR_KENDARAAN_LOADING,
  DELETE_KIR_KENDARAAN_SUCCESS,
  DELETE_KIR_KENDARAAN_ERROR,
} from './types'

export const createGAKirKendaraan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_KIR_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAKirKendaraan(formData)
    dispatch({ type: CREATE_KIR_KENDARAAN_SUCCESS, isLoading: false })

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
      type: CREATE_KIR_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAKirKendaraan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_KIR_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAKirKendaraan(formData, id)
    dispatch({ type: UPDATE_KIR_KENDARAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_KIR_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAKirKendaraan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_KIR_KENDARAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAKirKendaraan(id)
    dispatch({ type: DELETE_KIR_KENDARAAN_SUCCESS, isLoading: false })

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
      type: DELETE_KIR_KENDARAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
