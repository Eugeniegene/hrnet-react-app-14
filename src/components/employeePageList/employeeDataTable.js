import * as React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import moment from 'moment'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import {dataFormSelector} from '../../redux/user/userSelector.js'

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
            <IconButton title="Clear" aria-label="Clear" size="small" style={{ visibility: props.value ? 'visible' : 'hidden' }} onClick={props.clearSearch}>
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
  const user = useSelector(dataFormSelector)
  const rows = []
  const nbRows = rows.length

  for (let i = 0; i < nbRows; i += 1) {
    rows.push({
      id: i + 1,
      col1: user.rows[i].firstName,
      col2: user.rows[i].lastName,
      col3: moment(user.rows[i].birth).format('DD/MM/YYYY'),
      col4: moment(user.rows[i].startDate).format('DD/MM/YYYY'),
      col5: user.rows[i].street,
      col6: user.rows[i].city,
      col7: user.rows[i].state,
      col8: user.rows[i].zipCode,
      col9: user.rows[i].department
    })
  }

  const columns = [
    { field: 'col1', headerName: 'First Name', flex: 1 },
    { field: 'col2', headerName: 'Last Name', flex: 1 },
    { field: 'col3', headerName: 'Birth', flex: 1 },
    { field: 'col4', headerName: 'Start Date', flex: 1 },
    { field: 'col5', headerName: 'Street', flex: 1 },
    { field: 'col6', headerName: 'City', flex: 1 },
    { field: 'col7', headerName: 'State', flex: 1 },
    { field: 'col8', headerName: 'Zip code', flex: 1 },
    { field: 'col9', headerName: 'Department', flex: 1 }
  ]

  const [searchText, setSearchText] = React.useState('')

  const [rowsNew, setRowsNew] = React.useState(rows)

  const requestSearch = (searchValue) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString())
      })
    })
    setRowsNew(filteredRows)
  }

  React.useEffect(() => {
    setRowsNew(rowsNew)
  }, [rowsNew])

  return (
    <div id="employee-div" className="dataGridContainer">
      <h2>Current Employees</h2>
      <Box sx={{ height: 400, width: '100%'}}>
        <DataGrid
          rows={rowsNew}
          columns={columns}
          components={{ Toolbar: QuickSearchToolbar }}
          className="dataGridTable"
          componentsProps={{
            toolbar: {
              value: searchText,
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