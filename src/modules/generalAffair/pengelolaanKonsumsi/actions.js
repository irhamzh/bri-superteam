import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PENGELOLAAN_KONSUMSI_LOADING,
  CREATE_PENGELOLAAN_KONSUMSI_SUCCESS,
  CREATE_PENGELOLAAN_KONSUMSI_ERROR,
  UPDATE_PENGELOLAAN_KONSUMSI_LOADING,
  UPDATE_PENGELOLAAN_KONSUMSI_SUCCESS,
  UPDATE_PENGELOLAAN_KONSUMSI_ERROR,
  DELETE_PENGELOLAAN_KONSUMSI_LOADING,
  DELETE_PENGELOLAAN_KONSUMSI_SUCCESS,
  DELETE_PENGELOLAAN_KONSUMSI_ERROR,
} from './types'

export const createPengelolaanKonsumsi = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENGELOLAAN_KONSUMSI_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPengelolaanKonsumsi(formData)
    dispatch({ type: CREATE_PENGELOLAAN_KONSUMSI_SUCCESS, isLoading: false })

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
      type: CREATE_PENGELOLAAN_KONSUMSI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePengelolaanKonsumsi = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENGELOLAAN_KONSUMSI_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePengelolaanKonsumsi(formData, id)
    dispatch({ type: UPDATE_PENGELOLAAN_KONSUMSI_SUCCESS, isLoading: false })

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
      type: UPDATE_PENGELOLAAN_KONSUMSI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePengelolaanKonsumsi = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENGELOLAAN_KONSUMSI_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePengelolaanKonsumsi(id)
    dispatch({ type: DELETE_PENGELOLAAN_KONSUMSI_SUCCESS, isLoading: false })

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
      type: DELETE_PENGELOLAAN_KONSUMSI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
