import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PROCUREMENT_CATERING_LOADING,
  CREATE_PROCUREMENT_CATERING_SUCCESS,
  CREATE_PROCUREMENT_CATERING_ERROR,
  UPDATE_PROCUREMENT_CATERING_LOADING,
  UPDATE_PROCUREMENT_CATERING_SUCCESS,
  UPDATE_PROCUREMENT_CATERING_ERROR,
  DELETE_PROCUREMENT_CATERING_LOADING,
  DELETE_PROCUREMENT_CATERING_SUCCESS,
  DELETE_PROCUREMENT_CATERING_ERROR,
} from './types'

export const createPREvaluasiCatering = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPREvaluasiCatering(formData)
    dispatch({ type: CREATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePREvaluasiCatering = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePREvaluasiCatering(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePREvaluasiCatering = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePREvaluasiCatering(id)
    dispatch({ type: DELETE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRKlasifikasiCatering = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRKlasifikasiCatering(formData)
    dispatch({ type: CREATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRKlasifikasiCatering = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRKlasifikasiCatering(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRKlasifikasiCatering = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRKlasifikasiCatering(id)
    dispatch({ type: DELETE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRCatering = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRCatering(formData)
    dispatch({ type: CREATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRCatering = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRCatering(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRCatering = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_CATERING_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRCatering(id)
    dispatch({ type: DELETE_PROCUREMENT_CATERING_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_CATERING_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
