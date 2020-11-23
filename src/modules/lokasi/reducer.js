import {
  CREATE_LOKASI_LOADING,
  CREATE_LOKASI_SUCCESS,
  CREATE_LOKASI_ERROR,
  UPDATE_LOKASI_LOADING,
  UPDATE_LOKASI_SUCCESS,
  UPDATE_LOKASI_ERROR,
  DELETE_LOKASI_LOADING,
  DELETE_LOKASI_SUCCESS,
  DELETE_LOKASI_ERROR,
} from './types'

const lokasiReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_LOKASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LOKASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LOKASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_LOKASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LOKASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LOKASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_LOKASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LOKASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LOKASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default lokasiReducer
