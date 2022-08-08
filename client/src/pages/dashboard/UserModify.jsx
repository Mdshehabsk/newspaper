import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { backend_url } from "../../components/env";
import toast,{Toaster} from "react-hot-toast";
const UserModify = () => {
  const [role,setRole] = useState('')
  const [userSearch, setUserSearch] = useState("");
  const [user, setUser] = useState("");
  const inputChange = async (e) => {
    setUserSearch(e.target.value);
  };
  const userSearchApi = async () => {
    const res = await axios.get("/api/v1/user/userSearch/", {
      params: { email: userSearch },
    });
    setUser(res.data);
  };
  const userModify = async id => {
    const res = await axios.post('/api/v1/user/usermodify/'+id,{role})
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
    userSearchApi();
  }, [userSearch]);
  return (
    <>
      <div className="container mx-auto mt-16 ">
        <div className="w-full md:w-8/12  mx-auto flex  items-center ">
          <input
            value={userSearch}
            onChange={inputChange}
            type="text"
            name="title"
            id="title"
            placeholder="Enter User Email"
            className="p-4 border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 text-3xl w-full "
          />
        </div>
        {user && (
          <div className="flex items-center space-x-8 w-full md:w-8/12 mx-auto mt-8 h-20 px-4 rounded-md bg-slate-200  ">
            <img
              src={`/${user.imageUrl}`}
              alt=""
              className="rounded-full w-16 h-16  "
            />
            <p className="text-2xl lg:text-4xl "> {user.email} </p>
            <select onChange={(e)=>setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-80 p-2.5">
              <option value='user' selected>User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={()=>userModify(user._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 md:text-2xl  rounded">
              Submit
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default UserModify;
