import {
  CREATE_EVALUASI_SUPPLIER_LOADING,
  CREATE_EVALUASI_SUPPLIER_SUCCESS,
  CREATE_EVALUASI_SUPPLIER_ERROR,
  UPDATE_EVALUASI_SUPPLIER_LOADING,
  UPDATE_EVALUASI_SUPPLIER_SUCCESS,
  UPDATE_EVALUASI_SUPPLIER_ERROR,
  DELETE_EVALUASI_SUPPLIER_LOADING,
  DELETE_EVALUASI_SUPPLIER_SUCCESS,
  DELETE_EVALUASI_SUPPLIER_ERROR,
} from './types'

const evaluasiSupplierReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_EVALUASI_SUPPLIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_EVALUASI_SUPPLIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_EVALUASI_SUPPLIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_EVALUASI_SUPPLIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_EVALUASI_SUPPLIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_EVALUASI_SUPPLIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_EVALUASI_SUPPLIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_EVALUASI_SUPPLIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_EVALUASI_SUPPLIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default evaluasiSupplierReducer
