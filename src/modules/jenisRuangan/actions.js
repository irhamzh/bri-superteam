import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_JENIS_RUANGAN_LOADING,
  CREATE_JENIS_RUANGAN_SUCCESS,
  CREATE_JENIS_RUANGAN_ERROR,
  UPDATE_JENIS_RUANGAN_LOADING,
  UPDATE_JENIS_RUANGAN_SUCCESS,
  UPDATE_JENIS_RUANGAN_ERROR,
  DELETE_JENIS_RUANGAN_LOADING,
  DELETE_JENIS_RUANGAN_SUCCESS,
  DELETE_JENIS_RUANGAN_ERROR,
} from './types'

export const createJenisRuangan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_JENIS_RUANGAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createJenisRuangan(formData)
    dispatch({ type: CREATE_JENIS_RUANGAN_SUCCESS, isLoading: false })

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
      type: CREATE_JENIS_RUANGAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateJenisRuangan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_JENIS_RUANGAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateJenisRuangan(formData, id)
    dispatch({ type: UPDATE_JENIS_RUANGAN_SUCCESS, isLoading: false })

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
      type: UPDATE_JENIS_RUANGAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteJenisRuangan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_JENIS_RUANGAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteJenisRuangan(id)
    dispatch({ type: DELETE_JENIS_RUANGAN_SUCCESS, isLoading: false })

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
      type: DELETE_JENIS_RUANGAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
