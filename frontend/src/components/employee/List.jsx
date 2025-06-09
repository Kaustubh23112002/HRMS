import React, {useState} from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, getEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)

   useEffect(() => {
      const fetchEmployees = async () => {
        setEmpLoading(true)
        try {
          const response = await axios.get('http://localhost:8000/api/employees',{
            headers: {
              "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success) {
            let sno = 1;
          
            const data = await response.data.employees.map((emp) => (
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob: emp.dob,
                profileImage: emp.userId.profileImage,
                action: (<EmployeeButtons Id={emp._id}/>)
              }
            ));
            setDepartments(data);
            setFilterDepartments(data)
  
          }
        } catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
        } finally {
          setEmpLoading(false)
        }
      };
  
      fetchDepartments()
    }, []);
  
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="search By Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
    </div>
  );
};

export default List;
