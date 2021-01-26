import {
  CREATE_JENIS_RUANGAN_LOADING,
  CREATE_JENIS_RUANGAN_SUCCESS,
  CREATE_JENIS_RUANGAN_ERROR,
  UPDATE_JENIS_RUANGAN_LOADING,
  UPDATE_JENIS_RUANGAN_SUCCESS,
  UPDATE_JENIS_RUANGAN_ERROR,
  DELETE_JENIS_RUANGAN_LOADING,
  DELETE_JENIS_RUANGAN_SUCCESS,
  DELETE_JENIS_RUANGAN_ERROR,
} from './types'

const jenisRuanganReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_JENIS_RUANGAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_RUANGAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_RUANGAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_JENIS_RUANGAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_RUANGAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_RUANGAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_JENIS_RUANGAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_RUANGAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_RUANGAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default jenisRuanganReducer
