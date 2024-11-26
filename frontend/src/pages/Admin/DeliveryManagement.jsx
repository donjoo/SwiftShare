import React, { useEffect } from 'react'
import { useState } from 'react'


import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react'
import adminAxiosInstance from '../../adminaxiosconfig'
import { useSelector } from 'react-redux'
import AdminNavbar from '../../components/AdminComponents/AdminNavbar'



  
function DeliveryManagement() {

    const [deliveries, setDeliveries] = useState([]);
    const [error,setError]    = useState(null);
    const user = useSelector((state) => state.auth.user);
    const [statuses] = useState([
        "PENDING",
        "PICKED_UP",
        "DELIVERED",
        "CANCELED",
      ]);




    const fetchDeliveries = async () => {
        try {
            const response = await adminAxiosInstance.get('/admin/Deliverylist/');

            if (response.data){
                setDeliveries(response.data.deliveries); 
            } else {
                setError('No data found.');
            }
        }catch (error){
            console.error('Error fetching userlist')
        }
    };

    
    const handleStatusChange = async (deliveryId, newStatus) => {
        try {
          const response = await adminAxiosInstance.patch(
            `/admin/Delivery/${deliveryId}/update-status/`,
            { status: newStatus }
          );
          if (response.status === 200) {
            alert("Status updated successfully");
            fetchDeliveries(); // Refresh the list
          }
        } catch (error) {
          console.error("Error updating status", error);
          alert("Failed to update status");
        }
      };
    useEffect(() => {
        fetchDeliveries()
    },[])



  return (
   <>
   < AdminNavbar />
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Delivery Management</h1>
    
   

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">created at</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deliveries.map((delivery) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{delivery.created_at}</td>
              <td className="px-6 py-4 whitespace-nowrap">{delivery.from_address.address_line_1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{delivery.to_address.address_line_1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{delivery.status}</td>
              <td className="px-6 py-4">
                    <select
                      className="p-2 border rounded"
                      value={delivery.status}
                      onChange={(e) =>
                        handleStatusChange(delivery.id, e.target.value)
                      }
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

   
  
  </div>
  </>
  )
}

export default DeliveryManagement







