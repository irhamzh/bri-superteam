import {
  CREATE_FIRST_AID_LOADING,
  CREATE_FIRST_AID_SUCCESS,
  CREATE_FIRST_AID_ERROR,
  UPDATE_FIRST_AID_LOADING,
  UPDATE_FIRST_AID_SUCCESS,
  UPDATE_FIRST_AID_ERROR,
  DELETE_FIRST_AID_LOADING,
  DELETE_FIRST_AID_SUCCESS,
  DELETE_FIRST_AID_ERROR,
} from './types'

const firstAidReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_FIRST_AID_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FIRST_AID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FIRST_AID_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_FIRST_AID_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FIRST_AID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FIRST_AID_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_FIRST_AID_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FIRST_AID_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FIRST_AID_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default firstAidReducer
