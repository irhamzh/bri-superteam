import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PERALATAN_KERJA_LOADING,
  CREATE_PERALATAN_KERJA_SUCCESS,
  CREATE_PERALATAN_KERJA_ERROR,
  UPDATE_PERALATAN_KERJA_LOADING,
  UPDATE_PERALATAN_KERJA_SUCCESS,
  UPDATE_PERALATAN_KERJA_ERROR,
  DELETE_PERALATAN_KERJA_LOADING,
  DELETE_PERALATAN_KERJA_SUCCESS,
  DELETE_PERALATAN_KERJA_ERROR,
} from './types'

export const createPeralatanKerja = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PERALATAN_KERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPeralatanKerja(formData)
    dispatch({ type: CREATE_PERALATAN_KERJA_SUCCESS, isLoading: false })

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
      type: CREATE_PERALATAN_KERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePeralatanKerja = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PERALATAN_KERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePeralatanKerja(formData, id)
    dispatch({ type: UPDATE_PERALATAN_KERJA_SUCCESS, isLoading: false })

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
      type: UPDATE_PERALATAN_KERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePeralatanKerja = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PERALATAN_KERJA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePeralatanKerja(id)
    dispatch({ type: DELETE_PERALATAN_KERJA_SUCCESS, isLoading: false })

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
      type: DELETE_PERALATAN_KERJA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
