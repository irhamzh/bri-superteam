import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PROCUREMENT_ATK_LOADING,
  CREATE_PROCUREMENT_ATK_SUCCESS,
  CREATE_PROCUREMENT_ATK_ERROR,
  UPDATE_PROCUREMENT_ATK_LOADING,
  UPDATE_PROCUREMENT_ATK_SUCCESS,
  UPDATE_PROCUREMENT_ATK_ERROR,
  DELETE_PROCUREMENT_ATK_LOADING,
  DELETE_PROCUREMENT_ATK_SUCCESS,
  DELETE_PROCUREMENT_ATK_ERROR,
} from './types'

export const createPREvaluasiAtk = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_ATK_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPREvaluasiAtk(formData)
    dispatch({ type: CREATE_PROCUREMENT_ATK_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_ATK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePREvaluasiAtk = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_ATK_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePREvaluasiAtk(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_ATK_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_ATK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePREvaluasiAtk = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_ATK_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePREvaluasiAtk(id)
    dispatch({ type: DELETE_PROCUREMENT_ATK_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_ATK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
