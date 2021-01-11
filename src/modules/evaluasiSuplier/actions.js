import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_EVALUASI_SUPPLIER_LOADING,
  CREATE_EVALUASI_SUPPLIER_SUCCESS,
  CREATE_EVALUASI_SUPPLIER_ERROR,
  UPDATE_EVALUASI_SUPPLIER_LOADING,
  UPDATE_EVALUASI_SUPPLIER_SUCCESS,
  UPDATE_EVALUASI_SUPPLIER_ERROR,
  DELETE_EVALUASI_SUPPLIER_LOADING,
  DELETE_EVALUASI_SUPPLIER_SUCCESS,
  DELETE_EVALUASI_SUPPLIER_ERROR,
} from './types'

export const createEvaluasiSupplier = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_EVALUASI_SUPPLIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createEvaluasiSupplier(formData)
    dispatch({ type: CREATE_EVALUASI_SUPPLIER_SUCCESS, isLoading: false })

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
      type: CREATE_EVALUASI_SUPPLIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateEvaluasiSupplier = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_EVALUASI_SUPPLIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateEvaluasiSupplier(formData, id)
    dispatch({ type: UPDATE_EVALUASI_SUPPLIER_SUCCESS, isLoading: false })

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
      type: UPDATE_EVALUASI_SUPPLIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteEvaluasiSupplier = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_EVALUASI_SUPPLIER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteEvaluasiSupplier(id)
    dispatch({ type: DELETE_EVALUASI_SUPPLIER_SUCCESS, isLoading: false })

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
      type: DELETE_EVALUASI_SUPPLIER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
