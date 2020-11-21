import {
  CREATE_PROVIDER_LOADING,
  CREATE_PROVIDER_SUCCESS,
  CREATE_PROVIDER_ERROR,
  UPDATE_PROVIDER_LOADING,
  UPDATE_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_ERROR,
  DELETE_PROVIDER_LOADING,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_ERROR,
} from './types'

const providerReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PROVIDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROVIDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PROVIDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROVIDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PROVIDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROVIDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROVIDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default providerReducer
