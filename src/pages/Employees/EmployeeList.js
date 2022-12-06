import React from 'react'
import { Link } from 'react-router-dom'

import DataTable from "../../components/employeePageList/employeeDataTable.js"

import './EmployeeList.css'

const EmployeeList = () => {
    return (
    <div className='centralEmployeeList'>
        <Link className="goHome" to="/"> Home </Link>
        <DataTable />
    </div>
    )
}

export default EmployeeList 