import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_AKTIVITAS_DRIVER_LOADING,
  CREATE_AKTIVITAS_DRIVER_SUCCESS,
  CREATE_AKTIVITAS_DRIVER_ERROR,
  UPDATE_AKTIVITAS_DRIVER_LOADING,
  UPDATE_AKTIVITAS_DRIVER_SUCCESS,
  UPDATE_AKTIVITAS_DRIVER_ERROR,
  DELETE_AKTIVITAS_DRIVER_LOADING,
  DELETE_AKTIVITAS_DRIVER_SUCCESS,
  DELETE_AKTIVITAS_DRIVER_ERROR,
} from './types'

export const createAktivitasDriver = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_AKTIVITAS_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAktivitasDriver(formData)
    dispatch({ type: CREATE_AKTIVITAS_DRIVER_SUCCESS, isLoading: false })

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
      type: CREATE_AKTIVITAS_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAktivitasDriver = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_AKTIVITAS_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAktivitasDriver(formData, id)
    dispatch({ type: UPDATE_AKTIVITAS_DRIVER_SUCCESS, isLoading: false })

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
      type: UPDATE_AKTIVITAS_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAktivitasDriver = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_AKTIVITAS_DRIVER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAktivitasDriver(id)
    dispatch({ type: DELETE_AKTIVITAS_DRIVER_SUCCESS, isLoading: false })

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
      type: DELETE_AKTIVITAS_DRIVER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
