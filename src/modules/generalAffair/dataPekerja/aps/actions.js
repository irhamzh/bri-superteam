import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_APS_LOADING,
  CREATE_APS_SUCCESS,
  CREATE_APS_ERROR,
  UPDATE_APS_LOADING,
  UPDATE_APS_SUCCESS,
  UPDATE_APS_ERROR,
  DELETE_APS_LOADING,
  DELETE_APS_SUCCESS,
  DELETE_APS_ERROR,
} from './types'

export const createGAAps = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_APS_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAAps(formData)
    dispatch({ type: CREATE_APS_SUCCESS, isLoading: false })

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
      type: CREATE_APS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAAps = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_APS_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAAps(formData, id)
    dispatch({ type: UPDATE_APS_SUCCESS, isLoading: false })

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
      type: UPDATE_APS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAAps = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_APS_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAAps(id)
    dispatch({ type: DELETE_APS_SUCCESS, isLoading: false })

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
      type: DELETE_APS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
