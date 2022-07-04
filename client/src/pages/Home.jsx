/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React , {useEffect,useState} from 'react'
import { useNavigate,Link} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Item from '../components/Item'
const Home = () => {
  const [progress,setProgress] = useState(0)
  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const apicall = async () => {
    const res = await axios.get('http://localhost:8000/api/v1/post',{withCredentials:true})
    if(res.status === 202){
      navigate('/login')
    }
   if(res){
      setData(res.data)
   }else{
      setData(null)
   } 
  }
  useEffect(() => {
    apicall()
  },[])

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
          data && data.map((item,ind) =><Link  to={`/${item.category[Math.floor(Math.random() * item.category.length)]}/singlepost/${item._id}`} key={ind} >
           <Item onClick={()=>setProgress(100)} {...item}  />
          </Link> ) 
        }
        </div>
        </div>
    </>
  )
}
export default Home