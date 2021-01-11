import {
  CREATE_WORKING_ORDER_LOADING,
  CREATE_WORKING_ORDER_SUCCESS,
  CREATE_WORKING_ORDER_ERROR,
  UPDATE_WORKING_ORDER_LOADING,
  UPDATE_WORKING_ORDER_SUCCESS,
  UPDATE_WORKING_ORDER_ERROR,
  DELETE_WORKING_ORDER_LOADING,
  DELETE_WORKING_ORDER_SUCCESS,
  DELETE_WORKING_ORDER_ERROR,
} from './types'

const workingOrderReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_WORKING_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_WORKING_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_WORKING_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_WORKING_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_WORKING_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_WORKING_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_WORKING_ORDER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_WORKING_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_WORKING_ORDER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default workingOrderReducer
