import axios from "axios";
import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import env from "../components/env";
import Input from "../components/Input";
import RegisterVerify from "../components/RegisterVerify";
const Register = () => {
  const navigate = useNavigate();
  const [showVerify, setShowVerify] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    code: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const eyeShow = () => {
    setShowPassword(!showPassword);
  };
  const change = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("api/v1/user/register", {name,email,password,cpassword});
    if (res.data.message) {
      setError(res.data.message);
    } else {
      setError("");
    }
    if (res.status === 201) {
      setShowVerify(true);
    }
  };
  const responseGoogle = async ({ profileObj }) => {
    const { name, email, googleId, imageUrl } = profileObj;
    const res = await axios.post(
      "/api/v1/user/auth/google",
      { name, email, googleId, imageUrl },
      { withCredentials: "true" }
    );
    if(res.status === 200){
      setTimeout(() => {
        window.location.href = "/"
      }, 3000);
    }
    const bg = res.status === 200 ? '#22b33c' : 'red'
    toast(res.data.message, {
      duration: 3000,
      position: 'top-center',
      // Styling
      style: {width:'200px',background:`${bg}`,color:'white',fontSize:'2rem'},
      className: '',
      // Custom Icon
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

  };
  const failureGoogle = (response) => {
    console.log(response);
  };
  const verify = async ()  =>{
    const res = await axios.post('api/v1/user/registerVerification',{code},{withCredentials:true})
    if(res.status === 201){
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    }
    const bg = res.status === 200 ?  'red' :'#22b33c'
    toast(res.data.message, {
      duration: 3000,
      position: 'top-center',
      // Styling
      style: {width:'200px',background:`${bg}`,color:'white',fontSize:'2rem'},
      className: '',
      // Custom Icon
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

  }
  const { name, email, password, cpassword ,code} = value;
  return (
    <>
      <div className="container mx-auto  ">
        <div className="login-wrapper px-10 mt-12 space-y-4 ">
          <div className="login-header ">
            <h1 className="text-center text-5xl font-semibold text-red-900 ">
              Register
            </h1>
          </div>
          <div className="google text-center ">
            <GoogleLogin
              className="google-btn "
              clientId={env.GOOGLE_ID}
              buttonText="Continue with google"
              onSuccess={responseGoogle}
              onFailure={failureGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div className="or">
            <button className="uppercase border rounded-full p-4 text-2xl mx-auto flex justify-center ">
              or
            </button>
          </div>
          <form autoComplete="off" className="space-y-4" onSubmit={formSubmit}>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              {error ? (
                <p className="text-center text-3xl font-medium px-4 py-2 h-12 bg-slate-100 text-red-500 rounded-lg ">
                  {error}
                </p>
              ) : null}
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              <Input
                type="text"
                name="name"
                placeholder="Fullname"
                value={name}
                change={change}
              />
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                change={change}
              />
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto relative ">
              <Input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={password}
                change={change}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-3xl absolute top-4 right-2 "
                  onClick={eyeShow}
                />
              ) : (
                <AiOutlineEye
                  className="text-3xl absolute top-4 right-2 "
                  onClick={eyeShow}
                />
              )}
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto relative ">
              <Input
                type={showPassword ? "password" : "text"}
                name="cpassword"
                placeholder="Confirm Password"
                value={cpassword}
                change={change}
              />
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-3xl absolute top-4 right-2 "
                  onClick={eyeShow}
                />
              ) : (
                <AiOutlineEye
                  className="text-3xl absolute top-4 right-2 "
                  onClick={eyeShow}
                />
              )}
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
              <button className="w-full p-4 bg-red-700 text-white text-3xl focus:bg-rose-800 ">
                Register
              </button>
            </div>
          </form>
            {showVerify ? <RegisterVerify Input={Input} code={code} change={change} onClick={verify} /> : null}
          <div className="extra">
            <p className="text-center text-2xl capitalize ">
              you have already a account?
              <Link
                to="/login"
                className=" text-red-700  underline my-3 font-semibold "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
