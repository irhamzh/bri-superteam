import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_WORKING_ORDER_LOADING,
  CREATE_WORKING_ORDER_SUCCESS,
  CREATE_WORKING_ORDER_ERROR,
  UPDATE_WORKING_ORDER_LOADING,
  UPDATE_WORKING_ORDER_SUCCESS,
  UPDATE_WORKING_ORDER_ERROR,
  DELETE_WORKING_ORDER_LOADING,
  DELETE_WORKING_ORDER_SUCCESS,
  DELETE_WORKING_ORDER_ERROR,
} from './types'

export const createWorkingOrder = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_WORKING_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createWorkingOrder(formData)
    dispatch({ type: CREATE_WORKING_ORDER_SUCCESS, isLoading: false })

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
      type: CREATE_WORKING_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateWorkingOrder = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_WORKING_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateWorkingOrder(formData, id)
    dispatch({ type: UPDATE_WORKING_ORDER_SUCCESS, isLoading: false })

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
      type: UPDATE_WORKING_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteWorkingOrder = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_WORKING_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteWorkingOrder(id)
    dispatch({ type: DELETE_WORKING_ORDER_SUCCESS, isLoading: false })

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
      type: DELETE_WORKING_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
