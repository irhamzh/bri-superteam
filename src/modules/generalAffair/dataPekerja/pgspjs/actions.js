import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_PGS_PJS_LOADING,
  CREATE_PGS_PJS_SUCCESS,
  CREATE_PGS_PJS_ERROR,
  UPDATE_PGS_PJS_LOADING,
  UPDATE_PGS_PJS_SUCCESS,
  UPDATE_PGS_PJS_ERROR,
  DELETE_PGS_PJS_LOADING,
  DELETE_PGS_PJS_SUCCESS,
  DELETE_PGS_PJS_ERROR,
} from './types'

export const createGAPgsPjs = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PGS_PJS_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAPgsPjs(formData)
    dispatch({ type: CREATE_PGS_PJS_SUCCESS, isLoading: false })

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
      type: CREATE_PGS_PJS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAPgsPjs = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PGS_PJS_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAPgsPjs(formData, id)
    dispatch({ type: UPDATE_PGS_PJS_SUCCESS, isLoading: false })

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
      type: UPDATE_PGS_PJS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAPgsPjs = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PGS_PJS_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAPgsPjs(id)
    dispatch({ type: DELETE_PGS_PJS_SUCCESS, isLoading: false })

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
      type: DELETE_PGS_PJS_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
