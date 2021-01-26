import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_PERSEDIAAN_LOADING,
  CREATE_PERSEDIAAN_SUCCESS,
  CREATE_PERSEDIAAN_ERROR,
  UPDATE_PERSEDIAAN_LOADING,
  UPDATE_PERSEDIAAN_SUCCESS,
  UPDATE_PERSEDIAAN_ERROR,
  DELETE_PERSEDIAAN_LOADING,
  DELETE_PERSEDIAAN_SUCCESS,
  DELETE_PERSEDIAAN_ERROR,
} from './types'

export const createPersediaan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PERSEDIAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPersediaan(formData)
    dispatch({ type: CREATE_PERSEDIAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PERSEDIAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePersediaan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PERSEDIAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePersediaan(formData, id)
    dispatch({ type: UPDATE_PERSEDIAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PERSEDIAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePersediaan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PERSEDIAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePersediaan(id)
    dispatch({ type: DELETE_PERSEDIAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PERSEDIAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
