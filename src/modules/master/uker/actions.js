import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_UKER_LOADING,
  CREATE_UKER_SUCCESS,
  CREATE_UKER_ERROR,
  UPDATE_UKER_LOADING,
  UPDATE_UKER_SUCCESS,
  UPDATE_UKER_ERROR,
  DELETE_UKER_LOADING,
  DELETE_UKER_SUCCESS,
  DELETE_UKER_ERROR,
} from './types'

export const createUker = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_UKER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createUker(formData)
    dispatch({ type: CREATE_UKER_SUCCESS, isLoading: false })

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
      type: CREATE_UKER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateUker = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_UKER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateUker(formData, id)
    dispatch({ type: UPDATE_UKER_SUCCESS, isLoading: false })

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
      type: UPDATE_UKER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteUker = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_UKER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteUker(id)
    dispatch({ type: DELETE_UKER_SUCCESS, isLoading: false })

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
      type: DELETE_UKER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
