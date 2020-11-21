import {
  CREATE_JENIS_PC_LOADING,
  CREATE_JENIS_PC_SUCCESS,
  CREATE_JENIS_PC_ERROR,
  UPDATE_JENIS_PC_LOADING,
  UPDATE_JENIS_PC_SUCCESS,
  UPDATE_JENIS_PC_ERROR,
  DELETE_JENIS_PC_LOADING,
  DELETE_JENIS_PC_SUCCESS,
  DELETE_JENIS_PC_ERROR,
} from './types'

const jenisPCReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_JENIS_PC_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_PC_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_JENIS_PC_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_JENIS_PC_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_PC_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_JENIS_PC_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_JENIS_PC_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_PC_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_JENIS_PC_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default jenisPCReducer
