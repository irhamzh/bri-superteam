import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_PENUGASAN_DRIVER_LOADING,
  CREATE_PENUGASAN_DRIVER_SUCCESS,
  CREATE_PENUGASAN_DRIVER_ERROR,
  UPDATE_PENUGASAN_DRIVER_LOADING,
  UPDATE_PENUGASAN_DRIVER_SUCCESS,
  UPDATE_PENUGASAN_DRIVER_ERROR,
  DELETE_PENUGASAN_DRIVER_LOADING,
  DELETE_PENUGASAN_DRIVER_SUCCESS,
  DELETE_PENUGASAN_DRIVER_ERROR,
} from './types'

export const createPenugasanDriver = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENUGASAN_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPenugasanDriver(formData)
    dispatch({ type: CREATE_PENUGASAN_DRIVER_SUCCESS, isLoading: false })

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
      type: CREATE_PENUGASAN_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePenugasanDriver = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENUGASAN_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePenugasanDriver(formData, id)
    dispatch({ type: UPDATE_PENUGASAN_DRIVER_SUCCESS, isLoading: false })

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
      type: UPDATE_PENUGASAN_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePenugasanDriver = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENUGASAN_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePenugasanDriver(id)
    dispatch({ type: DELETE_PENUGASAN_DRIVER_SUCCESS, isLoading: false })

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
      type: DELETE_PENUGASAN_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
