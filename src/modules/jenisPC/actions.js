import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_JENIS_PC_LOADING,
  CREATE_JENIS_PC_SUCCESS,
  CREATE_JENIS_PC_ERROR,
  UPDATE_JENIS_PC_LOADING,
  UPDATE_JENIS_PC_SUCCESS,
  UPDATE_JENIS_PC_ERROR,
  DELETE_JENIS_PC_LOADING,
  DELETE_JENIS_PC_SUCCESS,
  DELETE_JENIS_PC_ERROR,
} from './types'

export const createJenisPC = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_JENIS_PC_LOADING, isLoading: true })
    // Call API
    const res = await Service.createJenisPC(formData)
    dispatch({ type: CREATE_JENIS_PC_SUCCESS, isLoading: false })

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
      type: CREATE_JENIS_PC_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateJenisPC = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_JENIS_PC_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateJenisPC(formData, id)
    dispatch({ type: UPDATE_JENIS_PC_SUCCESS, isLoading: false })

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
      type: UPDATE_JENIS_PC_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteJenisPC = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_JENIS_PC_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteJenisPC(id)
    dispatch({ type: DELETE_JENIS_PC_SUCCESS, isLoading: false })

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
      type: DELETE_JENIS_PC_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
