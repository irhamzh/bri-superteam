import {
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
  UPDATE_PAYMENT_LOADING,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_ERROR,
  DELETE_PAYMENT_LOADING,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_ERROR,
} from './types'

const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PAYMENT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAYMENT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PAYMENT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAYMENT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PAYMENT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAYMENT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default paymentReducer
