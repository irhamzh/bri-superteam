import {
  CREATE_JENIS_GEDUNG_LOADING,
  CREATE_JENIS_GEDUNG_SUCCESS,
  CREATE_JENIS_GEDUNG_ERROR,
  UPDATE_JENIS_GEDUNG_LOADING,
  UPDATE_JENIS_GEDUNG_SUCCESS,
  UPDATE_JENIS_GEDUNG_ERROR,
  DELETE_JENIS_GEDUNG_LOADING,
  DELETE_JENIS_GEDUNG_SUCCESS,
  DELETE_JENIS_GEDUNG_ERROR,
} from './types'

const jenisGedungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_JENIS_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_JENIS_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_JENIS_GEDUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_GEDUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_GEDUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default jenisGedungReducer
