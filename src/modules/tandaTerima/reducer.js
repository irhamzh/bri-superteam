import {
  CREATE_TANDA_TERIMA_LOADING,
  CREATE_TANDA_TERIMA_SUCCESS,
  CREATE_TANDA_TERIMA_ERROR,
  UPDATE_TANDA_TERIMA_LOADING,
  UPDATE_TANDA_TERIMA_SUCCESS,
  UPDATE_TANDA_TERIMA_ERROR,
  DELETE_TANDA_TERIMA_LOADING,
  DELETE_TANDA_TERIMA_SUCCESS,
  DELETE_TANDA_TERIMA_ERROR,
} from './types'

const tandaTerimaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_TANDA_TERIMA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_TANDA_TERIMA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_TANDA_TERIMA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_TANDA_TERIMA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_TANDA_TERIMA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_TANDA_TERIMA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_TANDA_TERIMA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_TANDA_TERIMA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_TANDA_TERIMA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default tandaTerimaReducer
