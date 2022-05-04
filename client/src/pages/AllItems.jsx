import React from 'react'
import { useParams } from 'react-router-dom'
const AllItems = () => {
    const {id} = useParams()
  return (
    <>
    <div className="container mx-auto">
        <h1 className='text-2xl font-bold text-center' > {id} </h1>
    </div>
    </>
  )
}

export default AllItems