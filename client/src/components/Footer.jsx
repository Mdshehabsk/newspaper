/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {BsFacebook, BsInstagram, BsTwitter,BsYoutube} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import appstore from '../img/appstore.png'
import playstore from '../img/playstore.png'
const Footer = () => {
  return (
    <>
    <div className="w-full h-auto bg-slate-100 mt-80 ">
        <div className="container mx-auto px-8 ">
            <Link to='/' ><h1 className=' py-4 text-4xl text-rose-800 font-bold text-center md:text-left border-b-2 border-slate-400 ' > প্রথমসংবাদ </h1></Link>
            <ul className='flex justify-center md:items-center flex-wrap px-2 md:py-12 ' >
                <li className=' px-4 py-2 md:px-8 '>
                    <a href="" className='text-3xl font-medium' >প্রথমসংবাদ</a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' >বিজ্ঞাপন</a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' >সার্কুলেশন</a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' >নিতিমালা</a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' > মন্তব্যের নিতিমালা </a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' > গোপনিয়তা নিতিমালা </a>
                </li>
                <li className=' p-4 '>
                    <a href="" className='text-3xl font-medium' > যোগাযোগ </a>
                </li>
            </ul>
            <div className="footer-contact flex flex-wrap justify-between items-center border-y-2 border-slate-400 ">
                <div className="footer-contact-left flex flex-col items-center justify-center w-screen lg:w-1/2 py-8 ">
                    <h2 className='py-4 text-lg md:text-xl ' > আমাদের সঙ্গে থাকুন </h2>
                    <ul className='flex' >
                    <li className="px-6 list-none">
                        <BsFacebook className="text-3xl" />
                    </li>
                    <li className="px-6 list-none">
                    <BsTwitter className="text-3xl" />
                    </li>
                    <li className="px-6 list-none">
                    <BsInstagram className="text-3xl" />
                    </li>
                    <li className="px-6 list-none">
                    <BsYoutube className="text-3xl" />
                    </li>
                    </ul>
                </div>
                <div className="footer-contact-right flex flex-col md:justify-end items-center w-screen lg:w-1/2 ">
                    <h1 className='py-4 text-lg md:text-xl ' > মোবাইল অ্যাপস ডাউনলোড করুন </h1>
                    <ul className='flex items-center ' >
                        <li className="px-6 list-none">
                            <img src={playstore} alt="" className=' w-60 object-cover ' />
                        </li>
                        <li className="px-6 list-none">
                        <img src={appstore} alt="" className=' w-60 object-cover' />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer