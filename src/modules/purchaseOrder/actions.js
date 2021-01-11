import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PURCHASE_ORDER_LOADING,
  CREATE_PURCHASE_ORDER_SUCCESS,
  CREATE_PURCHASE_ORDER_ERROR,
  UPDATE_PURCHASE_ORDER_LOADING,
  UPDATE_PURCHASE_ORDER_SUCCESS,
  UPDATE_PURCHASE_ORDER_ERROR,
  DELETE_PURCHASE_ORDER_LOADING,
  DELETE_PURCHASE_ORDER_SUCCESS,
  DELETE_PURCHASE_ORDER_ERROR,
} from './types'

export const createPurchaseOrder = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PURCHASE_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPurchaseOrder(formData)
    dispatch({ type: CREATE_PURCHASE_ORDER_SUCCESS, isLoading: false })

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
      type: CREATE_PURCHASE_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePurchaseOrder = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PURCHASE_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePurchaseOrder(formData, id)
    dispatch({ type: UPDATE_PURCHASE_ORDER_SUCCESS, isLoading: false })

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
      type: UPDATE_PURCHASE_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePurchaseOrder = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PURCHASE_ORDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePurchaseOrder(id)
    dispatch({ type: DELETE_PURCHASE_ORDER_SUCCESS, isLoading: false })

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
      type: DELETE_PURCHASE_ORDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
