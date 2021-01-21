import Service from '../../../../config/services'
import { AlertMessage } from '../../../../helpers'
import {
  CREATE_INTERNSHIP_LOADING,
  CREATE_INTERNSHIP_SUCCESS,
  CREATE_INTERNSHIP_ERROR,
  UPDATE_INTERNSHIP_LOADING,
  UPDATE_INTERNSHIP_SUCCESS,
  UPDATE_INTERNSHIP_ERROR,
  DELETE_INTERNSHIP_LOADING,
  DELETE_INTERNSHIP_SUCCESS,
  DELETE_INTERNSHIP_ERROR,
} from './types'

export const createGAInternship = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_INTERNSHIP_LOADING, isLoading: true })
    // Call API
    const res = await Service.createGAInternship(formData)
    dispatch({ type: CREATE_INTERNSHIP_SUCCESS, isLoading: false })

    paramsResponse.title = 'Created'
    paramsResponse.text = 'Berhasil create data'
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
      type: CREATE_INTERNSHIP_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateGAInternship = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_INTERNSHIP_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateGAInternship(formData, id)
    dispatch({ type: UPDATE_INTERNSHIP_SUCCESS, isLoading: false })

    paramsResponse.title = 'Success'
    paramsResponse.text = 'Berhasil update data'
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
      type: UPDATE_INTERNSHIP_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteGAInternship = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_INTERNSHIP_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteGAInternship(id)
    dispatch({ type: DELETE_INTERNSHIP_SUCCESS, isLoading: false })

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
      type: DELETE_INTERNSHIP_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
