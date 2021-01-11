import {
  CREATE_PENILAIAN_OUTSOURCING_LOADING,
  CREATE_PENILAIAN_OUTSOURCING_SUCCESS,
  CREATE_PENILAIAN_OUTSOURCING_ERROR,
  UPDATE_PENILAIAN_OUTSOURCING_LOADING,
  UPDATE_PENILAIAN_OUTSOURCING_SUCCESS,
  UPDATE_PENILAIAN_OUTSOURCING_ERROR,
  DELETE_PENILAIAN_OUTSOURCING_LOADING,
  DELETE_PENILAIAN_OUTSOURCING_SUCCESS,
  DELETE_PENILAIAN_OUTSOURCING_ERROR,
  UPLOAD_PENILAIAN_OUTSOURCING_LOADING,
  UPLOAD_PENILAIAN_OUTSOURCING_SUCCESS,
  UPLOAD_PENILAIAN_OUTSOURCING_ERROR,
} from './types'

const penilaianOutsourcingReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PENILAIAN_OUTSOURCING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENILAIAN_OUTSOURCING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PENILAIAN_OUTSOURCING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PENILAIAN_OUTSOURCING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENILAIAN_OUTSOURCING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PENILAIAN_OUTSOURCING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PENILAIAN_OUTSOURCING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENILAIAN_OUTSOURCING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PENILAIAN_OUTSOURCING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // upload
    case UPLOAD_PENILAIAN_OUTSOURCING_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_PENILAIAN_OUTSOURCING_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_PENILAIAN_OUTSOURCING_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default penilaianOutsourcingReducer
