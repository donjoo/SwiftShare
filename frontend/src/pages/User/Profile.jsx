import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import api from '../../api'
import UserProfile from '../../components/common/UserProfile';
import Deliverylist from '../../components/common/Deliverylist';

export default function Profile() {
  // In a real application, you would fetch this data from an API or database
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [deliveries, setDeliveries] = useState(null)


  useEffect(() => {
    const fetchprofile = async () => {

      console.log('hello');
      try {
        const response = await api.get(`/profile`)
        console.log('response',response)
        if (response.status === 200) {
          setUser(response.data.user)
          setDeliveries(response.data.deliveries)
          console.log(user)
        } else {
          setError('error occured while fetching user profile')
        }
      } catch (error) {
        console.log('An unexpected errror occured');
      }
    };

    fetchprofile()
  }, []);



  if (!user) {
    console.log(user,'uuuuuuuuuuuuuu')

    return (
      <>

      <div className="p-6">
        <p>Loading...</p>
      </div>
      </>
    ); // Show loading message if user data is null
  }


  return (
    <>
        < UserProfile user={user} deliveries={deliveries}/>
        {/* <div className="px-6 py-4 bg-gray-200 dark:bg-gray-700">
          <Link href="/profile/edit" className="block w-full py-2 px-4 bg-orange-500 text-white text-center rounded-md hover:bg-orange-600 transition-colors">
            Edit Profile
          </Link>
        </div> */}


            <section class="mt=10 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
              My requested Deliveries
            </h1>
            < Deliverylist deliveries={deliveries} />
          </section>
        </>

     
  )
}

