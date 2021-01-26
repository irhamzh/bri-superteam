import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_LEMBUR_LOADING,
  CREATE_LEMBUR_SUCCESS,
  CREATE_LEMBUR_ERROR,
  UPDATE_LEMBUR_LOADING,
  UPDATE_LEMBUR_SUCCESS,
  UPDATE_LEMBUR_ERROR,
  DELETE_LEMBUR_LOADING,
  DELETE_LEMBUR_SUCCESS,
  DELETE_LEMBUR_ERROR,
} from './types'

export const createGALembur = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_LEMBUR_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGALembur(formData)
    dispatch({ type: CREATE_LEMBUR_SUCCESS, isLoading: false })

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
      type: CREATE_LEMBUR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGALembur = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_LEMBUR_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGALembur(formData, id)
    dispatch({ type: UPDATE_LEMBUR_SUCCESS, isLoading: false })

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
      type: UPDATE_LEMBUR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGALembur = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_LEMBUR_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGALembur(id)
    dispatch({ type: DELETE_LEMBUR_SUCCESS, isLoading: false })

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
      type: DELETE_LEMBUR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
