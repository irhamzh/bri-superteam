import {
  CREATE_KEBERSIHAN_LOADING,
  CREATE_KEBERSIHAN_SUCCESS,
  CREATE_KEBERSIHAN_ERROR,
  UPDATE_KEBERSIHAN_LOADING,
  UPDATE_KEBERSIHAN_SUCCESS,
  UPDATE_KEBERSIHAN_ERROR,
  DELETE_KEBERSIHAN_LOADING,
  DELETE_KEBERSIHAN_SUCCESS,
  DELETE_KEBERSIHAN_ERROR,
} from './types'

const kebersihanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KEBERSIHAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KEBERSIHAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KEBERSIHAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KEBERSIHAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KEBERSIHAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KEBERSIHAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KEBERSIHAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KEBERSIHAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KEBERSIHAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kebersihanReducer
