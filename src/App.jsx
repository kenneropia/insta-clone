import React, { lazy, useContext, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import * as ROUTES from './constants/routes'
import AppContext from './context/AppContext'

import ProtectedRoute from './helpers/protected-routes'
import IsUserLoggedIn from './helpers/is-user-logged'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const Profile = lazy(() => import('./pages/profile'))
const DashBoard = lazy(() => import('./pages/dashboard'))
const AllComments = lazy(() => import('./pages/all-comments'))
const NotFound = lazy(() => import('./pages/not-found'))

function FullPageSpinner() {
  return (
    <div className="flex max-h-screen h-screen justify-center items-center">
      <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
    </div>
  )
}

const App = () => {
  const { auth } = useContext(AppContext)
  let user = false
  if (auth.isUserLoggedin()) {
    user = true
  }
  return (
    <Router>
      <Suspense fallback={<FullPageSpinner />}>
        <Switch>
          <IsUserLoggedIn
            user={user}
            path={ROUTES.LOG_IN}
            loggedInPath={ROUTES.DASHBOARD}
          >
            <Login />
          </IsUserLoggedIn>
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          {/* <Route exact path={ROUTES.LOG_IN} component={Login} /> */}
          <Route path={ROUTES.ALL_COMMENTS} component={AllComments} />
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <DashBoard />
          </ProtectedRoute>
          <ProtectedRoute user={user} path="/dashboard" exact>
            <DashBoard />
          </ProtectedRoute>
          <ProtectedRoute user={user} path={ROUTES.PROFILE}>
            <Profile />
          </ProtectedRoute>
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
