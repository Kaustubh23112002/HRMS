import React from 'react'
import {Link} from 'react-router-dom'

const DepartmentList = () => {
  return (
    <div>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
    <div>
    <input type="text" placeholder='Search By Dep Name'/>
    <Link to="/admin-dashboard/add-department">Add New Department</Link>
    </div>
    </div>
  )
}

export default DepartmentList