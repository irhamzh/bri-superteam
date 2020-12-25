import {
  UPLOAD_ANGGARAN_EKSPLOITASI_LOADING,
  UPLOAD_ANGGARAN_EKSPLOITASI_SUCCESS,
  UPLOAD_ANGGARAN_EKSPLOITASI_ERROR,
} from './types'

const eksploitasiReducer = (state = {}, action) => {
  switch (action.type) {
    // upload
    case UPLOAD_ANGGARAN_EKSPLOITASI_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ANGGARAN_EKSPLOITASI_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ANGGARAN_EKSPLOITASI_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default eksploitasiReducer
