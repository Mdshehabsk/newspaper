import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPost from "./pages/CategoryPost";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import Register from "./pages/Register";
import ForgetPassword from "./pages/forgetPassword";
import Dashboard from './pages/dashboard'
import DashboardIcon from "./components/DashboardIcon";
import axios from "axios";
import {useState, useEffect } from "react";
import { backend_url } from "./components/env";

function App() {
  const [user, setUser] = useState(false);
  const [admin,setAdmin] = useState(false);
  const apicall = async () => {
    const res = await axios.get(`${backend_url}/api/v1/roleauth`, { withCredentials: true });
    setUser(res.data.user);
    setAdmin(res.data.dashboard);
  }
  useEffect(()=>{
    apicall()
  },[])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home admin={admin} />} />
        {user ? <Route path="/profile/*" element={<Profile user={user} apicall={apicall} />} /> : <Route path="/login" element={<Login />} />  }
        <Route path="/register" element={<Register />} />
        {!user ? <Route path="/forgetPassword" element={<ForgetPassword />} /> : null }
        {admin ? <Route path="/dashboard/*" element={<Dashboard />} /> : null }
        <Route path='/:category' element={<CategoryPost admin={admin} />} />
        <Route path='/:category/singlepost/:postid' element={<SinglePost/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {admin ? <DashboardIcon/> : null}
      <Footer/>
    </>
  );
}

export default App;
