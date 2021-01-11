import {
  CREATE_SMKPT_LOADING,
  CREATE_SMKPT_SUCCESS,
  CREATE_SMKPT_ERROR,
  UPDATE_SMKPT_LOADING,
  UPDATE_SMKPT_SUCCESS,
  UPDATE_SMKPT_ERROR,
  DELETE_SMKPT_LOADING,
  DELETE_SMKPT_SUCCESS,
  DELETE_SMKPT_ERROR,
  UPLOAD_SMKPT_LOADING,
  UPLOAD_SMKPT_SUCCESS,
  UPLOAD_SMKPT_ERROR,
} from './types'

const smkptReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_SMKPT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SMKPT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SMKPT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_SMKPT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SMKPT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SMKPT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_SMKPT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SMKPT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SMKPT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // upload
    case UPLOAD_SMKPT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_SMKPT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_SMKPT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default smkptReducer
