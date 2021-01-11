import {
  CREATE_PROCUREMENT_HOTEL_LOADING,
  CREATE_PROCUREMENT_HOTEL_SUCCESS,
  CREATE_PROCUREMENT_HOTEL_ERROR,
  UPDATE_PROCUREMENT_HOTEL_LOADING,
  UPDATE_PROCUREMENT_HOTEL_SUCCESS,
  UPDATE_PROCUREMENT_HOTEL_ERROR,
  DELETE_PROCUREMENT_HOTEL_LOADING,
  DELETE_PROCUREMENT_HOTEL_SUCCESS,
  DELETE_PROCUREMENT_HOTEL_ERROR,
} from './types'

const hotelReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PROCUREMENT_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PROCUREMENT_HOTEL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PROCUREMENT_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PROCUREMENT_HOTEL_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PROCUREMENT_HOTEL_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_HOTEL_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PROCUREMENT_HOTEL_ERROR:
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
