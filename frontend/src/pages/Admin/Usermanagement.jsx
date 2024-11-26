import React, { useEffect } from 'react'
import { useState } from 'react'


import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react'
import adminAxiosInstance from '../../adminaxiosconfig'
import { useSelector } from 'react-redux'
import AdminNavbar from '../../components/AdminComponents/AdminNavbar'



  
function Usermanagement() {

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '' })
    const [editingUser, setEditingUser] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error,setError]    = useState(null);
    const user = useSelector((state) => state.auth.user);




    const fetchUserlist = async () => {
        try {
            const response = await adminAxiosInstance.get('/admin/userlist/');

            if (response.data){
                setUsers(response.data.users); 
            } else {
                setError('No users found.');
            }
        }catch (error){
            console.error('Error fetching userlist')
        }
    };

    
    const toggleUserStatus = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus ? 'block' : 'unblock';
            const response = await adminAxiosInstance.post(`/users/${userId}/toggle-status/`);
            
            if (response.data.success) {
                alert(`User successfully ${newStatus}ed!`);
                fetchUserlist();
            } else {
                alert(`Failed to ${newStatus} the user.`);
            }
        } catch (error) {
            console.error(`Failed to toggle user status for user ID ${userId}:`, error);
            alert('An error occurred while updating user status.');
        }
    };
    

    
    useEffect(() => {
        fetchUserlist()
    },[])


    const addUser = (e) => {
      e.preventDefault()
      setUsers([...users, { ...newUser, id: users.length + 1 }])
      setNewUser({ name: '', email: '', role: '' })
    }
  
    const deleteUser = (id) => {
      users.filter(user => user.id !== id)
    }


    
  
    const updateUser = (e) => {
      e.preventDefault()
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
      setEditingUser(null)
      setIsModalOpen(false)
    }
  
    const openEditModal = (user) => {
      setEditingUser(user)
      setIsModalOpen(true)
    }
  

  return (
   <>
   < AdminNavbar />
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    
    <form onSubmit={addUser} className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <PlusIcon className="inline-block mr-2 h-4 w-4" /> Add User
        </button>
      </div>
    </form>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="p-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button
    onClick={() => toggleUserStatus(user.id, user.is_active)}
    className={`p-1 ${
        user.is_active ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
    } rounded-md hover:${
        user.is_active ? 'bg-red-200' : 'bg-green-200'
    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        user.is_active ? 'focus:ring-red-500' : 'focus:ring-green-500'
    }`}
>
    {user.is_active ? 'Block' : 'Unblock'}
</button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={updateUser} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={editingUser?.name || ''}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser?.email || ''}
              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Role"
              value={editingUser?.role || ''}
              onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  </>
  )
}

export default Usermanagement







