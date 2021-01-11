import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_COMPRESSOR_LOADING,
  CREATE_COMPRESSOR_SUCCESS,
  CREATE_COMPRESSOR_ERROR,
  UPDATE_COMPRESSOR_LOADING,
  UPDATE_COMPRESSOR_SUCCESS,
  UPDATE_COMPRESSOR_ERROR,
  DELETE_COMPRESSOR_LOADING,
  DELETE_COMPRESSOR_SUCCESS,
  DELETE_COMPRESSOR_ERROR,
} from './types'

export const createCompressor = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_COMPRESSOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.createCompressor(formData)
    dispatch({ type: CREATE_COMPRESSOR_SUCCESS, isLoading: false })

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
      type: CREATE_COMPRESSOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateCompressor = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_COMPRESSOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateCompressor(formData, id)
    dispatch({ type: UPDATE_COMPRESSOR_SUCCESS, isLoading: false })

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
      type: UPDATE_COMPRESSOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteCompressor = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_COMPRESSOR_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteCompressor(id)
    dispatch({ type: DELETE_COMPRESSOR_SUCCESS, isLoading: false })

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
      type: DELETE_COMPRESSOR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
