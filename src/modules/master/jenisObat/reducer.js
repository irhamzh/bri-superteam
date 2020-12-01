import {
  CREATE_JENIS_OBAT_LOADING,
  CREATE_JENIS_OBAT_SUCCESS,
  CREATE_JENIS_OBAT_ERROR,
  UPDATE_JENIS_OBAT_LOADING,
  UPDATE_JENIS_OBAT_SUCCESS,
  UPDATE_JENIS_OBAT_ERROR,
  DELETE_JENIS_OBAT_LOADING,
  DELETE_JENIS_OBAT_SUCCESS,
  DELETE_JENIS_OBAT_ERROR,
} from './types'

const jenisObatReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_JENIS_OBAT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_OBAT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_OBAT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_JENIS_OBAT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_OBAT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_OBAT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_JENIS_OBAT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_OBAT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_OBAT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default jenisObatReducer
