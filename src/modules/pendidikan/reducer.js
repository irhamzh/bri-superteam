import {
  CREATE_PENDIDIKAN_LOADING,
  CREATE_PENDIDIKAN_SUCCESS,
  CREATE_PENDIDIKAN_ERROR,
  UPDATE_PENDIDIKAN_LOADING,
  UPDATE_PENDIDIKAN_SUCCESS,
  UPDATE_PENDIDIKAN_ERROR,
  DELETE_PENDIDIKAN_LOADING,
  DELETE_PENDIDIKAN_SUCCESS,
  DELETE_PENDIDIKAN_ERROR,
} from './types'

const pendidikanReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PENDIDIKAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENDIDIKAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENDIDIKAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PENDIDIKAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENDIDIKAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENDIDIKAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PENDIDIKAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENDIDIKAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENDIDIKAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pendidikanReducer
