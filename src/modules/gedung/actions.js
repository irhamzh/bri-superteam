import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_GEDUNG_LOADING,
  CREATE_GEDUNG_SUCCESS,
  CREATE_GEDUNG_ERROR,
  UPDATE_GEDUNG_LOADING,
  UPDATE_GEDUNG_SUCCESS,
  UPDATE_GEDUNG_ERROR,
  DELETE_GEDUNG_LOADING,
  DELETE_GEDUNG_SUCCESS,
  DELETE_GEDUNG_ERROR,
} from './types'

export const createGedung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGedung(formData)
    dispatch({ type: CREATE_GEDUNG_SUCCESS, isLoading: false })

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
      type: CREATE_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGedung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGedung(formData, id)
    dispatch({ type: UPDATE_GEDUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGedung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_GEDUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGedung(id)
    dispatch({ type: DELETE_GEDUNG_SUCCESS, isLoading: false })

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
      type: DELETE_GEDUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
