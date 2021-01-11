import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_PROCUREMENT_PENGADAAN_LOADING,
  CREATE_PROCUREMENT_PENGADAAN_SUCCESS,
  CREATE_PROCUREMENT_PENGADAAN_ERROR,
  UPDATE_PROCUREMENT_PENGADAAN_LOADING,
  UPDATE_PROCUREMENT_PENGADAAN_SUCCESS,
  UPDATE_PROCUREMENT_PENGADAAN_ERROR,
  DELETE_PROCUREMENT_PENGADAAN_LOADING,
  DELETE_PROCUREMENT_PENGADAAN_SUCCESS,
  DELETE_PROCUREMENT_PENGADAAN_ERROR,
} from './types'

export const createPREvaluasiPengadaan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPREvaluasiPengadaan(formData)
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePREvaluasiPengadaan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePREvaluasiPengadaan(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePREvaluasiPengadaan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePREvaluasiPengadaan(id)
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRTandaTerimaPengadaan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRTandaTerimaPengadaan(formData)
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRTandaTerimaPengadaan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRTandaTerimaPengadaan(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRTandaTerimaPengadaan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRTandaTerimaPengadaan(id)
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRPurchasePengadaan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRPurchasePengadaan(formData)
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRPurchasePengadaan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRPurchasePengadaan(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRPurchasePengadaan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRPurchasePengadaan(id)
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const createPRBarangJasaPengadaan = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createPRBarangJasaPengadaan(formData)
    dispatch({ type: CREATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: CREATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updatePRBarangJasaPengadaan = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updatePRBarangJasaPengadaan(formData, id)
    dispatch({ type: UPDATE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: UPDATE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deletePRBarangJasaPengadaan = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deletePRBarangJasaPengadaan(id)
    dispatch({ type: DELETE_PROCUREMENT_PENGADAAN_SUCCESS, isLoading: false })

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
      type: DELETE_PROCUREMENT_PENGADAAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
