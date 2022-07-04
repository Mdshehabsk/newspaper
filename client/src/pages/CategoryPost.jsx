import React from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import Item from '../components/Item'
import { useEffect,useState } from 'react'
const CategoryPost = () => {
    const [data, setData] = useState(null)
    const {category} = useParams()
    const apicall = async () =>{
        const res = await axios.get(`/api/v1/post/${category}`)
        setData(res.data)
    }
    useEffect(()=>{
        apicall()
    },[])
  return (
    <>
    <div className="container px-8 mx-auto mt-8 lg:px-0 ">
        <div className="home-wrapper grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {
          data && data.map((item,ind) =><Link to={`/${item.category[Math.floor(Math.random() * item.category.length)]}/singlepost/${item._id}`} key={ind} >
           <Item {...item}  />
          </Link> ) 
        }
        </div>
        </div>
    </>
  )
}

export default CategoryPost