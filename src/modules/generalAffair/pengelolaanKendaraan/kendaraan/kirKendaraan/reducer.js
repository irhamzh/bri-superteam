import {
  CREATE_KIR_KENDARAAN_LOADING,
  CREATE_KIR_KENDARAAN_SUCCESS,
  CREATE_KIR_KENDARAAN_ERROR,
  UPDATE_KIR_KENDARAAN_LOADING,
  UPDATE_KIR_KENDARAAN_SUCCESS,
  UPDATE_KIR_KENDARAAN_ERROR,
  DELETE_KIR_KENDARAAN_LOADING,
  DELETE_KIR_KENDARAAN_SUCCESS,
  DELETE_KIR_KENDARAAN_ERROR,
} from './types'

const kirKendaraanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KIR_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KIR_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KIR_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KIR_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KIR_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KIR_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KIR_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KIR_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KIR_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kirKendaraanReducer
