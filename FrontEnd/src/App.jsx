import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:3000/employees");
        if (!res.ok){
            throw new Error("Network response was not ok");
          }
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);


  return (
    <div className='bg-gradient-to-t from-slate-100 via-slate-300 to-slate-100 w-full min-h-screen'>
      <h1 className='text-3xl font-bold text-center p-10'>Employee Access Simulator</h1>

      {/* Employees Table */}
      <div className='border w-5/6 mx-auto p-5 rounded-lg shadow-lg'>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Access Level</th>
                <th>Request Time</th>
                <th>Cool Down</th>
                <th>Room</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>

              {
                employees.map((employee, index) => (
                  <tr key={`${employee.id}-${index}`}>
                    <td>{employee.id}</td>
                    <td>{employee.access_level}</td>
                    <td>{employee.request_time}</td>
                    <td>{employee.cool_down || 0}</td>
                    <td>{employee.room}</td>
                    <th>
                      <button onClick={()=> alert(`Simulating access for ${employee.id}`)} className="btn btn-outline btn-error">Simulate Access</button>
                    </th>
                  </tr>
                ))
              }


            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Id</th>
                <th>Access Level</th>
                <th>Request Time</th>
                <th>Cool Down</th>
                <th>Room</th>
                <th>Access</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>


      {/* Rules Table */}
      <div className='border w-5/6 mx-auto p-5 rounded-lg shadow-lg bg-gray-300 mt-40'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Rules</h1>
        <div className="overflow-x-auto">
          <table className="table table-pin-rows ">
            {/* head */}
            <thead>
              <tr>
                <th>Room</th>
                <th>Min Access Level</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Cool Down</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>ServerRoom</td>
                <td>2</td>
                <td>9:00</td>
                <td>11:00</td>
                <td>15</td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Vault</td>
                <td>3</td>
                <td>9:00</td>
                <td>10:00</td>
                <td>30</td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>R&D Lab</td>
                <td>1</td>
                <td>8:00</td>
                <td>12:00</td>
                <td>10</td>
              </tr>

            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Room</th>
                <th>Min Access Level</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Cool Down</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  )
}

export default App
