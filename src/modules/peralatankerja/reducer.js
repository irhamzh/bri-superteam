import {
  CREATE_PERALATAN_KERJA_LOADING,
  CREATE_PERALATAN_KERJA_SUCCESS,
  CREATE_PERALATAN_KERJA_ERROR,
  UPDATE_PERALATAN_KERJA_LOADING,
  UPDATE_PERALATAN_KERJA_SUCCESS,
  UPDATE_PERALATAN_KERJA_ERROR,
  DELETE_PERALATAN_KERJA_LOADING,
  DELETE_PERALATAN_KERJA_SUCCESS,
  DELETE_PERALATAN_KERJA_ERROR,
} from './types'

const peralatanKerja = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_PERALATAN_KERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERALATAN_KERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_PERALATAN_KERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_PERALATAN_KERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERALATAN_KERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_PERALATAN_KERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_PERALATAN_KERJA_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERALATAN_KERJA_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_PERALATAN_KERJA_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default peralatanKerja
