import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_CHECKPOINT_LOADING,
  CREATE_CHECKPOINT_SUCCESS,
  CREATE_CHECKPOINT_ERROR,
  UPDATE_CHECKPOINT_LOADING,
  UPDATE_CHECKPOINT_SUCCESS,
  UPDATE_CHECKPOINT_ERROR,
  DELETE_CHECKPOINT_LOADING,
  DELETE_CHECKPOINT_SUCCESS,
  DELETE_CHECKPOINT_ERROR,
} from './types'

export const createCheckpoint = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_CHECKPOINT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createCheckpoint(formData)
    dispatch({ type: CREATE_CHECKPOINT_SUCCESS, isLoading: false })

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
      type: CREATE_CHECKPOINT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateCheckpoint = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_CHECKPOINT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateCheckpoint(formData, id)
    dispatch({ type: UPDATE_CHECKPOINT_SUCCESS, isLoading: false })

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
      type: UPDATE_CHECKPOINT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteCheckpoint = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_CHECKPOINT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteCheckpoint(id)
    dispatch({ type: DELETE_CHECKPOINT_SUCCESS, isLoading: false })

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
      type: DELETE_CHECKPOINT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
