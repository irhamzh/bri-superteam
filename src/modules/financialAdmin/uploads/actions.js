import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_UPLOAD_FINANCIAL_LOADING,
  CREATE_UPLOAD_FINANCIAL_SUCCESS,
  CREATE_UPLOAD_FINANCIAL_ERROR,
  UPDATE_UPLOAD_FINANCIAL_LOADING,
  UPDATE_UPLOAD_FINANCIAL_SUCCESS,
  UPDATE_UPLOAD_FINANCIAL_ERROR,
  DELETE_UPLOAD_FINANCIAL_LOADING,
  DELETE_UPLOAD_FINANCIAL_SUCCESS,
  DELETE_UPLOAD_FINANCIAL_ERROR,
} from './types'

export const createFIUpload = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_UPLOAD_FINANCIAL_LOADING, isLoading: true })
    // Call API
    const res = await Service.createFIUpload(formData)
    dispatch({ type: CREATE_UPLOAD_FINANCIAL_SUCCESS, isLoading: false })

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
      type: CREATE_UPLOAD_FINANCIAL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateFIUpload = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_UPLOAD_FINANCIAL_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateFIUpload(formData, id)
    dispatch({ type: UPDATE_UPLOAD_FINANCIAL_SUCCESS, isLoading: false })

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
      type: UPDATE_UPLOAD_FINANCIAL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteFIUpload = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_UPLOAD_FINANCIAL_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteFIUpload(id)
    dispatch({ type: DELETE_UPLOAD_FINANCIAL_SUCCESS, isLoading: false })

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
      type: DELETE_UPLOAD_FINANCIAL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
