import {
  CREATE_PENUGASAN_DRIVER_LOADING,
  CREATE_PENUGASAN_DRIVER_SUCCESS,
  CREATE_PENUGASAN_DRIVER_ERROR,
  UPDATE_PENUGASAN_DRIVER_LOADING,
  UPDATE_PENUGASAN_DRIVER_SUCCESS,
  UPDATE_PENUGASAN_DRIVER_ERROR,
  DELETE_PENUGASAN_DRIVER_LOADING,
  DELETE_PENUGASAN_DRIVER_SUCCESS,
  DELETE_PENUGASAN_DRIVER_ERROR,
} from './types'

const penugasanDriverReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PENUGASAN_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENUGASAN_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENUGASAN_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PENUGASAN_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENUGASAN_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENUGASAN_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PENUGASAN_DRIVER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENUGASAN_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENUGASAN_DRIVER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default penugasanDriverReducer
