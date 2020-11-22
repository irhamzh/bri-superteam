import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_LANTAI_LOADING,
  CREATE_LANTAI_SUCCESS,
  CREATE_LANTAI_ERROR,
  UPDATE_LANTAI_LOADING,
  UPDATE_LANTAI_SUCCESS,
  UPDATE_LANTAI_ERROR,
  DELETE_LANTAI_LOADING,
  DELETE_LANTAI_SUCCESS,
  DELETE_LANTAI_ERROR,
} from './types'

export const createLantai = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_LANTAI_LOADING, isLoading: true })
    // Call API
    const res = await Service.createLantai(formData)
    dispatch({ type: CREATE_LANTAI_SUCCESS, isLoading: false })

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
      type: CREATE_LANTAI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateLantai = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_LANTAI_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateLantai(formData, id)
    dispatch({ type: UPDATE_LANTAI_SUCCESS, isLoading: false })

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
      type: UPDATE_LANTAI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteLantai = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_LANTAI_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteLantai(id)
    dispatch({ type: DELETE_LANTAI_SUCCESS, isLoading: false })

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
      type: DELETE_LANTAI_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
