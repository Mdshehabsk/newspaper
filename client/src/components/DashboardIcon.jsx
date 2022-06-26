import React from 'react'
import {BsPlusLg} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const DashboardIcon = () => {
  return (
    <>
    <div className="bg-rose-800 h-16 w-16 flex items-center justify-center p-4 fixed right-4 bottom-12 rounded-lg  ">
      <Link to='/dashboard' >
      <BsPlusLg className='text-4xl text-slate-50 ' ></BsPlusLg>
      </Link>
    </div>
    </>
  )
}

export default DashboardIcon