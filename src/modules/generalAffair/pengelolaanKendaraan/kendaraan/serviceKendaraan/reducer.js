import {
  CREATE_SERVICE_KENDARAAN_LOADING,
  CREATE_SERVICE_KENDARAAN_SUCCESS,
  CREATE_SERVICE_KENDARAAN_ERROR,
  UPDATE_SERVICE_KENDARAAN_LOADING,
  UPDATE_SERVICE_KENDARAAN_SUCCESS,
  UPDATE_SERVICE_KENDARAAN_ERROR,
  DELETE_SERVICE_KENDARAAN_LOADING,
  DELETE_SERVICE_KENDARAAN_SUCCESS,
  DELETE_SERVICE_KENDARAAN_ERROR,
} from './types'

const serviceKendaraanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_SERVICE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SERVICE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SERVICE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_SERVICE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SERVICE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SERVICE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_SERVICE_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SERVICE_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SERVICE_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default serviceKendaraanReducer
