import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './index.css'
import reportWebVitals from './reportWebVitals'
import Facilities from './Facilities'
import Facility from './Facility'
import { AppBar, AppBarTitle, MessageQueue } from 'react-md'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <MessageQueue>
    <BrowserRouter>
      <AppBar style={{ background: '#132040' }} fixed>
        <AppBarTitle>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
            CC Tee Times
          </Link>
        </AppBarTitle>
      </AppBar>
      <Routes>
        <Route index path='/' element={<Facilities />} />
        <Route path='/:facilityId' element={<Facility />} />
      </Routes>
    </BrowserRouter>
  </MessageQueue>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
