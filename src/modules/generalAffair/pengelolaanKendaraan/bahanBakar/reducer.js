import {
  CREATE_BAHAN_BAKAR_LOADING,
  CREATE_BAHAN_BAKAR_SUCCESS,
  CREATE_BAHAN_BAKAR_ERROR,
  UPDATE_BAHAN_BAKAR_LOADING,
  UPDATE_BAHAN_BAKAR_SUCCESS,
  UPDATE_BAHAN_BAKAR_ERROR,
  DELETE_BAHAN_BAKAR_LOADING,
  DELETE_BAHAN_BAKAR_SUCCESS,
  DELETE_BAHAN_BAKAR_ERROR,
} from './types'

const bahanBakarReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_BAHAN_BAKAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_BAHAN_BAKAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_BAHAN_BAKAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_BAHAN_BAKAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_BAHAN_BAKAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_BAHAN_BAKAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_BAHAN_BAKAR_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_BAHAN_BAKAR_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_BAHAN_BAKAR_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default bahanBakarReducer
