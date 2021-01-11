import {
  CREATE_KELENGKAPAN_KENDARAAN_LOADING,
  CREATE_KELENGKAPAN_KENDARAAN_SUCCESS,
  CREATE_KELENGKAPAN_KENDARAAN_ERROR,
  UPDATE_KELENGKAPAN_KENDARAAN_LOADING,
  UPDATE_KELENGKAPAN_KENDARAAN_SUCCESS,
  UPDATE_KELENGKAPAN_KENDARAAN_ERROR,
  DELETE_KELENGKAPAN_KENDARAAN_LOADING,
  DELETE_KELENGKAPAN_KENDARAAN_SUCCESS,
  DELETE_KELENGKAPAN_KENDARAAN_ERROR,
} from './types'

const kelengkapanKendaraanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KELENGKAPAN_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KELENGKAPAN_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KELENGKAPAN_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KELENGKAPAN_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KELENGKAPAN_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KELENGKAPAN_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KELENGKAPAN_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KELENGKAPAN_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KELENGKAPAN_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kelengkapanKendaraanReducer
