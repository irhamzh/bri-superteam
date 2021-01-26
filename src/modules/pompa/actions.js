import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_POMPA_LOADING,
  CREATE_POMPA_SUCCESS,
  CREATE_POMPA_ERROR,
  UPDATE_POMPA_LOADING,
  UPDATE_POMPA_SUCCESS,
  UPDATE_POMPA_ERROR,
  DELETE_POMPA_LOADING,
  DELETE_POMPA_SUCCESS,
  DELETE_POMPA_ERROR,
} from './types'

export const createPompa = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPompa(formData)
    dispatch({ type: CREATE_POMPA_SUCCESS, isLoading: false })

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
      type: CREATE_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePompa = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePompa(formData, id)
    dispatch({ type: UPDATE_POMPA_SUCCESS, isLoading: false })

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
      type: UPDATE_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePompa = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePompa(id)
    dispatch({ type: DELETE_POMPA_SUCCESS, isLoading: false })

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
      type: DELETE_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
