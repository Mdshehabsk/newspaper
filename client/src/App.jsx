import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllItems from "./pages/AllItems";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import Register from "./pages/Register";
import ForgetPassword from "./pages/forgetPassword";
import Dashboard from './pages/dashboard'
import DashboardIcon from "./components/DashboardIcon";
import axios from "axios";
import {useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(false);
  const [dashboard,setDashboard] = useState(false);
  const apicall = async () => {
    const res = await axios.get("/api/v1/roleauth", { withCredentials: true });
    setUser(res.data.user);
    setDashboard(res.data.dashboard);
  }
  useEffect(()=>{
    apicall()
  },[])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {user ? <Route path="/profile/*" element={<Profile user={user} apicall={apicall} />} /> : <Route path="/login" element={<Login />} />  }
        <Route path="/register" element={<Register />} />
        {!user ? <Route path="/forgetPassword" element={<ForgetPassword />} /> : null }
        <Route path="/allitems/:id" element={<AllItems />} />
        {dashboard ? <Route path="/dashboard/*" element={<Dashboard />} /> : null }
        <Route path="*" element={<NotFound />} />
      </Routes>
      {dashboard ? <DashboardIcon/> : null}
      <Footer/>
    </>
  );
}

export default App;
