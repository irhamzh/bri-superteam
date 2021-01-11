import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_REKREASI_LOADING,
  CREATE_REKREASI_SUCCESS,
  CREATE_REKREASI_ERROR,
  UPDATE_REKREASI_LOADING,
  UPDATE_REKREASI_SUCCESS,
  UPDATE_REKREASI_ERROR,
  DELETE_REKREASI_LOADING,
  DELETE_REKREASI_SUCCESS,
  DELETE_REKREASI_ERROR,
} from './types'

export const createAktivitasRekreasi = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_REKREASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAktivitasRekreasi(formData)
    dispatch({ type: CREATE_REKREASI_SUCCESS, isLoading: false })

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
      type: CREATE_REKREASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAktivitasRekreasi = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_REKREASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAktivitasRekreasi(formData, id)
    dispatch({ type: UPDATE_REKREASI_SUCCESS, isLoading: false })

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
      type: UPDATE_REKREASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAktivitasRekreasi = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_REKREASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAktivitasRekreasi(id)
    dispatch({ type: DELETE_REKREASI_SUCCESS, isLoading: false })

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
      type: DELETE_REKREASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
