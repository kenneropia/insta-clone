import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import * as ROUTES from './../constants/routes'
import AppContext from '../context/AppContext'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found - Instagram'
  }, [])
  return (
    <div className="bg-gray-background">
      <div className="flex bg-gray-background  h-screen">
        <div className="sm:w-5/12 7/12 mt-16 mx-6 px-4 space-y-2 text-black-light h-44  border-l-4">
          <h2 className="text-7xl">404?</h2>
          <p className="hover:underline">
            <Link to={ROUTES.DASHBOARD}>
              Do not go where the path may lead, go instead where there is no
              path and leave a trail <br></br>
              Ode just click and get out
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
