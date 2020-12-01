import {
  CREATE_KENDARAAN_LOADING,
  CREATE_KENDARAAN_SUCCESS,
  CREATE_KENDARAAN_ERROR,
  UPDATE_KENDARAAN_LOADING,
  UPDATE_KENDARAAN_SUCCESS,
  UPDATE_KENDARAAN_ERROR,
  DELETE_KENDARAAN_LOADING,
  DELETE_KENDARAAN_SUCCESS,
  DELETE_KENDARAAN_ERROR,
} from './types'

const kendaraanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kendaraanReducer
