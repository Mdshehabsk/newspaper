import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Item from '../components/Item'
import toast, {Toaster} from 'react-hot-toast'
import { useEffect,useState } from 'react'
import { backend_url } from '../components/env'
const CategoryPost = ({admin}) => {
    const [data, setData] = useState(null)
    const [dependency,setDependency] = useState(false)
    const {category} = useParams()
    const apicall = async () =>{
        const res = await axios.get(`${backend_url}/api/v1/post/${category}`)
        setData(res.data)
    }
    const deletePost = async (postId,setModalIsOpen) => {
      const res = await axios.delete(`${backend_url}/api/v1/post/deletepost/${postId}`,{withCredentials:true})
      if(res.status===200){
        setModalIsOpen(false)
        setDependency(true)
      }
      const bg = res.status === 200 ? "#22b33c" : "red";
      toast(res.data.message, {
        duration: 3000,
        position: "top-center",
        // Styling
        style: {
          width: "250px",
          background: `${bg}`,
          color: "white",
          fontSize: "2rem",
        },
        className: "",
        // Custom Icon
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
    useEffect(()=>{
        apicall()
    },[dependency])
  return (
    <>
    <div className="container px-8 mx-auto mt-8 lg:px-0 ">
        <div className="home-wrapper grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {
          data && data.map((item,ind) =>
           <Item {...item} admin={admin} deletePost={deletePost} />) 
        }
        </div>
        </div>
        <Toaster/>
    </>
  )
}

export default CategoryPost