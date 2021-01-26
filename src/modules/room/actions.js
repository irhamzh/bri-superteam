import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_ROOM_LOADING,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  UPDATE_ROOM_LOADING,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_ERROR,
  DELETE_ROOM_LOADING,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_ERROR,
} from './types'

export const createRoom = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_ROOM_LOADING, isLoading: true })
    // Call API
    const res = await Service.createRoom(formData)
    dispatch({ type: CREATE_ROOM_SUCCESS, isLoading: false })

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
      type: CREATE_ROOM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateRoom = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_ROOM_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateRoom(formData, id)
    dispatch({ type: UPDATE_ROOM_SUCCESS, isLoading: false })

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
      type: UPDATE_ROOM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteRoom = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_ROOM_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteRoom(id)
    dispatch({ type: DELETE_ROOM_SUCCESS, isLoading: false })

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
      type: DELETE_ROOM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
