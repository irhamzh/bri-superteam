import {
  CREATE_AKTIVITAS_DRIVER_LOADING,
  CREATE_AKTIVITAS_DRIVER_SUCCESS,
  CREATE_AKTIVITAS_DRIVER_ERROR,
  UPDATE_AKTIVITAS_DRIVER_LOADING,
  UPDATE_AKTIVITAS_DRIVER_SUCCESS,
  UPDATE_AKTIVITAS_DRIVER_ERROR,
  DELETE_AKTIVITAS_DRIVER_LOADING,
  DELETE_AKTIVITAS_DRIVER_SUCCESS,
  DELETE_AKTIVITAS_DRIVER_ERROR,
} from './types'

const driverReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_AKTIVITAS_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_AKTIVITAS_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_AKTIVITAS_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default driverReducer
