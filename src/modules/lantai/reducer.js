import {
  CREATE_LANTAI_LOADING,
  CREATE_LANTAI_SUCCESS,
  CREATE_LANTAI_ERROR,
  UPDATE_LANTAI_LOADING,
  UPDATE_LANTAI_SUCCESS,
  UPDATE_LANTAI_ERROR,
  DELETE_LANTAI_LOADING,
  DELETE_LANTAI_SUCCESS,
  DELETE_LANTAI_ERROR,
} from './types'

const lantaiReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_LANTAI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LANTAI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LANTAI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_LANTAI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LANTAI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LANTAI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_LANTAI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LANTAI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LANTAI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default lantaiReducer
