import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../redux/auth/authSlice';
import Logout from './Logout';



function Navbar() {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  // useEffect(() => {
  //   if (!user) {
  //     const storedUserData = localStorage.getItem('user');
  //     if (storedUserData) {
  //       const parsedUserData = JSON.parse(storedUserData);
  //       dispatch(setAuthData({ user: parsedUserData }));
  //     } 
  //   }
  // }, [dispatch, navigate, user]);

  return (
    
    <header className="bg-white shadow-md">
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-500">CommunityGo</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">Home</a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">How It Works</a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">About Us</a>
          <a href="#" className="text-gray-600 hover:text-orange-500 transition duration-300">Contact</a>
          { user ? (
            <>
          <NavLink to='#' className="text-orange-500 hover:underline">{user.username}</NavLink>
          <NavLink to="/logout" className="text-blue-500 hover:underline">
               LogOut
          </NavLink>

          </>
          ):(
            <>
    <NavLink to="/register" className="text-blue-500 hover:underline">Signup</NavLink>
    <NavLink to="/login" className="text-blue-500 hover:underline">Login</NavLink>
          </>
        )}
        </div>
      </div>
    </nav>
  </header>

  )
}

export default Navbar
