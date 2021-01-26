import {
  CREATE_WATER_METER_LOADING,
  CREATE_WATER_METER_SUCCESS,
  CREATE_WATER_METER_ERROR,
  UPDATE_WATER_METER_LOADING,
  UPDATE_WATER_METER_SUCCESS,
  UPDATE_WATER_METER_ERROR,
  DELETE_WATER_METER_LOADING,
  DELETE_WATER_METER_SUCCESS,
  DELETE_WATER_METER_ERROR,
} from './types'

const waterMeterReducer = (state = {}, action) => {
  switch (action.type) {
    // created
    case CREATE_WATER_METER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_WATER_METER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case CREATE_WATER_METER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // updated
    case UPDATE_WATER_METER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_WATER_METER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case UPDATE_WATER_METER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    // deleted
    case DELETE_WATER_METER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_WATER_METER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case DELETE_WATER_METER_ERROR:
      return {
        ...state,
        message: action.payload,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}

export default waterMeterReducer
