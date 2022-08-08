import React from 'react'
import {FaSearch} from 'react-icons/fa'
const SearchBox = ({fontStyle}) => {
  return (
    <>
    <div className="input w-80 flex items-center justify-between absolute top-20 border-slate-800 h-16 border px-4 bg-white ">
    <input type="text" placeholder='খুজুন' className='h-full w-full px-4 py-4 text-2xl focus:outline-none '  />
    <FaSearch  style={fontStyle} className='text-slate-600 text-3xl' />
    </div>
    </>
  )
}

export default SearchBox