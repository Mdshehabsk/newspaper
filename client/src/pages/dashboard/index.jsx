import React from 'react'
import Navbar from './Navbar'
import { Routes,Route } from 'react-router-dom'
import NewPost from './NewPost'
import UserModify from './UserModify'
import PostAccept from './PostAccept'
const index = () => {
  return (
    <>
     <div className="profile w-full mt-4 md:mt-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <Navbar/>
            <Routes>
              <Route path='/' element={<NewPost/>} />
              <Route path='/usermodify' element={<UserModify/>} />
              <Route path='/postaccept' element={<PostAccept/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default index