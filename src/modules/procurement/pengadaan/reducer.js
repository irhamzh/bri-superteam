import {
  CREATE_PROCUREMENT_PENGADAAN_LOADING,
  CREATE_PROCUREMENT_PENGADAAN_SUCCESS,
  CREATE_PROCUREMENT_PENGADAAN_ERROR,
  UPDATE_PROCUREMENT_PENGADAAN_LOADING,
  UPDATE_PROCUREMENT_PENGADAAN_SUCCESS,
  UPDATE_PROCUREMENT_PENGADAAN_ERROR,
  DELETE_PROCUREMENT_PENGADAAN_LOADING,
  DELETE_PROCUREMENT_PENGADAAN_SUCCESS,
  DELETE_PROCUREMENT_PENGADAAN_ERROR,
} from './types'

const pengadaanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PROCUREMENT_PENGADAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_PENGADAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_PENGADAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PROCUREMENT_PENGADAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_PENGADAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_PENGADAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PROCUREMENT_PENGADAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_PENGADAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_PENGADAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pengadaanReducer
