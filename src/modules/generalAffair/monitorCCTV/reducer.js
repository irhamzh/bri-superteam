import {
  CREATE_MONITOR_CCTV_LOADING,
  CREATE_MONITOR_CCTV_SUCCESS,
  CREATE_MONITOR_CCTV_ERROR,
  UPDATE_MONITOR_CCTV_LOADING,
  UPDATE_MONITOR_CCTV_SUCCESS,
  UPDATE_MONITOR_CCTV_ERROR,
  DELETE_MONITOR_CCTV_LOADING,
  DELETE_MONITOR_CCTV_SUCCESS,
  DELETE_MONITOR_CCTV_ERROR,
} from './types'

const monitorCCTVReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_MONITOR_CCTV_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_MONITOR_CCTV_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_MONITOR_CCTV_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_MONITOR_CCTV_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_MONITOR_CCTV_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_MONITOR_CCTV_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_MONITOR_CCTV_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_MONITOR_CCTV_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_MONITOR_CCTV_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default monitorCCTVReducer
