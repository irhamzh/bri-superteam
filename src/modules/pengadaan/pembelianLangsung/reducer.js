import {
  CREATE_PEMBELIAN_LANGSUNG_LOADING,
  CREATE_PEMBELIAN_LANGSUNG_SUCCESS,
  CREATE_PEMBELIAN_LANGSUNG_ERROR,
  UPDATE_PEMBELIAN_LANGSUNG_LOADING,
  UPDATE_PEMBELIAN_LANGSUNG_SUCCESS,
  UPDATE_PEMBELIAN_LANGSUNG_ERROR,
  DELETE_PEMBELIAN_LANGSUNG_LOADING,
  DELETE_PEMBELIAN_LANGSUNG_SUCCESS,
  DELETE_PEMBELIAN_LANGSUNG_ERROR,
} from './types'

const pembelianLangsungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PEMBELIAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEMBELIAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEMBELIAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PEMBELIAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEMBELIAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEMBELIAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PEMBELIAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEMBELIAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEMBELIAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pembelianLangsungReducer
