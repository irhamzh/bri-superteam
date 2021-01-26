import {
  CREATE_LEMBUR_LOADING,
  CREATE_LEMBUR_SUCCESS,
  CREATE_LEMBUR_ERROR,
  UPDATE_LEMBUR_LOADING,
  UPDATE_LEMBUR_SUCCESS,
  UPDATE_LEMBUR_ERROR,
  DELETE_LEMBUR_LOADING,
  DELETE_LEMBUR_SUCCESS,
  DELETE_LEMBUR_ERROR,
} from './types'

const lemburReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_LEMBUR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LEMBUR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LEMBUR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_LEMBUR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LEMBUR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LEMBUR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_LEMBUR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LEMBUR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LEMBUR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default lemburReducer
