import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PAJAK_LOADING,
  CREATE_PAJAK_SUCCESS,
  CREATE_PAJAK_ERROR,
  UPDATE_PAJAK_LOADING,
  UPDATE_PAJAK_SUCCESS,
  UPDATE_PAJAK_ERROR,
  DELETE_PAJAK_LOADING,
  DELETE_PAJAK_SUCCESS,
  DELETE_PAJAK_ERROR,
} from './types'

export const createPajak = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PAJAK_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPajak(formData)
    dispatch({ type: CREATE_PAJAK_SUCCESS, isLoading: false })

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
      type: CREATE_PAJAK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePajak = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PAJAK_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePajak(formData, id)
    dispatch({ type: UPDATE_PAJAK_SUCCESS, isLoading: false })

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
      type: UPDATE_PAJAK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePajak = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PAJAK_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePajak(id)
    dispatch({ type: DELETE_PAJAK_SUCCESS, isLoading: false })

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
      type: DELETE_PAJAK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
