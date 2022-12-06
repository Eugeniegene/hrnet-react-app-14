import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Homepage from './pages/Homepage/Homepage'
import EmployeeList from './pages/Employees/EmployeeList'

import store from "./redux/store.js"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)

reportWebVitals()
