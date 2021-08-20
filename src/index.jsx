import './wdyr'

import React from 'react'
import ReactDOM from 'react-DOM'
import App from './App'
import ErrorBoundary from './errorBoundary'

import './../public/style/style.css'

import AppContext from './context/AppContext'
import { auth, query } from './helpers/services'

ReactDOM.render(
  <React.StrictMode>
    <AppContext.Provider value={{ auth, query }}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
