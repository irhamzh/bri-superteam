import Service from '../../../config/services'
import { AlertMessage } from '../../../helpers'
import {
  CREATE_FIXED_ASSET_ANGGARAN_LOADING,
  CREATE_FIXED_ASSET_ANGGARAN_SUCCESS,
  CREATE_FIXED_ASSET_ANGGARAN_ERROR,
  UPDATE_FIXED_ASSET_ANGGARAN_LOADING,
  UPDATE_FIXED_ASSET_ANGGARAN_SUCCESS,
  UPDATE_FIXED_ASSET_ANGGARAN_ERROR,
  DELETE_FIXED_ASSET_ANGGARAN_LOADING,
  DELETE_FIXED_ASSET_ANGGARAN_SUCCESS,
  DELETE_FIXED_ASSET_ANGGARAN_ERROR,
} from './types'

export const createFXAnggaran = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_FIXED_ASSET_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.createFXAnggaran(formData)
    dispatch({ type: CREATE_FIXED_ASSET_ANGGARAN_SUCCESS, isLoading: false })

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
      type: CREATE_FIXED_ASSET_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateFXAnggaran = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_FIXED_ASSET_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateFXAnggaran(formData, id)
    dispatch({ type: UPDATE_FIXED_ASSET_ANGGARAN_SUCCESS, isLoading: false })

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
      type: UPDATE_FIXED_ASSET_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteFXAnggaran = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_FIXED_ASSET_ANGGARAN_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteFXAnggaran(id)
    dispatch({ type: DELETE_FIXED_ASSET_ANGGARAN_SUCCESS, isLoading: false })

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
      type: DELETE_FIXED_ASSET_ANGGARAN_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
