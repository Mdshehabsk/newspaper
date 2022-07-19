import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
const SinglePost = () => {
  const [singlepost,setSinglepost] = useState('')
  const [categoryPost,setCategoryPost] = useState('')
    const {category,postid} = useParams()
    const SinglePostApicall = async () => {
      const res = await axios.get(`/api/v1/post/${category}/singlepost/${postid}`)
      setSinglepost(res.data)
    }
    const categoryPostApicall = async () => {
      const res = await axios.get(`/api/v1/post/${category}`)
      setCategoryPost(res.data)
    }
    useEffect(()=>{
      SinglePostApicall()
    },[postid])
    useEffect(()=>{
      categoryPostApicall()
    },[])

  return (
    <>
    <div className="container mx-auto">
      <div className="flex flex-wrap mt-24">
        <div className="basis-full md:basis-3/4 px-4">
          <h1 className='text-4xl lg:text-6xl font-semibold ' > {singlepost.title} </h1>
          {/* <img className='my-8 text-center ' src={`${singlepost.image}`} alt="" />
          <p className='text-2xl md:text-4xl lg:max-w-[90%] tracking-wider leading-snug ' >{singlepost.description}</p> */}
        <div className='mt-20 md:mt-26' dangerouslySetInnerHTML={{__html:singlepost.text}} ></div>
        </div>
        <div className="basis-full md:basis-1/4 flex flex-wrap md:block ">
            {
              categoryPost && categoryPost.slice(0,10).filter(e=>e._id !== postid).map(item=>

                 <div className="p-4 basis-1/2 lg:basis-full lg:hover:shadow-lg ">
                  <Link  to={`/${item.category[Math.floor(Math.random() * item.category.length)]}/singlepost/${item._id}`} >
                 <h2 className='text-2xl sm:text-3xl font-semibold my-2 ' > {item.title} </h2>
              <div className="flex lg:space-x-4 items-center ">
              <p className='hidden lg:block md:text-2xl ' >{item.description.substring(0,100)}...</p>
              <img src={item.image} alt="" className='w-full lg:w-1/2' />
              </div>
              </Link> 
                 </div>)
            }
        </div>
      </div>
    </div>
    </>
  )
}

export default SinglePost