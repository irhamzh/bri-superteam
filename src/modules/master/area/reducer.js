import {
  CREATE_AREA_LOADING,
  CREATE_AREA_SUCCESS,
  CREATE_AREA_ERROR,
  UPDATE_AREA_LOADING,
  UPDATE_AREA_SUCCESS,
  UPDATE_AREA_ERROR,
  DELETE_AREA_LOADING,
  DELETE_AREA_SUCCESS,
  DELETE_AREA_ERROR,
} from './types'

const areaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_AREA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AREA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AREA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_AREA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AREA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AREA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_AREA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AREA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AREA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default areaReducer
