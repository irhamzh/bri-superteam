import {
  CREATE_PENGELOLAAN_KONSUMSI_LOADING,
  CREATE_PENGELOLAAN_KONSUMSI_SUCCESS,
  CREATE_PENGELOLAAN_KONSUMSI_ERROR,
  UPDATE_PENGELOLAAN_KONSUMSI_LOADING,
  UPDATE_PENGELOLAAN_KONSUMSI_SUCCESS,
  UPDATE_PENGELOLAAN_KONSUMSI_ERROR,
  DELETE_PENGELOLAAN_KONSUMSI_LOADING,
  DELETE_PENGELOLAAN_KONSUMSI_SUCCESS,
  DELETE_PENGELOLAAN_KONSUMSI_ERROR,
} from './types'

const pengelolaanKonsumsiReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PENGELOLAAN_KONSUMSI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENGELOLAAN_KONSUMSI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENGELOLAAN_KONSUMSI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PENGELOLAAN_KONSUMSI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENGELOLAAN_KONSUMSI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENGELOLAAN_KONSUMSI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PENGELOLAAN_KONSUMSI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENGELOLAAN_KONSUMSI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENGELOLAAN_KONSUMSI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default pengelolaanKonsumsiReducer
