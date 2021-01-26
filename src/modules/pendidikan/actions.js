import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PENDIDIKAN_LOADING,
  CREATE_PENDIDIKAN_SUCCESS,
  CREATE_PENDIDIKAN_ERROR,
  UPDATE_PENDIDIKAN_LOADING,
  UPDATE_PENDIDIKAN_SUCCESS,
  UPDATE_PENDIDIKAN_ERROR,
  DELETE_PENDIDIKAN_LOADING,
  DELETE_PENDIDIKAN_SUCCESS,
  DELETE_PENDIDIKAN_ERROR,
} from './types'

export const createPendidikan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENDIDIKAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPendidikan(formData)
    dispatch({ type: CREATE_PENDIDIKAN_SUCCESS, isLoading: false })

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
      type: CREATE_PENDIDIKAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePendidikan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENDIDIKAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePendidikan(formData, id)
    dispatch({ type: UPDATE_PENDIDIKAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PENDIDIKAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePendidikan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENDIDIKAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePendidikan(id)
    dispatch({ type: DELETE_PENDIDIKAN_SUCCESS, isLoading: false })

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
      type: DELETE_PENDIDIKAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
