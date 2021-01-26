import {
  CREATE_CHECKPOINT_LOADING,
  CREATE_CHECKPOINT_SUCCESS,
  CREATE_CHECKPOINT_ERROR,
  UPDATE_CHECKPOINT_LOADING,
  UPDATE_CHECKPOINT_SUCCESS,
  UPDATE_CHECKPOINT_ERROR,
  DELETE_CHECKPOINT_LOADING,
  DELETE_CHECKPOINT_SUCCESS,
  DELETE_CHECKPOINT_ERROR,
} from './types'

const checkpointReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_CHECKPOINT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_CHECKPOINT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_CHECKPOINT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_CHECKPOINT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_CHECKPOINT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_CHECKPOINT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_CHECKPOINT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_CHECKPOINT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_CHECKPOINT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default checkpointReducer
