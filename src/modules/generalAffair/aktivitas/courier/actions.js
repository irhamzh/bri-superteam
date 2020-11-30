import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_AKTIVITAS_COURIER_LOADING,
  CREATE_AKTIVITAS_COURIER_SUCCESS,
  CREATE_AKTIVITAS_COURIER_ERROR,
  UPDATE_AKTIVITAS_COURIER_LOADING,
  UPDATE_AKTIVITAS_COURIER_SUCCESS,
  UPDATE_AKTIVITAS_COURIER_ERROR,
  DELETE_AKTIVITAS_COURIER_LOADING,
  DELETE_AKTIVITAS_COURIER_SUCCESS,
  DELETE_AKTIVITAS_COURIER_ERROR,
} from './types'

export const createAktivitasCourier = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_AKTIVITAS_COURIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAktivitasCourier(formData)
    dispatch({ type: CREATE_AKTIVITAS_COURIER_SUCCESS, isLoading: false })

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
      type: CREATE_AKTIVITAS_COURIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAktivitasCourier = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_AKTIVITAS_COURIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAktivitasCourier(formData, id)
    dispatch({ type: UPDATE_AKTIVITAS_COURIER_SUCCESS, isLoading: false })

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
      type: UPDATE_AKTIVITAS_COURIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAktivitasCourier = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_AKTIVITAS_COURIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAktivitasCourier(id)
    dispatch({ type: DELETE_AKTIVITAS_COURIER_SUCCESS, isLoading: false })

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
      type: DELETE_AKTIVITAS_COURIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
