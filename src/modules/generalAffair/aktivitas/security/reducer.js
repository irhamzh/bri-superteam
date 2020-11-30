import {
  CREATE_AKTIVITAS_SECURITY_LOADING,
  CREATE_AKTIVITAS_SECURITY_SUCCESS,
  CREATE_AKTIVITAS_SECURITY_ERROR,
  UPDATE_AKTIVITAS_SECURITY_LOADING,
  UPDATE_AKTIVITAS_SECURITY_SUCCESS,
  UPDATE_AKTIVITAS_SECURITY_ERROR,
  DELETE_AKTIVITAS_SECURITY_LOADING,
  DELETE_AKTIVITAS_SECURITY_SUCCESS,
  DELETE_AKTIVITAS_SECURITY_ERROR,
} from './types'

const securityReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_AKTIVITAS_SECURITY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_SECURITY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_SECURITY_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_AKTIVITAS_SECURITY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_SECURITY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_SECURITY_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_AKTIVITAS_SECURITY_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_SECURITY_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_SECURITY_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default securityReducer
