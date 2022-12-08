import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  rows: [],
  data: false
}

export const employeeCreated = createAction('employeeCreated')
export const dataForm = createAction('dataForm')

export const setNewEmployee = createSlice({
  name :"newEmployee",
  initialState,
  reducers:{
    create: (state, action) => {
      state.rows.push(action.payload)
    }
  }
})

export const {create} = setNewEmployee.actions

export default setNewEmployee.reducer