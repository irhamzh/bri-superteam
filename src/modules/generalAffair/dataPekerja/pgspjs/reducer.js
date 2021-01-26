import {
  CREATE_PGS_PJS_LOADING,
  CREATE_PGS_PJS_SUCCESS,
  CREATE_PGS_PJS_ERROR,
  UPDATE_PGS_PJS_LOADING,
  UPDATE_PGS_PJS_SUCCESS,
  UPDATE_PGS_PJS_ERROR,
  DELETE_PGS_PJS_LOADING,
  DELETE_PGS_PJS_SUCCESS,
  DELETE_PGS_PJS_ERROR,
} from './types'

const pgspjsReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PGS_PJS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PGS_PJS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PGS_PJS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PGS_PJS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PGS_PJS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PGS_PJS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PGS_PJS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PGS_PJS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PGS_PJS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pgspjsReducer
