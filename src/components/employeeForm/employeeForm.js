import React from 'react'
import { useState } from 'react'
import FormModal from '@eugeniegene/hrnet-modal-addon'

import states from '../../mocked-Data/allStates'

import store from '../../redux/store.js'
import {employeeCreated, dataForm} from '../../redux/user/userFeatures.js'

import "./employeeForm.css"

const EmployeeForm = () => {

    const [openModal, setOpenModal] = useState(false)
    
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        startDate: '',
        department: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      })

    const sendForm = (e) => {
        e.preventDefault()
        store.dispatch(
            dataForm({
                firstName: userData.firstName,
                lastName: userData.lastName,
                birth: userData.birth,
                startDate: userData.startDate,
                street: userData.street,
                city: userData.city,
                state: userData.state,
                zip: userData.zip,
                department: userData.department
            })
        )
        store.dispatch(employeeCreated(true))
      }

    const formDataInput = (e) => {
        e.persist()
        const { name, value } = e.target
        setUserData((state) => ({
          ...state,
          [name]: value
        }))
    }

    return (
        <div>
            <form className="userForm" >
                <h2> Create Employee </h2>
                <div className="GeneralForm">
                <label className="formLabel">
                    <h3 className="dataLabel"> First Name  </h3>
                    <input className="formInput" name="firstName"type="text" onChange={formDataInput} placeholder="John" required/>
                </label>
                <label className="formLabel">
                    <h3 className="dataLabel"> Last Name </h3>
                    <input className="formInput" name="lastName" type="text" onChange={formDataInput} placeholder="Doe" required/>
                </label>
                <label className="formLabel">
                    <h3 className="dataLabel"> Date of Birth </h3>
                    <input className="formInput" name="dateOfBirth"  type="date" onChange={formDataInput} required/>
                </label>
                <label className="formLabel">
                    <h3 className="dataLabel"> Start Date </h3>
                    <input className="formInput" name="startDate"  type="date" onChange={formDataInput} required/>
                </label>
                </div>
                <div className="fieldset">
                <label className="formLabel">
                    <h3 className="dataLabel"> Street </h3>
                    <input className="formInput"  name="street" type="text" placeholder="48 Indian Spring Ave." onChange={formDataInput} required/>
                </label>
                <label className="formLabel">
                    <h3 className="dataLabel"> City </h3>
                    <input className="formInput"  name="city"  type="text" placeholder="Brooklyn" onChange={formDataInput} required/>
                </label>
                <label className="formLabel">
                    <h3 className="labelText"> State </h3>
                    <select className="formSelect" name="state" onChange={formDataInput}  required>
                    <option value=""></option>
                    {states.map((state, index) => {
                        return (
                        <option key={index} value={state.abbreviation}>
                            {state.name}
                        </option>
                        )
                    })}
                    </select>
                </label>
                <label className="formLabel">
                    <h3 className="labelText">  Zip Code </h3>
                    <input className="formInput" name="zipCode"  type="number" onChange={formDataInput} placeholder="11218" required/>
                </label>
                </div>
                <label className="formLabel">
                    <h3 className="labelTextDepartment"> Department </h3>
                    <select className="departmentSelect" name="department" required>
                        <option value=""></option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Legal">Legal</option>
                    </select>
                </label>
                <button type="submit" className="submitForm" onSubmit={sendForm}> Save </button>
            </form>
            {openModal && (
                <FormModal closeModal={() => setOpenModal(false)}></FormModal>
            )}
        </div>
    )
}

export default EmployeeForm