import {
  CREATE_CATERING_LOADING,
  CREATE_CATERING_SUCCESS,
  CREATE_CATERING_ERROR,
  UPDATE_CATERING_LOADING,
  UPDATE_CATERING_SUCCESS,
  UPDATE_CATERING_ERROR,
  DELETE_CATERING_LOADING,
  DELETE_CATERING_SUCCESS,
  DELETE_CATERING_ERROR,
} from './types'

const cateringReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_CATERING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_CATERING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_CATERING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default cateringReducer
