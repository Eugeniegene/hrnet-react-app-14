import { Link } from 'react-router-dom'

import EmployeeForm from '../../components/employeeForm/employeeForm'

import "./Homepage.css"

const Homepage = () => {
    return (
      <div className='homepage'>
        <div className='employeeLinked'>
          <Link to='/Employees'> View Current Employees </Link>
        </div>
        <EmployeeForm />
      </div>
    )
  }

export default Homepage