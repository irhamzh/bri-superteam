import {
  CREATE_KEHADIRAN_LOADING,
  CREATE_KEHADIRAN_SUCCESS,
  CREATE_KEHADIRAN_ERROR,
  UPDATE_KEHADIRAN_LOADING,
  UPDATE_KEHADIRAN_SUCCESS,
  UPDATE_KEHADIRAN_ERROR,
  DELETE_KEHADIRAN_LOADING,
  DELETE_KEHADIRAN_SUCCESS,
  DELETE_KEHADIRAN_ERROR,
  UPLOAD_KEHADIRAN_LOADING,
  UPLOAD_KEHADIRAN_SUCCESS,
  UPLOAD_KEHADIRAN_ERROR,
} from './types'

const kehadiranReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_KEHADIRAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_KEHADIRAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_KEHADIRAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_KEHADIRAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_KEHADIRAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_KEHADIRAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // upload
    case UPLOAD_KEHADIRAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_KEHADIRAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_KEHADIRAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default kehadiranReducer
