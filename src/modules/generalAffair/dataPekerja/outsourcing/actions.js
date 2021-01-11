import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_PENILAIAN_OUTSOURCING_LOADING,
  CREATE_PENILAIAN_OUTSOURCING_SUCCESS,
  CREATE_PENILAIAN_OUTSOURCING_ERROR,
  UPDATE_PENILAIAN_OUTSOURCING_LOADING,
  UPDATE_PENILAIAN_OUTSOURCING_SUCCESS,
  UPDATE_PENILAIAN_OUTSOURCING_ERROR,
  DELETE_PENILAIAN_OUTSOURCING_LOADING,
  DELETE_PENILAIAN_OUTSOURCING_SUCCESS,
  DELETE_PENILAIAN_OUTSOURCING_ERROR,
  UPLOAD_PENILAIAN_OUTSOURCING_LOADING,
  UPLOAD_PENILAIAN_OUTSOURCING_SUCCESS,
  UPLOAD_PENILAIAN_OUTSOURCING_ERROR,
} from './types'

export const createGAPenilaianOutsourcing = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENILAIAN_OUTSOURCING_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAPenilaianOutsourcing(formData)
    dispatch({ type: CREATE_PENILAIAN_OUTSOURCING_SUCCESS, isLoading: false })

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
      type: CREATE_PENILAIAN_OUTSOURCING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAPenilaianOutsourcing = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENILAIAN_OUTSOURCING_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAPenilaianOutsourcing(formData, id)
    dispatch({ type: UPDATE_PENILAIAN_OUTSOURCING_SUCCESS, isLoading: false })

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
      type: UPDATE_PENILAIAN_OUTSOURCING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAPenilaianOutsourcing = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENILAIAN_OUTSOURCING_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAPenilaianOutsourcing(id)
    dispatch({ type: DELETE_PENILAIAN_OUTSOURCING_SUCCESS, isLoading: false })

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
      type: DELETE_PENILAIAN_OUTSOURCING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const uploadGAPenilaianOutsourcing = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_PENILAIAN_OUTSOURCING_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadGAPenilaianOutsourcing(formData)
    dispatch({ type: UPLOAD_PENILAIAN_OUTSOURCING_SUCCESS, isLoading: false })

    paramsResponse.title = 'Uploaded'
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
      type: UPLOAD_PENILAIAN_OUTSOURCING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
