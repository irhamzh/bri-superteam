import {
  CREATE_JENIS_BARANG_LOADING,
  CREATE_JENIS_BARANG_SUCCESS,
  CREATE_JENIS_BARANG_ERROR,
  UPDATE_JENIS_BARANG_LOADING,
  UPDATE_JENIS_BARANG_SUCCESS,
  UPDATE_JENIS_BARANG_ERROR,
  DELETE_JENIS_BARANG_LOADING,
  DELETE_JENIS_BARANG_SUCCESS,
  DELETE_JENIS_BARANG_ERROR,
} from './types'

const jenisBarangReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_JENIS_BARANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_BARANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_BARANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_JENIS_BARANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_BARANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_BARANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_JENIS_BARANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_BARANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_BARANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default jenisBarangReducer
