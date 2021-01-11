import {
  CREATE_HOTEL_LOADING,
  CREATE_HOTEL_SUCCESS,
  CREATE_HOTEL_ERROR,
  UPDATE_HOTEL_LOADING,
  UPDATE_HOTEL_SUCCESS,
  UPDATE_HOTEL_ERROR,
  DELETE_HOTEL_LOADING,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_ERROR,
} from './types'

const hotelReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_HOTEL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_HOTEL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_HOTEL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default hotelReducer
