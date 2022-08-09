/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React , {useEffect,useState} from 'react'
import { useNavigate,Link} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { backend_url } from '../components/env';
import Item from '../components/Item'
import toast,{Toaster} from 'react-hot-toast';
const Home = ({admin}) => {
  const [progress,setProgress] = useState(0)
  const [dependency,setDependency] = useState(false)
  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const apicall = async () => {
    const res = await axios.get(`${backend_url}/api/v1/post`,{withCredentials:true})
    if(res.status === 202){
      navigate('/login')
    }
   if(res){
      setData(res.data)
   }else{
      setData(null)
   } 
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
  useEffect(() => {
    apicall()
  },[dependency])

  return (
    <>
     <LoadingBar
        color='#f11946'
        height='3px'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container px-8 mx-auto mt-8 lg:px-0 ">
        <div className="home-wrapper grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {
          data && data.map((item,ind) =>
           <Item onClick={()=>setProgress(100)} {...item} key={ind} deletePost={deletePost} admin={admin} />
           ) 
        }
        </div>
        </div>
        <Toaster/>
    </>
  )
}
export default Home