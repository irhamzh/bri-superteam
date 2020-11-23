import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_JENIS_GEDUNG_LOADING,
  CREATE_JENIS_GEDUNG_SUCCESS,
  CREATE_JENIS_GEDUNG_ERROR,
  UPDATE_JENIS_GEDUNG_LOADING,
  UPDATE_JENIS_GEDUNG_SUCCESS,
  UPDATE_JENIS_GEDUNG_ERROR,
  DELETE_JENIS_GEDUNG_LOADING,
  DELETE_JENIS_GEDUNG_SUCCESS,
  DELETE_JENIS_GEDUNG_ERROR,
} from './types'

export const createJenisGedung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_JENIS_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createJenisGedung(formData)
    dispatch({ type: CREATE_JENIS_GEDUNG_SUCCESS, isLoading: false })

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
      type: CREATE_JENIS_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateJenisGedung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_JENIS_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateJenisGedung(formData, id)
    dispatch({ type: UPDATE_JENIS_GEDUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_JENIS_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteJenisGedung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_JENIS_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteJenisGedung(id)
    dispatch({ type: DELETE_JENIS_GEDUNG_SUCCESS, isLoading: false })

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
      type: DELETE_JENIS_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
