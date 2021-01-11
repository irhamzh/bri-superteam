import {
  CREATE_TAMBAHAN_KAS_LOADING,
  CREATE_TAMBAHAN_KAS_SUCCESS,
  CREATE_TAMBAHAN_KAS_ERROR,
  UPDATE_TAMBAHAN_KAS_LOADING,
  UPDATE_TAMBAHAN_KAS_SUCCESS,
  UPDATE_TAMBAHAN_KAS_ERROR,
  DELETE_TAMBAHAN_KAS_LOADING,
  DELETE_TAMBAHAN_KAS_SUCCESS,
  DELETE_TAMBAHAN_KAS_ERROR,
} from './types'

const tambahanKasReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_TAMBAHAN_KAS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_TAMBAHAN_KAS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_TAMBAHAN_KAS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_TAMBAHAN_KAS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_TAMBAHAN_KAS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_TAMBAHAN_KAS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_TAMBAHAN_KAS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_TAMBAHAN_KAS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_TAMBAHAN_KAS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default tambahanKasReducer
