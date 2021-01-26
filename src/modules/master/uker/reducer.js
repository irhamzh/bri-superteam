import {
  CREATE_UKER_LOADING,
  CREATE_UKER_SUCCESS,
  CREATE_UKER_ERROR,
  UPDATE_UKER_LOADING,
  UPDATE_UKER_SUCCESS,
  UPDATE_UKER_ERROR,
  DELETE_UKER_LOADING,
  DELETE_UKER_SUCCESS,
  DELETE_UKER_ERROR,
} from './types'

const ukerReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_UKER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UKER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UKER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_UKER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UKER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UKER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_UKER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UKER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UKER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default ukerReducer
