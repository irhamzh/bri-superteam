import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_VENDOR_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_ERROR,
  UPDATE_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_ERROR,
  DELETE_VENDOR_LOADING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_ERROR,
} from './types'

export const createVendor = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_VENDOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.createVendor(formData)
    dispatch({ type: CREATE_VENDOR_SUCCESS, isLoading: false })

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
      type: CREATE_VENDOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateVendor = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_VENDOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateVendor(formData, id)
    dispatch({ type: UPDATE_VENDOR_SUCCESS, isLoading: false })

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
      type: UPDATE_VENDOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteVendor = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_VENDOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteVendor(id)
    dispatch({ type: DELETE_VENDOR_SUCCESS, isLoading: false })

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
      type: DELETE_VENDOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
