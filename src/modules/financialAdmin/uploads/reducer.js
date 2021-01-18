import {
  CREATE_UPLOAD_FINANCIAL_LOADING,
  CREATE_UPLOAD_FINANCIAL_SUCCESS,
  CREATE_UPLOAD_FINANCIAL_ERROR,
  UPDATE_UPLOAD_FINANCIAL_LOADING,
  UPDATE_UPLOAD_FINANCIAL_SUCCESS,
  UPDATE_UPLOAD_FINANCIAL_ERROR,
  DELETE_UPLOAD_FINANCIAL_LOADING,
  DELETE_UPLOAD_FINANCIAL_SUCCESS,
  DELETE_UPLOAD_FINANCIAL_ERROR,
} from './types'

const tambahanKasReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_UPLOAD_FINANCIAL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UPLOAD_FINANCIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UPLOAD_FINANCIAL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_UPLOAD_FINANCIAL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UPLOAD_FINANCIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UPLOAD_FINANCIAL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_UPLOAD_FINANCIAL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UPLOAD_FINANCIAL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UPLOAD_FINANCIAL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default tambahanKasReducer
