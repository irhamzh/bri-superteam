import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { renderRoutes } from 'react-router-config';
import './App.scss'
// import { jwtVerify } from './config/configStore'
// import Service from './config/services'
// import { AlertMessage } from './helpers'

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'))
const Register = React.lazy(() => import('./views/Pages/Register'))
const Page404 = React.lazy(() => import('./views/Pages/Page404'))
const Page500 = React.lazy(() => import('./views/Pages/Page500'))

const App = () => {
  // ;(async function checkToken() {
  //   await setInterval(async () => {
  //     try {
  //       await Service.verifyToken()
  //     } catch (error) {
  //       if (error.message.includes('401') && !window.location.href.includes('/login')) {
  //         AlertMessage.custom({
  //           title: 'Session Expired',
  //           text: 'Sesi anda telah selesai, mohon login kembali',
  //           icon: 'error',
  //         }).then((result) => {
  //           if (result.value) {
  //             jwtVerify()
  //           }
  //         })
  //       }
  //     }
  //   }, 1000 * 10)
  // })()

  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
