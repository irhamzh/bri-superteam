import {
  CREATE_EVALUASI_KLINIK_LOADING,
  CREATE_EVALUASI_KLINIK_SUCCESS,
  CREATE_EVALUASI_KLINIK_ERROR,
  UPDATE_EVALUASI_KLINIK_LOADING,
  UPDATE_EVALUASI_KLINIK_SUCCESS,
  UPDATE_EVALUASI_KLINIK_ERROR,
  DELETE_EVALUASI_KLINIK_LOADING,
  DELETE_EVALUASI_KLINIK_SUCCESS,
  DELETE_EVALUASI_KLINIK_ERROR,
} from './types'

const ecaluasiKlinikReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_EVALUASI_KLINIK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_EVALUASI_KLINIK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_EVALUASI_KLINIK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_EVALUASI_KLINIK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_EVALUASI_KLINIK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_EVALUASI_KLINIK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_EVALUASI_KLINIK_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_EVALUASI_KLINIK_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_EVALUASI_KLINIK_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default ecaluasiKlinikReducer
