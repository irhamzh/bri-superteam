import {
  CREATE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  CREATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  CREATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  UPDATE_GENERAL_AFFAIR_ANGGARAN_ERROR,
  DELETE_GENERAL_AFFAIR_ANGGARAN_LOADING,
  DELETE_GENERAL_AFFAIR_ANGGARAN_SUCCESS,
  DELETE_GENERAL_AFFAIR_ANGGARAN_ERROR,
} from './types'

const anggaranGAReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_GENERAL_AFFAIR_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_GENERAL_AFFAIR_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_GENERAL_AFFAIR_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_GENERAL_AFFAIR_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_GENERAL_AFFAIR_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_GENERAL_AFFAIR_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_GENERAL_AFFAIR_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_GENERAL_AFFAIR_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default anggaranGAReducer
