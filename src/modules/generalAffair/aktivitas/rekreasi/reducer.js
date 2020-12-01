import {
  CREATE_REKREASI_LOADING,
  CREATE_REKREASI_SUCCESS,
  CREATE_REKREASI_ERROR,
  UPDATE_REKREASI_LOADING,
  UPDATE_REKREASI_SUCCESS,
  UPDATE_REKREASI_ERROR,
  DELETE_REKREASI_LOADING,
  DELETE_REKREASI_SUCCESS,
  DELETE_REKREASI_ERROR,
} from './types'

const rekreasiReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_REKREASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_REKREASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_REKREASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_REKREASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_REKREASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_REKREASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_REKREASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_REKREASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_REKREASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default rekreasiReducer
