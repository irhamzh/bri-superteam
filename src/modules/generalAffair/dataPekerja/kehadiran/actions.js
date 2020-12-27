import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_KEHADIRAN_LOADING,
  CREATE_KEHADIRAN_SUCCESS,
  CREATE_KEHADIRAN_ERROR,
  UPDATE_KEHADIRAN_LOADING,
  UPDATE_KEHADIRAN_SUCCESS,
  UPDATE_KEHADIRAN_ERROR,
  DELETE_KEHADIRAN_LOADING,
  DELETE_KEHADIRAN_SUCCESS,
  DELETE_KEHADIRAN_ERROR,
  UPLOAD_KEHADIRAN_LOADING,
  UPLOAD_KEHADIRAN_SUCCESS,
  UPLOAD_KEHADIRAN_ERROR,
} from './types'

export const createGAKehadiran = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_KEHADIRAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAKehadiran(formData)
    dispatch({ type: CREATE_KEHADIRAN_SUCCESS, isLoading: false })

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
      type: CREATE_KEHADIRAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAKehadiran = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_KEHADIRAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAKehadiran(formData, id)
    dispatch({ type: UPDATE_KEHADIRAN_SUCCESS, isLoading: false })

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
      type: UPDATE_KEHADIRAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAKehadiran = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_KEHADIRAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAKehadiran(id)
    dispatch({ type: DELETE_KEHADIRAN_SUCCESS, isLoading: false })

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
      type: DELETE_KEHADIRAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const uploadGAKehadiran = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_KEHADIRAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadGAKehadiran(formData)
    dispatch({ type: UPLOAD_KEHADIRAN_SUCCESS, isLoading: false })

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
      type: UPLOAD_KEHADIRAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
