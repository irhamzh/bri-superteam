import {
  CREATE_PERSEKOT_LOADING,
  CREATE_PERSEKOT_SUCCESS,
  CREATE_PERSEKOT_ERROR,
  UPDATE_PERSEKOT_LOADING,
  UPDATE_PERSEKOT_SUCCESS,
  UPDATE_PERSEKOT_ERROR,
  DELETE_PERSEKOT_LOADING,
  DELETE_PERSEKOT_SUCCESS,
  DELETE_PERSEKOT_ERROR,
  APPROVE_PERSEKOT_LOADING,
  APPROVE_PERSEKOT_SUCCESS,
  APPROVE_PERSEKOT_ERROR,
  PENIHILAN_PERSEKOT_LOADING,
  PENIHILAN_PERSEKOT_SUCCESS,
  PENIHILAN_PERSEKOT_ERROR,
} from './types'

const persekotReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PERSEKOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERSEKOT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERSEKOT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PERSEKOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERSEKOT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERSEKOT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PERSEKOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERSEKOT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERSEKOT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // approved
    case APPROVE_PERSEKOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case APPROVE_PERSEKOT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case APPROVE_PERSEKOT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // penihilan
    case PENIHILAN_PERSEKOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case PENIHILAN_PERSEKOT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case PENIHILAN_PERSEKOT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default persekotReducer
