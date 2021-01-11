import {
  CREATE_FORMASI_LOADING,
  CREATE_FORMASI_SUCCESS,
  CREATE_FORMASI_ERROR,
  UPDATE_FORMASI_LOADING,
  UPDATE_FORMASI_SUCCESS,
  UPDATE_FORMASI_ERROR,
  DELETE_FORMASI_LOADING,
  DELETE_FORMASI_SUCCESS,
  DELETE_FORMASI_ERROR,
} from './types'

const formasiReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_FORMASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FORMASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FORMASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_FORMASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FORMASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FORMASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_FORMASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FORMASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FORMASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default formasiReducer
