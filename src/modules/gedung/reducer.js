import {
  CREATE_GEDUNG_LOADING,
  CREATE_GEDUNG_SUCCESS,
  CREATE_GEDUNG_ERROR,
  UPDATE_GEDUNG_LOADING,
  UPDATE_GEDUNG_SUCCESS,
  UPDATE_GEDUNG_ERROR,
  DELETE_GEDUNG_LOADING,
  DELETE_GEDUNG_SUCCESS,
  DELETE_GEDUNG_ERROR,
} from './types'

const gedungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default gedungReducer
