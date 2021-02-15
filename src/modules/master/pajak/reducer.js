import {
  CREATE_PAJAK_LOADING,
  CREATE_PAJAK_SUCCESS,
  CREATE_PAJAK_ERROR,
  UPDATE_PAJAK_LOADING,
  UPDATE_PAJAK_SUCCESS,
  UPDATE_PAJAK_ERROR,
  DELETE_PAJAK_LOADING,
  DELETE_PAJAK_SUCCESS,
  DELETE_PAJAK_ERROR,
} from './types'

const pajakReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PAJAK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAJAK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PAJAK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PAJAK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAJAK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PAJAK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PAJAK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAJAK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PAJAK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pajakReducer
