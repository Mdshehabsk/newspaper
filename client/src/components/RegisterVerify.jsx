import React from 'react'

const RegisterVerify = ({Input,code,change,onClick}) => {
  return (
    <>
    <div className="input-field w-10/12 sm:w-6/12 md:4/12 mx-auto ">
              <Input
                type="text"
                name="code"
                placeholder="Verification code"
                value={code}
                change={change}
              />
            </div>
            <div className="input-field w-10/12 sm:w-6/12 md:4/12  mx-auto ">
              <button className="w-full p-4 bg-green-700 text-white text-3xl focus:bg-rose-800 " onClick={onClick} >
                Verify
              </button>
            </div>
    </>
  )
}

export default RegisterVerify