import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_FIRST_AID_LOADING,
  CREATE_FIRST_AID_SUCCESS,
  CREATE_FIRST_AID_ERROR,
  UPDATE_FIRST_AID_LOADING,
  UPDATE_FIRST_AID_SUCCESS,
  UPDATE_FIRST_AID_ERROR,
  DELETE_FIRST_AID_LOADING,
  DELETE_FIRST_AID_SUCCESS,
  DELETE_FIRST_AID_ERROR,
} from './types'

export const createAktivitasFirstAid = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_FIRST_AID_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAktivitasFirstAid(formData)
    dispatch({ type: CREATE_FIRST_AID_SUCCESS, isLoading: false })

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
      type: CREATE_FIRST_AID_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAktivitasFirstAid = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_FIRST_AID_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAktivitasFirstAid(formData, id)
    dispatch({ type: UPDATE_FIRST_AID_SUCCESS, isLoading: false })

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
      type: UPDATE_FIRST_AID_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAktivitasFirstAid = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_FIRST_AID_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAktivitasFirstAid(id)
    dispatch({ type: DELETE_FIRST_AID_SUCCESS, isLoading: false })

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
      type: DELETE_FIRST_AID_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
