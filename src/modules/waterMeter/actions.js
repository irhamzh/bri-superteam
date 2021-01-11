import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_WATER_METER_LOADING,
  CREATE_WATER_METER_SUCCESS,
  CREATE_WATER_METER_ERROR,
  UPDATE_WATER_METER_LOADING,
  UPDATE_WATER_METER_SUCCESS,
  UPDATE_WATER_METER_ERROR,
  DELETE_WATER_METER_LOADING,
  DELETE_WATER_METER_SUCCESS,
  DELETE_WATER_METER_ERROR,
} from './types'

export const createWaterMeter = (formData, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: CREATE_WATER_METER_LOADING, isLoading: true })
    // Call API
    const res = await Service.createWaterMeter(formData)
    dispatch({ type: CREATE_WATER_METER_SUCCESS, isLoading: false })

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
      type: CREATE_WATER_METER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const updateWaterMeter = (formData, id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: UPDATE_WATER_METER_LOADING, isLoading: true })
    // Call API
    const res = await Service.updateWaterMeter(formData, id)
    dispatch({ type: UPDATE_WATER_METER_SUCCESS, isLoading: false })

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
      type: UPDATE_WATER_METER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}

export const deleteWaterMeter = (id, refresh) => async (dispatch) => {
  let ObjError = ''
  const paramsResponse = {}

  try {
    dispatch({ type: DELETE_WATER_METER_LOADING, isLoading: true })
    // Call API
    const res = await Service.deleteWaterMeter(id)
    dispatch({ type: DELETE_WATER_METER_SUCCESS, isLoading: false })

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
      type: DELETE_WATER_METER_ERROR,
      payload: ObjError,
      isLoading: false,
    })
    AlertMessage.error(err)
  }
}
