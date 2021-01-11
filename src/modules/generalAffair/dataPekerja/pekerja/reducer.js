import {
  CREATE_PEKERJA_LOADING,
  CREATE_PEKERJA_SUCCESS,
  CREATE_PEKERJA_ERROR,
  UPDATE_PEKERJA_LOADING,
  UPDATE_PEKERJA_SUCCESS,
  UPDATE_PEKERJA_ERROR,
  DELETE_PEKERJA_LOADING,
  DELETE_PEKERJA_SUCCESS,
  DELETE_PEKERJA_ERROR,
  UPLOAD_PEKERJA_LOADING,
  UPLOAD_PEKERJA_SUCCESS,
  UPLOAD_PEKERJA_ERROR,
} from './types'

const pekerjaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PEKERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEKERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PEKERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PEKERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEKERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PEKERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PEKERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEKERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PEKERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // upload
    case UPLOAD_PEKERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_PEKERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_PEKERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pekerjaReducer
