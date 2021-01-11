import {
  UPLOAD_ANGGARAN_INVESTASI_LOADING,
  UPLOAD_ANGGARAN_INVESTASI_SUCCESS,
  UPLOAD_ANGGARAN_INVESTASI_ERROR,
} from './types'

const investasiReducer = (state = {}, action) => {
  switch (action.type) {
    // upload
    case UPLOAD_ANGGARAN_INVESTASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ANGGARAN_INVESTASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ANGGARAN_INVESTASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default investasiReducer
