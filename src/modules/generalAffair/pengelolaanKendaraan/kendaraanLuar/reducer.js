import {
  CREATE_KENDARAAN_LUAR_LOADING,
  CREATE_KENDARAAN_LUAR_SUCCESS,
  CREATE_KENDARAAN_LUAR_ERROR,
  UPDATE_KENDARAAN_LUAR_LOADING,
  UPDATE_KENDARAAN_LUAR_SUCCESS,
  UPDATE_KENDARAAN_LUAR_ERROR,
  DELETE_KENDARAAN_LUAR_LOADING,
  DELETE_KENDARAAN_LUAR_SUCCESS,
  DELETE_KENDARAAN_LUAR_ERROR,
} from './types'

const kendaraanLuarReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KENDARAAN_LUAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KENDARAAN_LUAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KENDARAAN_LUAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KENDARAAN_LUAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KENDARAAN_LUAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KENDARAAN_LUAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KENDARAAN_LUAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KENDARAAN_LUAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KENDARAAN_LUAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kendaraanLuarReducer
