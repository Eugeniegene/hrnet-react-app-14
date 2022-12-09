import * as React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'

import './employeeDataTable.css'

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * creates the search toolbar, just above the data table
 */
function QuickSearchToolbar(props) {
  return (
    <Box sx={{ p: 0.5, pb: 0 }} >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="ex: Pierre Richard"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton title="Clear" aria-label="Clear" size="small" 
              style={{ visibility: props.value ? 'visible' : 'hidden' }} 
              onClick={props.clearSearch}>
              <ClearIcon fontSize="small" />
            </IconButton>
          )
        }}
        sx={{ width: { xs: 1, sm: 'auto'},
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5
          },
          '& .MuiInput-underline:before': {borderBottom: 1,borderColor: 'divider'}
        }}
      />
    </Box>
  )
}

/**
 * initisalising the employee list data table 
 * colums will be edited as soon as a research via toolbar will be done.
 * each column can be filtered by clicking on the header name.
 */

function EmployeeList() {
  const user = useSelector((state)=>state.employee.rows)

  const columns = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'birth', headerName: 'Birth', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'street', headerName: 'Street', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'zip', headerName: 'Zip code', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 }
  ]

  const [searchData, setSearchData] = React.useState('')
  const [newRow, setNewRow] = React.useState(user)

  const requestSearch = (searchUserValue) => {
    setSearchData(searchUserValue)
    const searchRegex = new RegExp(escapeRegExp(searchUserValue), 'i')
    const filter = user.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString())
      })
    })
    setNewRow(filter)
  }

  React.useEffect(() => {
    setNewRow(user)
  }, [user])

  return (
    <div id="employee-div" className="dataGridContainer">
      <h2>Current Employees</h2>
      <Box sx={{ height: 400, width: '100%'}}>
        <DataGrid
          rows={newRow}
          columns={columns}
          components={{ Toolbar: QuickSearchToolbar }}
          className="dataGridTable"
          componentsProps={{
            toolbar: {
              value: searchData,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch('')
            }
          }}
        />
      </Box>
    </div>
  )
}

export default EmployeeList