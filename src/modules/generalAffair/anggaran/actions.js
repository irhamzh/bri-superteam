import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  CREATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  CREATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
  DELETE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  DELETE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  DELETE_GENERAL_AFFAIR_ANGGARAN_ERROR,
} from './types'

export const createGAAnggaran = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_GENERAL_AFFAIR_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAAnggaran(formData)
    dispatch({ type: CREATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS, isLoading: false })

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
      type: CREATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAAnggaran = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_GENERAL_AFFAIR_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAAnggaran(formData, id)
    dispatch({ type: UPDATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS, isLoading: false })

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
      type: UPDATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAAnggaran = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_GENERAL_AFFAIR_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAAnggaran(id)
    dispatch({ type: DELETE_GENERAL_AFFAIR_ANGGARAN_SUCCESS, isLoading: false })

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
      type: DELETE_GENERAL_AFFAIR_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
