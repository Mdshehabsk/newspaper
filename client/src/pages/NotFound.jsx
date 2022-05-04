import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <>
    <div className="container mx-auto ">
        <div className="notfount-wrapper flex flex-col items-center justify-center ">
        <h1 className='text-9xl mt-10 text-red-600 capitalize ' >404 Not Found page</h1>
        <Link to='/' className='mt-12 bg-green-800 text-slate-50 text-5xl px-4 py-4  ' >Back to Home page</Link>
        </div>
    </div>
    </>
  )
}

export default NotFound