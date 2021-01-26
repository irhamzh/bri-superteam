import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_LOKASI_LOADING,
  CREATE_LOKASI_SUCCESS,
  CREATE_LOKASI_ERROR,
  UPDATE_LOKASI_LOADING,
  UPDATE_LOKASI_SUCCESS,
  UPDATE_LOKASI_ERROR,
  DELETE_LOKASI_LOADING,
  DELETE_LOKASI_SUCCESS,
  DELETE_LOKASI_ERROR,
} from './types'

export const createLokasi = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_LOKASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.createLokasi(formData)
    dispatch({ type: CREATE_LOKASI_SUCCESS, isLoading: false })

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
      type: CREATE_LOKASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateLokasi = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_LOKASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateLokasi(formData, id)
    dispatch({ type: UPDATE_LOKASI_SUCCESS, isLoading: false })

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
      type: UPDATE_LOKASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteLokasi = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_LOKASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteLokasi(id)
    dispatch({ type: DELETE_LOKASI_SUCCESS, isLoading: false })

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
      type: DELETE_LOKASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
