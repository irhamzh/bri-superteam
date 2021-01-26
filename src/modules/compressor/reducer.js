import {
  CREATE_COMPRESSOR_LOADING,
  CREATE_COMPRESSOR_SUCCESS,
  CREATE_COMPRESSOR_ERROR,
  UPDATE_COMPRESSOR_LOADING,
  UPDATE_COMPRESSOR_SUCCESS,
  UPDATE_COMPRESSOR_ERROR,
  DELETE_COMPRESSOR_LOADING,
  DELETE_COMPRESSOR_SUCCESS,
  DELETE_COMPRESSOR_ERROR,
} from './types'

const compressorReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_COMPRESSOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_COMPRESSOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_COMPRESSOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_COMPRESSOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_COMPRESSOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_COMPRESSOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_COMPRESSOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_COMPRESSOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_COMPRESSOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default compressorReducer
