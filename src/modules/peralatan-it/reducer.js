import {
  CREATE_PERALATAN_IT_LOADING,
  CREATE_PERALATAN_IT_SUCCESS,
  CREATE_PERALATAN_IT_ERROR,
  UPDATE_PERALATAN_IT_LOADING,
  UPDATE_PERALATAN_IT_SUCCESS,
  UPDATE_PERALATAN_IT_ERROR,
  DELETE_PERALATAN_IT_LOADING,
  DELETE_PERALATAN_IT_SUCCESS,
  DELETE_PERALATAN_IT_ERROR,
} from './types'

const peralatanItReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PERALATAN_IT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERALATAN_IT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERALATAN_IT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PERALATAN_IT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERALATAN_IT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERALATAN_IT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PERALATAN_IT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERALATAN_IT_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERALATAN_IT_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default peralatanItReducer
