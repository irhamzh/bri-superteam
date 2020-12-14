import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_TAMBAHAN_KAS_LOADING,
  CREATE_TAMBAHAN_KAS_SUCCESS,
  CREATE_TAMBAHAN_KAS_ERROR,
  UPDATE_TAMBAHAN_KAS_LOADING,
  UPDATE_TAMBAHAN_KAS_SUCCESS,
  UPDATE_TAMBAHAN_KAS_ERROR,
  DELETE_TAMBAHAN_KAS_LOADING,
  DELETE_TAMBAHAN_KAS_SUCCESS,
  DELETE_TAMBAHAN_KAS_ERROR,
} from './types'

export const createFITambahanKas = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_TAMBAHAN_KAS_LOADING, isLoading: true })
    // Call API
    const res = await Service.createFITambahanKas(formData)
    dispatch({ type: CREATE_TAMBAHAN_KAS_SUCCESS, isLoading: false })

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
      type: CREATE_TAMBAHAN_KAS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateFITambahanKas = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_TAMBAHAN_KAS_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateFITambahanKas(formData, id)
    dispatch({ type: UPDATE_TAMBAHAN_KAS_SUCCESS, isLoading: false })

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
      type: UPDATE_TAMBAHAN_KAS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteFITambahanKas = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_TAMBAHAN_KAS_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteFITambahanKas(id)
    dispatch({ type: DELETE_TAMBAHAN_KAS_SUCCESS, isLoading: false })

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
      type: DELETE_TAMBAHAN_KAS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
