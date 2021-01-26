import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_MONITOR_CCTV_LOADING,
  CREATE_MONITOR_CCTV_SUCCESS,
  CREATE_MONITOR_CCTV_ERROR,
  UPDATE_MONITOR_CCTV_LOADING,
  UPDATE_MONITOR_CCTV_SUCCESS,
  UPDATE_MONITOR_CCTV_ERROR,
  DELETE_MONITOR_CCTV_LOADING,
  DELETE_MONITOR_CCTV_SUCCESS,
  DELETE_MONITOR_CCTV_ERROR,
} from './types'

export const createMonitorCCTV = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_MONITOR_CCTV_LOADING, isLoading: true })
    // Call API
    const res = await Service.createMonitorCCTV(formData)
    dispatch({ type: CREATE_MONITOR_CCTV_SUCCESS, isLoading: false })

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
      type: CREATE_MONITOR_CCTV_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateMonitorCCTV = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_MONITOR_CCTV_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateMonitorCCTV(formData, id)
    dispatch({ type: UPDATE_MONITOR_CCTV_SUCCESS, isLoading: false })

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
      type: UPDATE_MONITOR_CCTV_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteMonitorCCTV = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_MONITOR_CCTV_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteMonitorCCTV(id)
    dispatch({ type: DELETE_MONITOR_CCTV_SUCCESS, isLoading: false })

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
      type: DELETE_MONITOR_CCTV_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
