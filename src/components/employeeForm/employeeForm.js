import React from 'react'
import { useState } from 'react'
import FormModal from 'eugeniegene-hrnet-modal-addon/dist/formModal'
import { useSelector } from 'react-redux'
import states from '../../mocked-Data/allStates'

import store from '../../redux/store.js'
import {create} from '../../redux/user/userFeatures.js'

import "./employeeForm.css"


/**
 * creates the employee form
 * every area is required.
 * Each new employee will have a new id assigned to be displayed in the data table. 
 * The modal (installed via npm) will only show up if the user was succesfully created. 
 */

const EmployeeForm = () => {

    const [openModal, setOpenModal] = useState(false)
    const message = "Employee successfully created !"

    const user = useSelector((state)=>state.employee.rows)
    let idCount = user.length+1

    const [userData, setUserData] = useState({
        id:'',
        firstName: '',
        lastName: '',
        startDate: '',
        department: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      })

    const SendForm = (e) => {
        e.preventDefault()
        setOpenModal(true)
        store.dispatch(
            create({
                id: idCount,
                firstName: userData.firstName,
                lastName: userData.lastName,
                startDate: userData.startDate,
                department: userData.department,
                birth: userData.dateOfBirth,
                street: userData.street,
                city: userData.city,
                state: userData.state,
                zip: userData.zipCode,
            })
        )     
      }

    const formDataInput = (e) => {
        e.preventDefault()
        e.persist()
        const { name, value } = e.target
        setUserData((state) => ({
          ...state,
          [name]: value
        }))
    }

    return (
        <div>
            {openModal && (
                <FormModal message={message} closeModal={() => setOpenModal(false)} />
            )}
            <form className="userForm" action="#" onSubmit={SendForm} >
                <h2> Create Employee </h2>
                <div className="GeneralForm">
                <label className="formLabel">
                    <h3 className="dataLabel"> First Name  </h3>
                    <input className="formInput" name="firstName" type="text" onChange={formDataInput} placeholder="John" required/>
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
                    <select className="departmentSelect" name="department" onChange={formDataInput} required>
                        <option value=""></option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Legal">Legal</option>
                    </select>
                </label>
                <button type="submit" className="submitForm" > Save </button>
            </form>
        </div>
    )
}

export default EmployeeForm