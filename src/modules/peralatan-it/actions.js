import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PERALATAN_IT_LOADING,
  CREATE_PERALATAN_IT_SUCCESS,
  CREATE_PERALATAN_IT_ERROR,
  UPDATE_PERALATAN_IT_LOADING,
  UPDATE_PERALATAN_IT_SUCCESS,
  UPDATE_PERALATAN_IT_ERROR,
  DELETE_PERALATAN_IT_LOADING,
  DELETE_PERALATAN_IT_SUCCESS,
  DELETE_PERALATAN_IT_ERROR,
} from './types'

export const createPeralatanIT = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PERALATAN_IT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPeralatanIT(formData)
    dispatch({ type: CREATE_PERALATAN_IT_SUCCESS, isLoading: false })

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
      type: CREATE_PERALATAN_IT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePeralatanIT = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PERALATAN_IT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePeralatanIT(formData, id)
    dispatch({ type: UPDATE_PERALATAN_IT_SUCCESS, isLoading: false })

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
      type: UPDATE_PERALATAN_IT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePeralatanIT = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PERALATAN_IT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePeralatanIT(id)
    dispatch({ type: DELETE_PERALATAN_IT_SUCCESS, isLoading: false })

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
      type: DELETE_PERALATAN_IT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
