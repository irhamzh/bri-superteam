import {
  CREATE_LELANG_LOADING,
  CREATE_LELANG_SUCCESS,
  CREATE_LELANG_ERROR,
  UPDATE_LELANG_LOADING,
  UPDATE_LELANG_SUCCESS,
  UPDATE_LELANG_ERROR,
  DELETE_LELANG_LOADING,
  DELETE_LELANG_SUCCESS,
  DELETE_LELANG_ERROR,
} from './types'

const lelangReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_LELANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LELANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_LELANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_LELANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LELANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_LELANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_LELANG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LELANG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_LELANG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default lelangReducer
