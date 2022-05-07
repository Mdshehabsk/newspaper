/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const Myprofile = ({ user, logoutFunc }) => {
  return (
    <>
      <div className="profile-content w-full  md:w-2/3 bg-blue-50 p-8">
        <div>
          <h3 className="text-3xl font-bold uppercase text-rose-800 border-b-2 border-slate-400 w-full p-4 ">
            my profile
          </h3>
          <div className="flex flex-col space-y-32 md:space-y-0 md:space-x-52 md:items-start md:flex-row mt-12 ">
            <img
              src={user.imageUrl}
              alt="no image"
              className=" w-[12rem] h-[12rem] rounded-full self-center "
            />
            <div className="space-y-12">
              <h3 className="name font-semibold text-3xl text-blue-500 ">
                {user.name}
              </h3>
              <p className="email text-2xl font-medium  ">
                Email: {user.email}
              </p>
              <p className="country text-2xl font-medium ">
                Country: {user.country}
              </p>
              <p className="birthday text-2xl font-medium ">
                Birthday: {user.birthday}
              </p>
            </div>
          </div>
        </div>
        <button
          className="w-full p-4 bg-red-700 text-white text-3xl capitalize focus:bg-rose-800 mt-12 rounded-lg "
          onClick={logoutFunc}
        >
          logout
        </button>
      </div>
    </>
  );
};

export default Myprofile;
