import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_AREA_LOADING,
  CREATE_AREA_SUCCESS,
  CREATE_AREA_ERROR,
  UPDATE_AREA_LOADING,
  UPDATE_AREA_SUCCESS,
  UPDATE_AREA_ERROR,
  DELETE_AREA_LOADING,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_ERROR,
} from './types'

export const createArea = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_AREA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createArea(formData)
    dispatch({ type: CREATE_AREA_SUCCESS, isLoading: false })

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
      type: CREATE_AREA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateArea = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_AREA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateArea(formData, id)
    dispatch({ type: UPDATE_AREA_SUCCESS, isLoading: false })

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
      type: UPDATE_AREA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteArea = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_AREA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteArea(id)
    dispatch({ type: DELETE_AREA_SUCCESS, isLoading: false })

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
      type: DELETE_AREA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
