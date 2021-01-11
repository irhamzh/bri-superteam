import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_BAHAN_BAKAR_LOADING,
  CREATE_BAHAN_BAKAR_SUCCESS,
  CREATE_BAHAN_BAKAR_ERROR,
  UPDATE_BAHAN_BAKAR_LOADING,
  UPDATE_BAHAN_BAKAR_SUCCESS,
  UPDATE_BAHAN_BAKAR_ERROR,
  DELETE_BAHAN_BAKAR_LOADING,
  DELETE_BAHAN_BAKAR_SUCCESS,
  DELETE_BAHAN_BAKAR_ERROR,
} from './types'

export const createGABahanBakar = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_BAHAN_BAKAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGABahanBakar(formData)
    dispatch({ type: CREATE_BAHAN_BAKAR_SUCCESS, isLoading: false })

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
      type: CREATE_BAHAN_BAKAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGABahanBakar = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_BAHAN_BAKAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGABahanBakar(formData, id)
    dispatch({ type: UPDATE_BAHAN_BAKAR_SUCCESS, isLoading: false })

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
      type: UPDATE_BAHAN_BAKAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGABahanBakar = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_BAHAN_BAKAR_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGABahanBakar(id)
    dispatch({ type: DELETE_BAHAN_BAKAR_SUCCESS, isLoading: false })

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
      type: DELETE_BAHAN_BAKAR_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
