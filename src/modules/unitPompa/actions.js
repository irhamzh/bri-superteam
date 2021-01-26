import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_UNIT_POMPA_LOADING,
  CREATE_UNIT_POMPA_SUCCESS,
  CREATE_UNIT_POMPA_ERROR,
  UPDATE_UNIT_POMPA_LOADING,
  UPDATE_UNIT_POMPA_SUCCESS,
  UPDATE_UNIT_POMPA_ERROR,
  DELETE_UNIT_POMPA_LOADING,
  DELETE_UNIT_POMPA_SUCCESS,
  DELETE_UNIT_POMPA_ERROR,
} from './types'

export const createUnitPompa = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_UNIT_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.createUnitPompa(formData)
    dispatch({ type: CREATE_UNIT_POMPA_SUCCESS, isLoading: false })

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
      type: CREATE_UNIT_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateUnitPompa = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_UNIT_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateUnitPompa(formData, id)
    dispatch({ type: UPDATE_UNIT_POMPA_SUCCESS, isLoading: false })

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
      type: UPDATE_UNIT_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteUnitPompa = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_UNIT_POMPA_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteUnitPompa(id)
    dispatch({ type: DELETE_UNIT_POMPA_SUCCESS, isLoading: false })

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
      type: DELETE_UNIT_POMPA_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
