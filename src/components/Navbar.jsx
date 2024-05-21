import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div className='bg-white h-24 p-4 flex items-center justify-between rounded-[20px] shadow-md w-full'>
      <h1 className='text-2xl lg:text-3xl font-bold'>CourseCatalyst</h1>
      <div className='flex flex-row items-center justify-center gap-1'>
      <Link to="/"><button className='text-sm md:text-md font-semibold p-2 bg-blue-700 text-white rounded-lg'>Home</button></Link> 
      <Link to='/dashboard'>
      <button className='text-sm md:text-md font-semibold p-2 bg-blue-700 text-white rounded-lg flex flex-row items-center justify-center gap-1'><span>Go to Dashboard</span>
      <MdSpaceDashboard className='text-md md:text-lg'/>
      </button>
      </Link>
      </div>
    </div>
  )
}

export default Navbar
