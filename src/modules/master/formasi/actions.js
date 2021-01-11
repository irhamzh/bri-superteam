import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_FORMASI_LOADING,
  CREATE_FORMASI_SUCCESS,
  CREATE_FORMASI_ERROR,
  UPDATE_FORMASI_LOADING,
  UPDATE_FORMASI_SUCCESS,
  UPDATE_FORMASI_ERROR,
  DELETE_FORMASI_LOADING,
  DELETE_FORMASI_SUCCESS,
  DELETE_FORMASI_ERROR,
} from './types'

export const createFormasi = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_FORMASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.createFormasi(formData)
    dispatch({ type: CREATE_FORMASI_SUCCESS, isLoading: false })

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
      type: CREATE_FORMASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateFormasi = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_FORMASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateFormasi(formData, id)
    dispatch({ type: UPDATE_FORMASI_SUCCESS, isLoading: false })

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
      type: UPDATE_FORMASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteFormasi = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_FORMASI_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteFormasi(id)
    dispatch({ type: DELETE_FORMASI_SUCCESS, isLoading: false })

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
      type: DELETE_FORMASI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
