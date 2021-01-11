import {
  CREATE_APS_LOADING,
  CREATE_APS_SUCCESS,
  CREATE_APS_ERROR,
  UPDATE_APS_LOADING,
  UPDATE_APS_SUCCESS,
  UPDATE_APS_ERROR,
  DELETE_APS_LOADING,
  DELETE_APS_SUCCESS,
  DELETE_APS_ERROR,
} from './types'

const apsReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_APS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_APS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_APS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_APS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_APS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_APS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_APS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_APS_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_APS_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default apsReducer
