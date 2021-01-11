import {
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from './types'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_USER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_USER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default userReducer
