import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import * as ROUTES from './../constants/routes'
import AppContext from '../context/AppContext'

const Login = ({ location }) => {
  const { auth } = useContext(AppContext)
  const history = useHistory()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, isLoading] = useState(false)

  const [error, setError] = useState([])
  // if (auth.isUserLoggedin){
  // history.push("/dashboard")
  // }

  const isInvalid = password === '' || userName === ''

  const handleLogin = async (e) => {
    setError('')
    e.preventDefault()
    isLoading(true)
    try {
      let user = await auth.login(userName, password)
      history.push('dashboard')
    } catch (err) {
      let errorMessage = Array.isArray(err.response?.data?.data)
        ? err.response.data.data[0].messages.map((eL) => eL.message)
        : err?.message
      console.log(err.message)
      setError(errorMessage)
      setUserName('')
      setPassword('')
    }
  }
  useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md justify-center items-center sm:h-screen h-96">
      <div className="md:flex justify-center h-96 hidden  w-3/6">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="Iphone with Instagram app on screen"
        />
      </div>
      <div className="flex box-content mt-14 sm:mt-0 mx-10 sm:mx-20 md:mx-10 justify-center flex-col w-full md:w-3/6">
        <div className="flex w-full flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram full logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {Array.isArray(error) ? (
            error.map((eL) => {
              return (
                <p className="mb-4 w-full  text-xs text-red-primary">{eL}</p>
              )
            })
          ) : (
            <p className="mb-4 w-full  text-xs text-red-primary">{error}</p>
          )}

          <form className="w-full" onSubmit={handleLogin}>
            <input
              aria-label="Enter your username"
              onChange={({ target }) => setUserName(target.value)}
              type="text"
              placeholder="User Name"
              value={userName}
              className="appearance-none text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <input
              aria-label="Enter your password"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="password"
              value={password}
              className="appearance-none text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium flex justify-center items-center text-center text-white w-full h-8 
              font-bold ${isInvalid && `opacity-60 cursor-not-allowed`}`}
            >
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={20}
                  width={20}
                />
              ) : (
                'Log In'
              )}
            </button>
          </form>
        </div>
        <div
          className="flex justify-center items-center flex-col
        w-full bg-white p-4 rounded border border-gray-primary"
        >
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login
