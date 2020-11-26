import {
  CREATE_PROCUREMENT_ATK_LOADING,
  CREATE_PROCUREMENT_ATK_SUCCESS,
  CREATE_PROCUREMENT_ATK_ERROR,
  UPDATE_PROCUREMENT_ATK_LOADING,
  UPDATE_PROCUREMENT_ATK_SUCCESS,
  UPDATE_PROCUREMENT_ATK_ERROR,
  DELETE_PROCUREMENT_ATK_LOADING,
  DELETE_PROCUREMENT_ATK_SUCCESS,
  DELETE_PROCUREMENT_ATK_ERROR,
} from './types'

const atkReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PROCUREMENT_ATK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_ATK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_ATK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PROCUREMENT_ATK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_ATK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_ATK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PROCUREMENT_ATK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_ATK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_ATK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default atkReducer
