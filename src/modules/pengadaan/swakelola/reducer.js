import {
  CREATE_SWAKELOLA_LOADING,
  CREATE_SWAKELOLA_SUCCESS,
  CREATE_SWAKELOLA_ERROR,
  UPDATE_SWAKELOLA_LOADING,
  UPDATE_SWAKELOLA_SUCCESS,
  UPDATE_SWAKELOLA_ERROR,
  DELETE_SWAKELOLA_LOADING,
  DELETE_SWAKELOLA_SUCCESS,
  DELETE_SWAKELOLA_ERROR,
} from './types'

const swakelolaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_SWAKELOLA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SWAKELOLA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_SWAKELOLA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_SWAKELOLA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SWAKELOLA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_SWAKELOLA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_SWAKELOLA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SWAKELOLA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_SWAKELOLA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default swakelolaReducer
