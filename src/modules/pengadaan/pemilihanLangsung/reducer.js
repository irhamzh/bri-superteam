import {
  CREATE_PEMILIHAN_LANGSUNG_LOADING,
  CREATE_PEMILIHAN_LANGSUNG_SUCCESS,
  CREATE_PEMILIHAN_LANGSUNG_ERROR,
  UPDATE_PEMILIHAN_LANGSUNG_LOADING,
  UPDATE_PEMILIHAN_LANGSUNG_SUCCESS,
  UPDATE_PEMILIHAN_LANGSUNG_ERROR,
  DELETE_PEMILIHAN_LANGSUNG_LOADING,
  DELETE_PEMILIHAN_LANGSUNG_SUCCESS,
  DELETE_PEMILIHAN_LANGSUNG_ERROR,
} from './types'

const pemilihanLangsungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PEMILIHAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEMILIHAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEMILIHAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PEMILIHAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEMILIHAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEMILIHAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PEMILIHAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEMILIHAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEMILIHAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pemilihanLangsungReducer
