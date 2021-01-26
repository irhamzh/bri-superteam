import {
  CREATE_SELEKSI_LANGSUNG_LOADING,
  CREATE_SELEKSI_LANGSUNG_SUCCESS,
  CREATE_SELEKSI_LANGSUNG_ERROR,
  UPDATE_SELEKSI_LANGSUNG_LOADING,
  UPDATE_SELEKSI_LANGSUNG_SUCCESS,
  UPDATE_SELEKSI_LANGSUNG_ERROR,
  DELETE_SELEKSI_LANGSUNG_LOADING,
  DELETE_SELEKSI_LANGSUNG_SUCCESS,
  DELETE_SELEKSI_LANGSUNG_ERROR,
} from './types'

const seleksiLangsungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_SELEKSI_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SELEKSI_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SELEKSI_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_SELEKSI_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SELEKSI_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SELEKSI_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_SELEKSI_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SELEKSI_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SELEKSI_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default seleksiLangsungReducer
