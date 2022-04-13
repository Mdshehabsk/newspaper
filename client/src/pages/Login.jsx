import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "../components/Input";
import { Link } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState('');
  const [value, setValue] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(true);
  const eyeShow = () => {
    setShowPassword(!showPassword);
  };
  const change = (e) => {
    setValue({...value,[e.target.name]:e.target.value})
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/v1/user/login',value,{withCredentials:true});
    setError(res.data.message);
  };
  const {email,password} = value;
  return (
    <>
      <div className="container mx-auto  ">
          <div className="login-wrapper px-10 mt-12 space-y-4 ">
            <div className="login-header ">
              <h1 className="text-center text-5xl font-semibold text-red-900 " >Login</h1>
            </div>
            <div className="google ">
              <button className="flex items-center text-4xl mx-auto bg-blue-300 p-4 text-white rounded-md " > <FcGoogle/> continue with google</button>
            </div>
            <div className="or">
              <button className="uppercase border rounded-full p-4 text-2xl mx-auto flex justify-center " >or</button>
            </div>
            <form autoComplete="off" className="space-y-4" onSubmit={formSubmit} >
            <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
             {error ? ( <p className='text-center text-3xl font-medium px-4 py-2 h-12 bg-slate-100 text-red-500 rounded-lg ' > {error}  </p> ) : null}
              </div>
              <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              <Input type='text' name='email' placeholder='Email' value={email} change={change} />
              </div>
              <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto relative ">
              <Input type={showPassword? 'password' : 'text'} name='password' placeholder='Password' value={password} change={change} />
              {
                showPassword ? (<AiOutlineEyeInvisible className="text-3xl absolute top-4 right-2 " onClick={eyeShow} />) : (<AiOutlineEye className="text-3xl absolute top-4 right-2 " onClick ={eyeShow} />)
              }
              </div>
              <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
              <button className="w-full p-4 bg-red-700 text-white text-3xl ">Login</button>
              </div>
            </form>
            <div className="extra ">
              <p className="text-center text-2xl text-blue-600 capitalize " >Forget password</p>
              <p className='text-center text-2xl capitalize '> If you are new? <Link to='/register' className=" text-red-700  underline my-3 font-semibold " >Create an account</Link></p>
            </div>
          </div>
      </div>
    </>
  );
};

export default Login;
