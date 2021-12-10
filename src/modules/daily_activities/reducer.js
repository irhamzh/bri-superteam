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

  const dailyActivitiesReducer = (state = {}, action) => {
    switch (action.type) {
      // created
      case CREATE_DAILY_ACTIVITIES_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case CREATE_DAILY_ACTIVITIES_SUCCESS:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case CREATE_DAILY_ACTIVITIES_ERROR:
        return {
          ...state,
          message: action.payload,
          isLoading: action.isLoading,
        }
  
      // updated
      case UPDATE_DAILY_ACTIVITIES_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case UPDATE_DAILY_ACTIVITIES_SUCCESS:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case UPDATE_DAILY_ACTIVITIES_ERROR:
        return {
          ...state,
          message: action.payload,
          isLoading: action.isLoading,
        }
  
      // deleted
      case DELETE_DAILY_ACTIVITIES_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case DELETE_DAILY_ACTIVITIES_SUCCESS:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case DELETE_DAILY_ACTIVITIES_ERROR:
        return {
          ...state,
          message: action.payload,
          isLoading: action.isLoading,
        }
  
      default:
        return state
    }
  }
  
  export default dailyActivitiesReducer
  