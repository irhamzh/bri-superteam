import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_LELANG_LOADING,
  CREATE_LELANG_SUCCESS,
  CREATE_LELANG_ERROR,
  UPDATE_LELANG_LOADING,
  UPDATE_LELANG_SUCCESS,
  UPDATE_LELANG_ERROR,
  DELETE_LELANG_LOADING,
  DELETE_LELANG_SUCCESS,
  DELETE_LELANG_ERROR,
} from './types'

export const createBarangLelang = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_LELANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createBarangLelang(formData)
    dispatch({ type: CREATE_LELANG_SUCCESS, isLoading: false })

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
      type: CREATE_LELANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateBarangLelang = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_LELANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateBarangLelang(formData, id)
    dispatch({ type: UPDATE_LELANG_SUCCESS, isLoading: false })

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
      type: UPDATE_LELANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteBarangLelang = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_LELANG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteBarangLelang(id)
    dispatch({ type: DELETE_LELANG_SUCCESS, isLoading: false })

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
      type: DELETE_LELANG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
