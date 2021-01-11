import {
  CREATE_PAJAK_KENDARAAN_LOADING,
  CREATE_PAJAK_KENDARAAN_SUCCESS,
  CREATE_PAJAK_KENDARAAN_ERROR,
  UPDATE_PAJAK_KENDARAAN_LOADING,
  UPDATE_PAJAK_KENDARAAN_SUCCESS,
  UPDATE_PAJAK_KENDARAAN_ERROR,
  DELETE_PAJAK_KENDARAAN_LOADING,
  DELETE_PAJAK_KENDARAAN_SUCCESS,
  DELETE_PAJAK_KENDARAAN_ERROR,
} from './types'

const pajakKendaraanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PAJAK_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAJAK_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAJAK_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PAJAK_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAJAK_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAJAK_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PAJAK_KENDARAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAJAK_KENDARAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAJAK_KENDARAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pajakKendaraanReducer
