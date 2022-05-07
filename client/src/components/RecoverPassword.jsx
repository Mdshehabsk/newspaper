import React from 'react'

const RecoverPassword = (props) => {
    const {Input,code,change,showPassword,AiOutlineEyeInvisible,AiOutlineEye,password,cpassword,eyeShow,onClick} = props
  return (
    <>
     <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
            <Input type='text' name='code' placeholder='Enter Verification code' value={code} change={change} />
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto relative ">
              <Input type={showPassword? 'password' : 'text'} name='password' placeholder='Password' value={password} change={change} />
              {
                showPassword ? (<AiOutlineEyeInvisible className="text-3xl absolute top-4 right-2 " onClick={eyeShow} />) : (<AiOutlineEye className="text-3xl absolute top-4 right-2 " onClick ={eyeShow} />)
              }
              </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto relative ">
              <Input type={showPassword? 'password' : 'text'} name='cpassword' placeholder='confirm Password' value={cpassword} change={change} />
              {
                showPassword ? (<AiOutlineEyeInvisible className="text-3xl absolute top-4 right-2 " onClick={eyeShow} />) : (<AiOutlineEye className="text-3xl absolute top-4 right-2 " onClick ={eyeShow} />)
              }
              </div>
              <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
              <button className="w-full p-4 bg-red-700 text-white text-3xl " onClick={onClick} >Update</button>
              </div>
    </>
  )
}

export default RecoverPassword