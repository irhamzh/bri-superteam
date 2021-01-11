import {
  CREATE_PENUNJUKAN_LANGSUNG_LOADING,
  CREATE_PENUNJUKAN_LANGSUNG_SUCCESS,
  CREATE_PENUNJUKAN_LANGSUNG_ERROR,
  UPDATE_PENUNJUKAN_LANGSUNG_LOADING,
  UPDATE_PENUNJUKAN_LANGSUNG_SUCCESS,
  UPDATE_PENUNJUKAN_LANGSUNG_ERROR,
  DELETE_PENUNJUKAN_LANGSUNG_LOADING,
  DELETE_PENUNJUKAN_LANGSUNG_SUCCESS,
  DELETE_PENUNJUKAN_LANGSUNG_ERROR,
} from './types'

const penunjukanLangsungReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PENUNJUKAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENUNJUKAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENUNJUKAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PENUNJUKAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENUNJUKAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENUNJUKAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PENUNJUKAN_LANGSUNG_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENUNJUKAN_LANGSUNG_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENUNJUKAN_LANGSUNG_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default penunjukanLangsungReducer
