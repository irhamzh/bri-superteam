import {
  CREATE_ITEM_LOADING,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_ERROR,
  UPDATE_ITEM_LOADING,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_ERROR,
  DELETE_ITEM_LOADING,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
} from './types'

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_ITEM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ITEM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_ITEM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ITEM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_ITEM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ITEM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default itemReducer
