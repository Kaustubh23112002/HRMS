import React, {useEffect, useState} from 'react'
import { use } from 'react'
import { useParams } from 'react-router-dom'

const EditDepartment = () => {
    const {id} = useParams() 
const [department, setDepartment] = useState(null)
useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get(
            `http://localhost:8000/api/department/${id}`,{
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success) {
         setDepartment(response.data.department)

        }
      } catch (error) {
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
      } finally {
        setDepLoading(false)
      }
    };

    fetchDepartments()
  }, [])
  return (
  
  )
}

export default EditDepartment