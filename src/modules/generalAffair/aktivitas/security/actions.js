import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_AKTIVITAS_SECURITY_LOADING,
  CREATE_AKTIVITAS_SECURITY_SUCCESS,
  CREATE_AKTIVITAS_SECURITY_ERROR,
  UPDATE_AKTIVITAS_SECURITY_LOADING,
  UPDATE_AKTIVITAS_SECURITY_SUCCESS,
  UPDATE_AKTIVITAS_SECURITY_ERROR,
  DELETE_AKTIVITAS_SECURITY_LOADING,
  DELETE_AKTIVITAS_SECURITY_SUCCESS,
  DELETE_AKTIVITAS_SECURITY_ERROR,
} from './types'

export const createAktivitasSecurity = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_AKTIVITAS_SECURITY_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAktivitasSecurity(formData)
    dispatch({ type: CREATE_AKTIVITAS_SECURITY_SUCCESS, isLoading: false })

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
      type: CREATE_AKTIVITAS_SECURITY_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAktivitasSecurity = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_AKTIVITAS_SECURITY_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAktivitasSecurity(formData, id)
    dispatch({ type: UPDATE_AKTIVITAS_SECURITY_SUCCESS, isLoading: false })

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
      type: UPDATE_AKTIVITAS_SECURITY_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAktivitasSecurity = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_AKTIVITAS_SECURITY_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAktivitasSecurity(id)
    dispatch({ type: DELETE_AKTIVITAS_SECURITY_SUCCESS, isLoading: false })

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
      type: DELETE_AKTIVITAS_SECURITY_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
