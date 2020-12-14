import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from '../modules'
import { AUTHENTICATED, UNAUTHENTICATED, VERIFYING } from '../modules/auth/types'
import Service from './services'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const configStore = createStoreWithMiddleware(rootReducer)

async function jwtVerify() {
  configStore.dispatch({ type: VERIFYING })

  try {
    await Service.verifyToken()
    configStore.dispatch({ type: AUTHENTICATED })
  } catch (e) {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    localStorage.removeItem('rid')
    configStore.dispatch({ type: UNAUTHENTICATED })
  }
}

jwtVerify()

export default configStore
