import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_EVALUASI_KLINIK_LOADING,
  CREATE_EVALUASI_KLINIK_SUCCESS,
  CREATE_EVALUASI_KLINIK_ERROR,
  UPDATE_EVALUASI_KLINIK_LOADING,
  UPDATE_EVALUASI_KLINIK_SUCCESS,
  UPDATE_EVALUASI_KLINIK_ERROR,
  DELETE_EVALUASI_KLINIK_LOADING,
  DELETE_EVALUASI_KLINIK_SUCCESS,
  DELETE_EVALUASI_KLINIK_ERROR,
} from './types'

export const createEvaluasiKlinik = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_EVALUASI_KLINIK_LOADING, isLoading: true })
    // Call API
    const res = await Service.createEvaluasiKlinik(formData)
    dispatch({ type: CREATE_EVALUASI_KLINIK_SUCCESS, isLoading: false })

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
      type: CREATE_EVALUASI_KLINIK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateEvaluasiKlinik = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_EVALUASI_KLINIK_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateEvaluasiKlinik(formData, id)
    dispatch({ type: UPDATE_EVALUASI_KLINIK_SUCCESS, isLoading: false })

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
      type: UPDATE_EVALUASI_KLINIK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteEvaluasiKlinik = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_EVALUASI_KLINIK_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteEvaluasiKlinik(id)
    dispatch({ type: DELETE_EVALUASI_KLINIK_SUCCESS, isLoading: false })

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
      type: DELETE_EVALUASI_KLINIK_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
