import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PENUNJUKAN_LANGSUNG_LOADING,
  CREATE_PENUNJUKAN_LANGSUNG_SUCCESS,
  CREATE_PENUNJUKAN_LANGSUNG_ERROR,
  UPDATE_PENUNJUKAN_LANGSUNG_LOADING,
  UPDATE_PENUNJUKAN_LANGSUNG_SUCCESS,
  UPDATE_PENUNJUKAN_LANGSUNG_ERROR,
  DELETE_PENUNJUKAN_LANGSUNG_LOADING,
  DELETE_PENUNJUKAN_LANGSUNG_SUCCESS,
  DELETE_PENUNJUKAN_LANGSUNG_ERROR,
} from './types'

export const createBarangPenunjukanLangsung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createBarangPenunjukanLangsung(formData)
    dispatch({ type: CREATE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: CREATE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateBarangPenunjukanLangsung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateBarangPenunjukanLangsung(formData, id)
    dispatch({ type: UPDATE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteBarangPenunjukanLangsung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteBarangPenunjukanLangsung(id)
    dispatch({ type: DELETE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: DELETE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createKonsultanPenunjukanLangsung = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.createKonsultanPenunjukanLangsung(formData)
    dispatch({ type: CREATE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: CREATE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateKonsultanPenunjukanLangsung = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateKonsultanPenunjukanLangsung(formData, id)
    dispatch({ type: UPDATE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: UPDATE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteKonsultanPenunjukanLangsung = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PENUNJUKAN_LANGSUNG_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteKonsultanPenunjukanLangsung(id)
    dispatch({ type: DELETE_PENUNJUKAN_LANGSUNG_SUCCESS, isLoading: false })

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
      type: DELETE_PENUNJUKAN_LANGSUNG_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
