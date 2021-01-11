import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PERSEKOT_LOADING,
  CREATE_PERSEKOT_SUCCESS,
  CREATE_PERSEKOT_ERROR,
  UPDATE_PERSEKOT_LOADING,
  UPDATE_PERSEKOT_SUCCESS,
  UPDATE_PERSEKOT_ERROR,
  DELETE_PERSEKOT_LOADING,
  DELETE_PERSEKOT_SUCCESS,
  DELETE_PERSEKOT_ERROR,
  APPROVE_PERSEKOT_LOADING,
  APPROVE_PERSEKOT_SUCCESS,
  APPROVE_PERSEKOT_ERROR,
  PENIHILAN_PERSEKOT_LOADING,
  PENIHILAN_PERSEKOT_SUCCESS,
  PENIHILAN_PERSEKOT_ERROR,
} from './types'

export const createPersekot = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PERSEKOT_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPersekot(formData)
    dispatch({ type: CREATE_PERSEKOT_SUCCESS, isLoading: false })

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
      type: CREATE_PERSEKOT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePersekot = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PERSEKOT_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePersekot(formData, id)
    dispatch({ type: UPDATE_PERSEKOT_SUCCESS, isLoading: false })

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
      type: UPDATE_PERSEKOT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePersekot = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PERSEKOT_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePersekot(id)
    dispatch({ type: DELETE_PERSEKOT_SUCCESS, isLoading: false })

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
      type: DELETE_PERSEKOT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const approvePersekot = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: APPROVE_PERSEKOT_LOADING, isLoading: true })
    // Call API
    const res = await Service.approvePersekot(formData, id)
    dispatch({ type: APPROVE_PERSEKOT_SUCCESS, isLoading: false })

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
      type: APPROVE_PERSEKOT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const penihilanPersekot = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: PENIHILAN_PERSEKOT_LOADING, isLoading: true })
    // Call API
    const res = await Service.penihilanPersekot(formData)
    dispatch({ type: PENIHILAN_PERSEKOT_SUCCESS, isLoading: false })

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
      type: PENIHILAN_PERSEKOT_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
