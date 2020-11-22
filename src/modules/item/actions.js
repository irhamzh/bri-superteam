import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_ITEM_LOADING,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
  UPDATE_ITEM_LOADING,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_LOADING,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
} from './types'

export const createItem = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_ITEM_LOADING, isLoading: true })
    // Call API
    const res = await Service.createItem(formData)
    dispatch({ type: CREATE_ITEM_SUCCESS, isLoading: false })

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
      type: CREATE_ITEM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateItem = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_ITEM_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateItem(formData, id)
    dispatch({ type: UPDATE_ITEM_SUCCESS, isLoading: false })

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
      type: UPDATE_ITEM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteItem = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_ITEM_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteItem(id)
    dispatch({ type: DELETE_ITEM_SUCCESS, isLoading: false })

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
      type: DELETE_ITEM_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
