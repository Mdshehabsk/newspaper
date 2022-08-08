
import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className="profile-nav flex md:flex-col w-full h-auto md:w-1/3 md:space-y-20  bg-slate-200 p-8 ">
              <h3 className="text-3xl font-semibold uppercase hidden md:block ">
                my account
              </h3>
              <ul className=" flex md:flex-col md:space-x-0 md:ml-8 md:mt-4 md:space-y-8 space-x-4 ">
                <Link to='' className="text-3xl capitalize text-blue-500 font-medium ">
                  my profile
                </Link>
                <Link to='/profile/editprofile' className="text-3xl capitalize text-blue-500 font-medium ">
                  edit profile
                </Link>
              </ul>
              <h3 className="text-3xl font-semibold uppercase hidden md:block ">

                activities
              </h3>
              <ul className=" flex md:flex-col md:space-x-0 ml-4 md:ml-8 md:mt-4 md:space-y-8 space-x-4 ">
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  my comment
                </li>
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  save article
                </li>
              </ul>
            </div>
    </>
  )
}

export default Navbar