import {
  CREATE_PARTNER_LOADING,
  CREATE_PARTNER_SUCCESS,
  CREATE_PARTNER_ERROR,
  UPDATE_PARTNER_LOADING,
  UPDATE_PARTNER_SUCCESS,
  UPDATE_PARTNER_ERROR,
  DELETE_PARTNER_LOADING,
  DELETE_PARTNER_SUCCESS,
  DELETE_PARTNER_ERROR,
} from './types'

const partnerReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PARTNER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PARTNER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PARTNER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PARTNER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PARTNER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PARTNER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PARTNER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PARTNER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default partnerReducer
