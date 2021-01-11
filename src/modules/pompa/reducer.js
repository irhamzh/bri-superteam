import {
  CREATE_POMPA_LOADING,
  CREATE_POMPA_SUCCESS,
  CREATE_POMPA_ERROR,
  UPDATE_POMPA_LOADING,
  UPDATE_POMPA_SUCCESS,
  UPDATE_POMPA_ERROR,
  DELETE_POMPA_LOADING,
  DELETE_POMPA_SUCCESS,
  DELETE_POMPA_ERROR,
} from './types'

const pompaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pompaReducer
