import {
  CREATE_INTERNSHIP_LOADING,
  CREATE_INTERNSHIP_SUCCESS,
  CREATE_INTERNSHIP_ERROR,
  UPDATE_INTERNSHIP_LOADING,
  UPDATE_INTERNSHIP_SUCCESS,
  UPDATE_INTERNSHIP_ERROR,
  DELETE_INTERNSHIP_LOADING,
  DELETE_INTERNSHIP_SUCCESS,
  DELETE_INTERNSHIP_ERROR,
} from './types'

const internshipReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_INTERNSHIP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_INTERNSHIP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_INTERNSHIP_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_INTERNSHIP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_INTERNSHIP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_INTERNSHIP_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_INTERNSHIP_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_INTERNSHIP_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_INTERNSHIP_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default internshipReducer
