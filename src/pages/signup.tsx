import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import * as ROUTES from '../constants/routes'
import AppContext from '../context/AppContext'

const SignUp = () => {
  const history = useHistory()
  const { auth } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [loading, isLoading] = useState(false)
  const [password, setPassword] = useState('')

  const [error, setError] = useState([])

  const isInvalid = password === '' || email === '' || username === ''

  useEffect(() => {
    document.title = 'Sign up - Instagram'
  })

  const handleLogin = async (e) => {
    console.log(e)

    isLoading(true)
    try {
      e.preventDefault()
      let data = {}
      data['email'] = email
      data['username'] = username
      data['password'] = password
      let user = await auth.signUp(data)
      history.push(ROUTES.DASHBOARD)
    } catch (err) {
      let errorMessage = Array.isArray(err.response?.data?.data)
        ? err.response.data.data[0].messages.map((eL) => eL.message)
        : err?.message
      console.log(err.message)
      setError(errorMessage)
      setUserName('')
      setPassword('')
    }
    isLoading(false)
  }

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
              name="Email"
              aria-label="Enter your email address"
              onChange={({ target }) => setEmail(target.value)}
              type="text"
              placeholder="Email address"
              className="appearance-none text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <input
              name="Username"
              aria-label="Enter your Username"
              onChange={({ target }) => setUserName(target.value)}
              type="name"
              placeholder="User Name"
              className="appearance-none text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />

            <input
              name="password"
              aria-label="Enter your password"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="password"
              className="appearance-none text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full h-8 
              font-bold ${
                isInvalid && `opacity-60`
              } flex justify-center items-center`}
            >
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={20}
                  width={20}
                />
              ) : (
                'Signup '
              )}
            </button>
          </form>
        </div>
        <div
          className="flex justify-center items-center flex-col
        w-full bg-white p-4 rounded border border-gray-primary"
        >
          <p className="text-sm">
            Do you have an existing account?{' '}
            <Link to={ROUTES.LOG_IN} className="font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default SignUp
