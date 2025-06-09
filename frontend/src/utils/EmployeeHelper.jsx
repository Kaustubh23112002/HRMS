import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:8000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};


export const EmployeeButtons = ({DepId}) => {
    const navigate = useNavigate()

   
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
            onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}>
              View</button>
            <button className="px-3 py-1 bg-blue-600 text-white"
           >Edit</button>
             <button className="px-3 py-1 bg-yellow-600 text-white"
           >Salary</button>
             <button className="px-3 py-1 bg-red-600 text-white"
           >Leave</button>
        </div>
    )
}