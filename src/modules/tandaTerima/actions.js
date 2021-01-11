import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_TANDA_TERIMA_LOADING,
  CREATE_TANDA_TERIMA_SUCCESS,
  CREATE_TANDA_TERIMA_ERROR,
  UPDATE_TANDA_TERIMA_LOADING,
  UPDATE_TANDA_TERIMA_SUCCESS,
  UPDATE_TANDA_TERIMA_ERROR,
  DELETE_TANDA_TERIMA_LOADING,
  DELETE_TANDA_TERIMA_SUCCESS,
  DELETE_TANDA_TERIMA_ERROR,
} from './types'

export const createTandaTerima = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_TANDA_TERIMA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createTandaTerima(formData)
    dispatch({ type: CREATE_TANDA_TERIMA_SUCCESS, isLoading: false })

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
      type: CREATE_TANDA_TERIMA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateTandaTerima = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_TANDA_TERIMA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateTandaTerima(formData, id)
    dispatch({ type: UPDATE_TANDA_TERIMA_SUCCESS, isLoading: false })

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
      type: UPDATE_TANDA_TERIMA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteTandaTerima = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_TANDA_TERIMA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteTandaTerima(id)
    dispatch({ type: DELETE_TANDA_TERIMA_SUCCESS, isLoading: false })

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
      type: DELETE_TANDA_TERIMA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
