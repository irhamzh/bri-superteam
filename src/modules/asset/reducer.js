import {
  CREATE_ASSET_LOADING,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_ERROR,
  UPDATE_ASSET_LOADING,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_ERROR,
  DELETE_ASSET_LOADING,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_ERROR,
  UPLOAD_ASSET_LOADING,
  UPLOAD_ASSET_SUCCESS,
  UPLOAD_ASSET_ERROR,
} from './types'

const assetReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_ASSET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_ASSET_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_ASSET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_ASSET_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_ASSET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_ASSET_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }
    // upload
    case UPLOAD_ASSET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPLOAD_ASSET_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default assetReducer
