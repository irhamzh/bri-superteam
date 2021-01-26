import {
  CREATE_ROOM_LOADING,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_ERROR,
  UPDATE_ROOM_LOADING,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_ERROR,
  DELETE_ROOM_LOADING,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_ERROR,
} from './types'

const roomReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_ROOM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ROOM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_ROOM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ROOM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_ROOM_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ROOM_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default roomReducer
