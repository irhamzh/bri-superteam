import {
  CREATE_PROCUREMENT_CATERING_LOADING,
  CREATE_PROCUREMENT_CATERING_SUCCESS,
  CREATE_PROCUREMENT_CATERING_ERROR,
  UPDATE_PROCUREMENT_CATERING_LOADING,
  UPDATE_PROCUREMENT_CATERING_SUCCESS,
  UPDATE_PROCUREMENT_CATERING_ERROR,
  DELETE_PROCUREMENT_CATERING_LOADING,
  DELETE_PROCUREMENT_CATERING_SUCCESS,
  DELETE_PROCUREMENT_CATERING_ERROR,
} from './types'

const cateringReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PROCUREMENT_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_CATERING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PROCUREMENT_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_CATERING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PROCUREMENT_CATERING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_CATERING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_CATERING_ERROR:
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
