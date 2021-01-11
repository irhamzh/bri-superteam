import {
  CREATE_PURCHASE_ORDER_LOADING,
  CREATE_PURCHASE_ORDER_SUCCESS,
  CREATE_PURCHASE_ORDER_ERROR,
  UPDATE_PURCHASE_ORDER_LOADING,
  UPDATE_PURCHASE_ORDER_SUCCESS,
  UPDATE_PURCHASE_ORDER_ERROR,
  DELETE_PURCHASE_ORDER_LOADING,
  DELETE_PURCHASE_ORDER_SUCCESS,
  DELETE_PURCHASE_ORDER_ERROR,
} from './types'

const puchaseOrderReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PURCHASE_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PURCHASE_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PURCHASE_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PURCHASE_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PURCHASE_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PURCHASE_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default puchaseOrderReducer
