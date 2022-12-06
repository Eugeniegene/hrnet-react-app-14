import { configureStore } from '@reduxjs/toolkit'
import { dataForm, employeeCreated} from './user/userFeatures.js'

const store = configureStore({
  reducer: {
    employeeCreated: dataForm,
    dataForm: employeeCreated
  }
})

export default store