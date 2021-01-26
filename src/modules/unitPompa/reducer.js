import {
  CREATE_UNIT_POMPA_LOADING,
  CREATE_UNIT_POMPA_SUCCESS,
  CREATE_UNIT_POMPA_ERROR,
  UPDATE_UNIT_POMPA_LOADING,
  UPDATE_UNIT_POMPA_SUCCESS,
  UPDATE_UNIT_POMPA_ERROR,
  DELETE_UNIT_POMPA_LOADING,
  DELETE_UNIT_POMPA_SUCCESS,
  DELETE_UNIT_POMPA_ERROR,
} from './types'

const unitPompaReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_UNIT_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UNIT_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_UNIT_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_UNIT_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UNIT_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_UNIT_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_UNIT_POMPA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UNIT_POMPA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_UNIT_POMPA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default unitPompaReducer
