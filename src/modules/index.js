import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import roleReducer from './master/role/reducer'
import profesiReducer from './master/profesi/reducer'
import persekotReducer from './persekot/reducer'
import assetReducer from './asset/reducer'
import roomReducer from './room/reducer'
import vendorReducer from './vendor/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  profesi: profesiReducer,
  persekot: persekotReducer,
  asset: assetReducer,
  room: roomReducer,
  vendor: vendorReducer,
})

export default rootReducer
