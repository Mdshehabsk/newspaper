
import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
        <div className="container mx-auto bg-slate-100  ">
            <div className="w-full md:w-2/3 mx-auto ">
                <ul className='flex space-x-8 justify-center' >
                    <li className='text-3xl py-8 md:px-8  md:hover:bg-slate-300 capitalize' >
                        <Link to='' >
                        New post
                        </Link>
                    </li>
                    <li className='text-3xl py-8 md:px-8  md:hover:bg-slate-300 capitalize' >
                        <Link to='/dashboard/usermodify/' >
                        user modify
                        </Link>
                    </li>
                    <li className='text-3xl py-8 md:px-8  md:hover:bg-slate-300 capitalize' >
                        <Link to='/dashboard/postaccept/'>
                        Post accept
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar