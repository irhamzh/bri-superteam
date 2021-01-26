import {
  CREATE_PERSEDIAAN_LOADING,
  CREATE_PERSEDIAAN_SUCCESS,
  CREATE_PERSEDIAAN_ERROR,
  UPDATE_PERSEDIAAN_LOADING,
  UPDATE_PERSEDIAAN_SUCCESS,
  UPDATE_PERSEDIAAN_ERROR,
  DELETE_PERSEDIAAN_LOADING,
  DELETE_PERSEDIAAN_SUCCESS,
  DELETE_PERSEDIAAN_ERROR,
} from './types'

const persediaanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PERSEDIAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERSEDIAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERSEDIAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PERSEDIAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERSEDIAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERSEDIAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PERSEDIAAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERSEDIAAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERSEDIAAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default persediaanReducer
