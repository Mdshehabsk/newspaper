import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input";
import RecoverPassword from "../../components/RecoverPassword";
const ForgetPassword = () => {
  const navigate = useNavigate()
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState({
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
    const res = await axios.post("api/v1/user/forgetPassword", {email}, {withCredentials: true});
    if (res.data.message) {
      setError(res.data.message);
    } else {
      setError("");
    }
    if (res.status === 201) {
      setShowRecoverPassword(true);
    }
  };
  const resetPassword = async () => {
    const res = await axios.post("api/v1/user/resetpassword", {password,cpassword,code},{withCredentials:true});
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

  };
  const { email, password, cpassword, code } = value;
  return (
    <>
      <div className="container mx-auto  ">
        <div className="login-wrapper px-10 mt-12 space-y-4 ">
          <div className="login-header ">
            <h1 className="text-center text-5xl font-semibold text-red-900 my-12 ">
              Recover your password
            </h1>
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
                name="email"
                placeholder="Enter your Email"
                value={email}
                change={change}
              />
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
              <button className="w-full p-4 bg-red-700 text-white text-3xl ">
                Submit
              </button>
            </div>
            <div className="extra input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              <Link to="/login" className="max-w-full">
                <p className="text-center text-2xl text-rose-800 capitalize  ">
                  Back login page
                </p>
              </Link>
            </div>
          </form>
          {/* {Input,code,change,showPassword,AiOutlineEyeInvisible,AiOutlineEye,password,cpassword,eyeShow} */}
          {showRecoverPassword ? (
            <RecoverPassword
              Input={Input}
              code={code}
              change={change}
              showPassword={showPassword}
              AiOutlineEyeInvisible={AiOutlineEyeInvisible}
              AiOutlineEye={AiOutlineEye}
              password={password}
              cpassword={cpassword}
              eyeShow={eyeShow}
              onClick={resetPassword}
            />
          ) : null}
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default ForgetPassword;
