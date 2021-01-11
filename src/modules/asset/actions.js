import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_ASSET_LOADING,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_ERROR,
  UPDATE_ASSET_LOADING,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_ERROR,
  DELETE_ASSET_LOADING,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_ERROR,
  UPLOAD_ASSET_LOADING,
  UPLOAD_ASSET_SUCCESS,
  UPLOAD_ASSET_ERROR,
} from './types'

export const createAsset = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_ASSET_LOADING, isLoading: true })
    // Call API
    const res = await Service.createAsset(formData)
    dispatch({ type: CREATE_ASSET_SUCCESS, isLoading: false })

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
      type: CREATE_ASSET_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateAsset = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_ASSET_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateAsset(formData, id)
    dispatch({ type: UPDATE_ASSET_SUCCESS, isLoading: false })

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
      type: UPDATE_ASSET_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteAsset = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_ASSET_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteAsset(id)
    dispatch({ type: DELETE_ASSET_SUCCESS, isLoading: false })

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
      type: DELETE_ASSET_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const uploadAsset = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPLOAD_ASSET_LOADING, isLoading: true })
    // Call API
    const res = await Service.uploadAsset(formData)
    dispatch({ type: UPLOAD_ASSET_SUCCESS, isLoading: false })

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
      type: UPLOAD_ASSET_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
