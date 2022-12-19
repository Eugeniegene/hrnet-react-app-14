import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import persistStore from "redux-persist/es/persistStore"
import { PersistGate } from 'redux-persist/integration/react'

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Homepage from './pages/Homepage/Homepage'
import EmployeeList from './pages/Employees/EmployeeList'

import store from "./redux/store.js"

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/employees" element={<EmployeeList />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </PersistGate>
    </React.StrictMode>
  </Provider>
)

reportWebVitals()
