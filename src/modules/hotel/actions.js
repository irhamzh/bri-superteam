import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_HOTEL_LOADING,
  CREATE_HOTEL_SUCCESS,
  CREATE_HOTEL_ERROR,
  UPDATE_HOTEL_LOADING,
  UPDATE_HOTEL_SUCCESS,
  UPDATE_HOTEL_ERROR,
  DELETE_HOTEL_LOADING,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_ERROR,
} from './types'

export const createHotel = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.createHotel(formData)
    dispatch({ type: CREATE_HOTEL_SUCCESS, isLoading: false })

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
      type: CREATE_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateHotel = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateHotel(formData, id)
    dispatch({ type: UPDATE_HOTEL_SUCCESS, isLoading: false })

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
      type: UPDATE_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteHotel = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteHotel(id)
    dispatch({ type: DELETE_HOTEL_SUCCESS, isLoading: false })

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
      type: DELETE_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
