import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PROCUREMENT_HOTEL_LOADING,
  CREATE_PROCUREMENT_HOTEL_SUCCESS,
  CREATE_PROCUREMENT_HOTEL_ERROR,
  UPDATE_PROCUREMENT_HOTEL_LOADING,
  UPDATE_PROCUREMENT_HOTEL_SUCCESS,
  UPDATE_PROCUREMENT_HOTEL_ERROR,
  DELETE_PROCUREMENT_HOTEL_LOADING,
  DELETE_PROCUREMENT_HOTEL_SUCCESS,
  DELETE_PROCUREMENT_HOTEL_ERROR,
} from './types'

export const createPREvaluasiHotel = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPREvaluasiHotel(formData)
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePREvaluasiHotel = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePREvaluasiHotel(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePREvaluasiHotel = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePREvaluasiHotel(id)
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRKlasifikasiHotel = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRKlasifikasiHotel(formData)
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRKlasifikasiHotel = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRKlasifikasiHotel(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRKlasifikasiHotel = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRKlasifikasiHotel(id)
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRHotel = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRHotel(formData)
    dispatch({ type: CREATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRHotel = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRHotel(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRHotel = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRHotel(id)
    dispatch({ type: DELETE_PROCUREMENT_HOTEL_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_HOTEL_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
