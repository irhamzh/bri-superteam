import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PROVIDER_LOADING,
  CREATE_PROVIDER_SUCCESS,
  CREATE_PROVIDER_ERROR,
  UPDATE_PROVIDER_LOADING,
  UPDATE_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_ERROR,
  DELETE_PROVIDER_LOADING,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_ERROR,
} from './types'

export const createProvider = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROVIDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createProvider(formData)
    dispatch({ type: CREATE_PROVIDER_SUCCESS, isLoading: false })

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
      type: CREATE_PROVIDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateProvider = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROVIDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateProvider(formData, id)
    dispatch({ type: UPDATE_PROVIDER_SUCCESS, isLoading: false })

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
      type: UPDATE_PROVIDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteProvider = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROVIDER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteProvider(id)
    dispatch({ type: DELETE_PROVIDER_SUCCESS, isLoading: false })

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
      type: DELETE_PROVIDER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
