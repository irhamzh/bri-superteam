import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PARTNER_LOADING,
  CREATE_PARTNER_SUCCESS,
  CREATE_PARTNER_ERROR,
  UPDATE_PARTNER_LOADING,
  UPDATE_PARTNER_SUCCESS,
  UPDATE_PARTNER_ERROR,
  DELETE_PARTNER_LOADING,
  DELETE_PARTNER_SUCCESS,
  DELETE_PARTNER_ERROR,
} from './types'

export const createPartner = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PARTNER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPartner(formData)
    dispatch({ type: CREATE_PARTNER_SUCCESS, isLoading: false })

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
      type: CREATE_PARTNER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePartner = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PARTNER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePartner(formData, id)
    dispatch({ type: UPDATE_PARTNER_SUCCESS, isLoading: false })

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
      type: UPDATE_PARTNER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePartner = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PARTNER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePartner(id)
    dispatch({ type: DELETE_PARTNER_SUCCESS, isLoading: false })

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
      type: DELETE_PARTNER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
