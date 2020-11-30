import {
  CREATE_AKTIVITAS_COURIER_LOADING,
  CREATE_AKTIVITAS_COURIER_SUCCESS,
  CREATE_AKTIVITAS_COURIER_ERROR,
  UPDATE_AKTIVITAS_COURIER_LOADING,
  UPDATE_AKTIVITAS_COURIER_SUCCESS,
  UPDATE_AKTIVITAS_COURIER_ERROR,
  DELETE_AKTIVITAS_COURIER_LOADING,
  DELETE_AKTIVITAS_COURIER_SUCCESS,
  DELETE_AKTIVITAS_COURIER_ERROR,
} from './types'

const courierReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_AKTIVITAS_COURIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_COURIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_AKTIVITAS_COURIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_AKTIVITAS_COURIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_COURIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_AKTIVITAS_COURIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_AKTIVITAS_COURIER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_COURIER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_AKTIVITAS_COURIER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default courierReducer
