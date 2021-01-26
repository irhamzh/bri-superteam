import {
  CREATE_FIXED_ASSET_ANGGARAN_LOADING,
  CREATE_FIXED_ASSET_ANGGARAN_SUCCESS,
  CREATE_FIXED_ASSET_ANGGARAN_ERROR,
  UPDATE_FIXED_ASSET_ANGGARAN_LOADING,
  UPDATE_FIXED_ASSET_ANGGARAN_SUCCESS,
  UPDATE_FIXED_ASSET_ANGGARAN_ERROR,
  DELETE_FIXED_ASSET_ANGGARAN_LOADING,
  DELETE_FIXED_ASSET_ANGGARAN_SUCCESS,
  DELETE_FIXED_ASSET_ANGGARAN_ERROR,
} from './types'

const anggaranFXReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_FIXED_ASSET_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FIXED_ASSET_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_FIXED_ASSET_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_FIXED_ASSET_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FIXED_ASSET_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_FIXED_ASSET_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_FIXED_ASSET_ANGGARAN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FIXED_ASSET_ANGGARAN_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_FIXED_ASSET_ANGGARAN_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default anggaranFXReducer
