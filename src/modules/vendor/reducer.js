import {
  CREATE_VENDOR_LOADING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_ERROR,
  UPDATE_VENDOR_LOADING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_ERROR,
  DELETE_VENDOR_LOADING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_ERROR,
} from './types'

const vendorReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_VENDOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_VENDOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_VENDOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_VENDOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_VENDOR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_VENDOR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default vendorReducer
