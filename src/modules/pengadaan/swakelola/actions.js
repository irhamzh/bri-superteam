import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_SWAKELOLA_LOADING,
  CREATE_SWAKELOLA_SUCCESS,
  CREATE_SWAKELOLA_ERROR,
  UPDATE_SWAKELOLA_LOADING,
  UPDATE_SWAKELOLA_SUCCESS,
  UPDATE_SWAKELOLA_ERROR,
  DELETE_SWAKELOLA_LOADING,
  DELETE_SWAKELOLA_SUCCESS,
  DELETE_SWAKELOLA_ERROR,
} from './types'

export const createBarangSwakelola = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_SWAKELOLA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createBarangSwakelola(formData)
    dispatch({ type: CREATE_SWAKELOLA_SUCCESS, isLoading: false })

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
      type: CREATE_SWAKELOLA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateBarangSwakelola = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_SWAKELOLA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateBarangSwakelola(formData, id)
    dispatch({ type: UPDATE_SWAKELOLA_SUCCESS, isLoading: false })

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
      type: UPDATE_SWAKELOLA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteBarangSwakelola = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_SWAKELOLA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteBarangSwakelola(id)
    dispatch({ type: DELETE_SWAKELOLA_SUCCESS, isLoading: false })

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
      type: DELETE_SWAKELOLA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
