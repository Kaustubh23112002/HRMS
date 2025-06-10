import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    department: ''
  });
  const [departments, setDepartments] =useState(null);
  const [employees, setEmployees] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams()


    useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
      };
      getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees (e.target.value)
        setEmployees(emps) 
       }

  useEffect(() => {
      const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
            const employee = response.data.employee
          setEmployee((prev)=> ({...prev, name: employee.userId.name, maritalStatus: employee,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value,  } = e.target;
  setEmployee((prevData) => ({ ...prevData, [name]: value }));
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const response = await axios.put(
        `http://localhost:8000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onChange={handleDepartment}
              value={employee.department}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>




         {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maratial Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              placeholder="Marital Status"
              className="mt-1 pt-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={employee.designation}
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>


          {/*Salary*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={employee.salary}
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

     
        

        
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Edit Employee
        </button>
      </form>
    </div>
    ) : <div>Loading...</div>}</>
  );
};

export default Add;
