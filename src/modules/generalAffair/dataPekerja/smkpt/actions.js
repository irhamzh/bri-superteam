import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_SMKPT_LOADING,
  CREATE_SMKPT_SUCCESS,
  CREATE_SMKPT_ERROR,
  UPDATE_SMKPT_LOADING,
  UPDATE_SMKPT_SUCCESS,
  UPDATE_SMKPT_ERROR,
  DELETE_SMKPT_LOADING,
  DELETE_SMKPT_SUCCESS,
  DELETE_SMKPT_ERROR,
  UPLOAD_SMKPT_LOADING,
  UPLOAD_SMKPT_SUCCESS,
  UPLOAD_SMKPT_ERROR,
} from './types'

export const createGASmkpt = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_SMKPT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGASmkpt(formData)
    dispatch({ type: CREATE_SMKPT_SUCCESS, isLoading: false })

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
      type: CREATE_SMKPT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGASmkpt = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_SMKPT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGASmkpt(formData, id)
    dispatch({ type: UPDATE_SMKPT_SUCCESS, isLoading: false })

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
      type: UPDATE_SMKPT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGASmkpt = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_SMKPT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGASmkpt(id)
    dispatch({ type: DELETE_SMKPT_SUCCESS, isLoading: false })

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
      type: DELETE_SMKPT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const uploadGASmkpt = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_SMKPT_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadGASmkpt(formData)
    dispatch({ type: UPLOAD_SMKPT_SUCCESS, isLoading: false })

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
      type: UPLOAD_SMKPT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
