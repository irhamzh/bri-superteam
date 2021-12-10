import Service from '../../config/services'
import { AlertMessage } from '../../helpers'
import {
  CREATE_DAILY_ACTIVITIES_LOADING,
  CREATE_DAILY_ACTIVITIES_SUCCESS,
  CREATE_DAILY_ACTIVITIES_ERROR,
  UPDATE_DAILY_ACTIVITIES_LOADING,
  UPDATE_DAILY_ACTIVITIES_SUCCESS,
  UPDATE_DAILY_ACTIVITIES_ERROR,
  DELETE_DAILY_ACTIVITIES_LOADING,
  DELETE_DAILY_ACTIVITIES_SUCCESS,
  DELETE_DAILY_ACTIVITIES_ERROR,
} from './types'

export const createDailyActivities = (formData, refresh) => async (dispatch) => {
    let ObjError = ''
    const paramsResponse = {}
  
    try {
      dispatch({ type: CREATE_DAILY_ACTIVITIES_LOADING, isLoading: true })
      // Call API
      const res = await Service.createDailyActivities(formData)
      dispatch({ type: CREATE_DAILY_ACTIVITIES_SUCCESS, isLoading: false })
  
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
        type: CREATE_DAILY_ACTIVITIES_ERROR,
        payload: ObjError,
        isLoading: false,
      })
      AlertMessage.error(err)
    }
  }

  export const deleteDailyActivities = (id, refresh) => async (dispatch) => {
    let ObjError = ''
    const paramsResponse = {}
  
    try {
      dispatch({ type: DELETE_DAILY_ACTIVITIES_LOADING, isLoading: true })
      // Call API
      const res = await Service.deleteDailyActivities(id)
      dispatch({ type: DELETE_DAILY_ACTIVITIES_SUCCESS, isLoading: false })
  
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
        type: DELETE_DAILY_ACTIVITIES_ERROR,
        payload: ObjError,
        isLoading: false,
      })
      AlertMessage.error(err)
    }
  }

  export const updateDailyActivities = (formData, id, refresh) => async (dispatch) => {
    let ObjError = ''
    const paramsResponse = {}
  
    try {
      dispatch({ type: UPDATE_DAILY_ACTIVITIES_LOADING, isLoading: true })
      // Call API
      const res = await Service.updateDailyActivities(formData, id)
      dispatch({ type: UPDATE_DAILY_ACTIVITIES_SUCCESS, isLoading: false })
      refresh()
      // paramsResponse.title = 'Success'
      // paramsResponse.text = res.data.message
      // AlertMessage.success(paramsResponse).then(() => {
      //   if (refresh) {
      //     refresh()
      //   } else {
      //     window.location.reload()
      //   }
      // })
    } catch (err) {
      ObjError = err.response && err.response.data.message
  
      dispatch({
        type: UPDATE_DAILY_ACTIVITIES_ERROR,
        payload: ObjError,
        isLoading: false,
      })
      AlertMessage.error(err)
    }
  }