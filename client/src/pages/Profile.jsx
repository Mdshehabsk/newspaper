/* eslint-disable no-unused-vars */
import axios from "axios";
import React, {useState, useEffect } from "react";
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
            <div className="profile-nav flex md:flex-col w-full h-auto md:w-1/3 md:space-y-20  bg-slate-200 p-8 ">
              <h3 className="text-3xl font-semibold uppercase hidden md:block ">
                my account
              </h3>
              <ul className=" flex md:flex-col md:space-x-0 md:ml-8 md:mt-4 md:space-y-8 space-x-4 ">
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  my profile
                </li>
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  edit profile
                </li>
              </ul>
              <h3 className="text-3xl font-semibold uppercase hidden md:block ">

                activities
              </h3>
              <ul className=" flex md:flex-col md:space-x-0 ml-4 md:ml-8 md:mt-4 md:space-y-8 space-x-4 ">
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  my comment
                </li>
                <li className="text-3xl capitalize text-blue-500 font-medium ">
                  save article
                </li>
              </ul>
            </div>
            <div className="profile-content w-full  md:w-2/3 bg-blue-50 p-8">
              <div>
                <h3 className="text-3xl font-bold uppercase text-rose-800 border-b-2 border-slate-400 w-full p-4 ">
                  my profile
                </h3>
                <div className="flex flex-col space-y-32 md:space-y-0 md:space-x-52 md:items-start md:flex-row mt-12 ">
                  <img
                    src={user.imageUrl}
                    alt=""
                    className=" w-[12rem] h-[12rem] rounded-full self-center "
                  />
                  <div className="space-y-12">
                    <h3 className="name font-semibold text-3xl text-blue-500 ">
                      Md shehab uddin
                    </h3>
                    <p className="email text-2xl font-medium  ">

                      Email: {user.email}
                    </p>
                    <p className="country text-2xl font-medium "> Country: {user.country} </p>
                    <p className="birthday text-2xl font-medium ">

                      Birthday: {user.birthday}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="w-full p-4 bg-red-700 text-white text-3xl focus:bg-rose-800 mt-12 rounded-lg "
                onClick={logoutFunc}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
