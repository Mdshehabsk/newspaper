import React from 'react'

const Input = ({type,placeholder,name}) => {
  return (
    <>
    <input type={type} placeholder={placeholder} name={name} className='w-full h-16 text-3xl p-4 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 ' />
    </>
  )
}

export default Input