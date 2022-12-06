import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  rows: [],
  data: false
}

export const employeeCreated = createAction('employeeCreatedAction')
export const dataForm = createAction('dataFormAction')

export default createReducer(initialState, (builder) => {
  builder.addCase(employeeCreated, (state, action) => {
    return { state, rows: [...state.rows, action.payload] }
  })
  builder.addCase(dataForm, (state, action) => {
    return { state, rows: [...state.rows, action.payload] }
  })
})
