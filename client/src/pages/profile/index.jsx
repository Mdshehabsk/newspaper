/* eslint-disable no-unused-vars */
import axios from "axios";
import React, {useState, useEffect } from "react";
import { Routes , Route } from "react-router-dom";
import Navbar from "./Navbar";
import Myprofile from "./Myprofile";
import EditProfile from "./EditProfile";
const Profile = () => {
  const [user,setUser] = useState([])
  // const navigate = useNavigate()
  const logoutFunc = async () => {
    const res = await axios.get("/api/v1/user/logout", {
      withCredentials: true,
    });
    if (res.status === 200) {
      window.location.href = "/";
    }
  };
  const apicall = async () => {
    const res = await axios.get('/api/v1/user', {withCredentials: true})
    setUser(res.data)
  };
  useEffect(()=>{
    apicall()
  },[])
  return (
    <>
      <div className="profile w-full mt-4 md:mt-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <Navbar/>
            <Routes>
              <Route path="/" element={<Myprofile user={user} logoutFunc={logoutFunc} />} />
              <Route path="/editprofile" element={<EditProfile user={user} apicall={apicall} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
