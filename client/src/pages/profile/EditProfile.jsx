/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { backend_url } from "../../components/env";
const EditProfile = ({ user, apicall }) => {
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const FormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    if (!image) {
      return toast("Please select an image", {
        duration: 2000,
        position: "top-center",
        // Styling
        style: {
          width: "200px",
          background: "red",
          color: "white",
          fontSize: "2rem",
        },
        className: "",
        // Custom Icon
      });
    }
    const res = await axios.put("/api/v1/user/profile/update", formData, {
      withCredentials: true,
    });
    if (res.status === 200) {
      toast(res.data.message, {
        duration: 2000,
        position: "top-center",
        style: {
          width: "200px",
          background: "green",
          color: "white",
          fontSize: "2rem",
        },
      });
      setTimeout(() => {
        apicall();
      }, 2000);
    }
  };
  const avatarUpload = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImage(file);
      setShowImage(reader.result);
    };
  };
  return (
    <>
      <div className="profile-content w-full  md:w-2/3 bg-blue-50 p-8">
        <div>
          <h3 className="text-3xl font-bold uppercase text-rose-800 border-b-2 border-slate-400 w-full p-4 ">
            Edit profile
          </h3>
          <div className="flex flex-col items-center space-y-32 mt-12 ">
            <div className="img relative">
              <img
                src={showImage ? showImage : user.imageUrl}
                alt=" no image "
                className=" w-[12rem] h-[12rem] rounded-full self-center "
              />
              <input
                type="file"
                name="avatar"
                onChange={avatarUpload}
                className="absolute left-24 top-36  bottom-4 z-10 opacity-0 "
              />
              <AiOutlinePlusCircle className="text-5xl text-slate-50 bg-blue-700 absolute right-0 bottom-4 w-12 h-12 rounded-full" />
            </div>
            <div className="space-y-12">
              <h3 className="name font-semibold text-3xl text-blue-500 ">
                {user.name}
              </h3>
              {/* <p className="email text-2xl font-medium  ">
                Email: {user.email}
              </p>
              <p className="country text-2xl font-medium ">
                Country: {user.country}
              </p>
              <p className="birthday text-2xl font-medium ">
                Birthday: {user.birthday}
              </p> */}
            </div>
          </div>
        </div>
        <button
          className="w-full p-4 bg-green-700 text-white text-3xl capitalize focus:bg-rose-800 mt-12 rounded-lg "
          onClick={FormSubmit}
        >
          Submit
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default EditProfile;
