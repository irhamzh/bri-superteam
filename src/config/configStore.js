/* eslint-disable import/no-cycle */
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from '../modules'
import { AUTHENTICATED, UNAUTHENTICATED, VERIFYING } from '../modules/auth/types'
import Service from './services'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const configStore = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

async function jwtVerify() {
  configStore.dispatch({ type: VERIFYING })

  try {
    await Service.verifyToken()
    configStore.dispatch({ type: AUTHENTICATED })
  } catch (e) {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshTokenJWT')
    localStorage.removeItem('uid')
    localStorage.removeItem('rid')
    configStore.dispatch({ type: UNAUTHENTICATED })
  }
}

jwtVerify()

export { configStore, jwtVerify }
