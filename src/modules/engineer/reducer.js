import {
  CREATE_ENGINEER_LOADING,
  CREATE_ENGINEER_SUCCESS,
  CREATE_ENGINEER_ERROR,
  UPDATE_ENGINEER_LOADING,
  UPDATE_ENGINEER_SUCCESS,
  UPDATE_ENGINEER_ERROR,
  DELETE_ENGINEER_LOADING,
  DELETE_ENGINEER_SUCCESS,
  DELETE_ENGINEER_ERROR,
} from './types'

const engineerReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_ENGINEER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ENGINEER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ENGINEER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_ENGINEER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ENGINEER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ENGINEER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_ENGINEER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ENGINEER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ENGINEER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default engineerReducer
