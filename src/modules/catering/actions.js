import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_CATERING_LOADING,
  CREATE_CATERING_SUCCESS,
  CREATE_CATERING_ERROR,
  UPDATE_CATERING_LOADING,
  UPDATE_CATERING_SUCCESS,
  UPDATE_CATERING_ERROR,
  DELETE_CATERING_LOADING,
  DELETE_CATERING_SUCCESS,
  DELETE_CATERING_ERROR,
} from './types'

export const createCatering = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.createCatering(formData)
    dispatch({ type: CREATE_CATERING_SUCCESS, isLoading: false })

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
      type: CREATE_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateCatering = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateCatering(formData, id)
    dispatch({ type: UPDATE_CATERING_SUCCESS, isLoading: false })

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
      type: UPDATE_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteCatering = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteCatering(id)
    dispatch({ type: DELETE_CATERING_SUCCESS, isLoading: false })

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
      type: DELETE_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
