import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
  UPDATE_PAYMENT_LOADING,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_ERROR,
  DELETE_PAYMENT_LOADING,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_ERROR,
} from './types'

export const createFIPayment = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PAYMENT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createFIPayment(formData)
    dispatch({ type: CREATE_PAYMENT_SUCCESS, isLoading: false })

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
      type: CREATE_PAYMENT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateFIPayment = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PAYMENT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateFIPayment(formData, id)
    dispatch({ type: UPDATE_PAYMENT_SUCCESS, isLoading: false })

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
      type: UPDATE_PAYMENT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteFIPayment = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PAYMENT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteFIPayment(id)
    dispatch({ type: DELETE_PAYMENT_SUCCESS, isLoading: false })

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
      type: DELETE_PAYMENT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
