import { configureStore } from '@reduxjs/toolkit'
import setNewEmployee from './user/userFeatures.js'

const store = configureStore({
  reducer: {
    employee: setNewEmployee
  }
})

export default store