import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_PEKERJA_LOADING,
  CREATE_PEKERJA_SUCCESS,
  CREATE_PEKERJA_ERROR,
  UPDATE_PEKERJA_LOADING,
  UPDATE_PEKERJA_SUCCESS,
  UPDATE_PEKERJA_ERROR,
  DELETE_PEKERJA_LOADING,
  DELETE_PEKERJA_SUCCESS,
  DELETE_PEKERJA_ERROR,
  UPLOAD_PEKERJA_LOADING,
  UPLOAD_PEKERJA_SUCCESS,
  UPLOAD_PEKERJA_ERROR,
} from './types'

export const createGAPekerja = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PEKERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAPekerja(formData)
    dispatch({ type: CREATE_PEKERJA_SUCCESS, isLoading: false })

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
      type: CREATE_PEKERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAPekerja = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PEKERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAPekerja(formData, id)
    dispatch({ type: UPDATE_PEKERJA_SUCCESS, isLoading: false })

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
      type: UPDATE_PEKERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAPekerja = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PEKERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAPekerja(id)
    dispatch({ type: DELETE_PEKERJA_SUCCESS, isLoading: false })

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
      type: DELETE_PEKERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const uploadGAPekerja = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_PEKERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadGAPekerja(formData)
    dispatch({ type: UPLOAD_PEKERJA_SUCCESS, isLoading: false })

    paramsResponse.title = 'Uploaded'
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
      type: UPLOAD_PEKERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
