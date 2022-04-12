import React,{useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import {AiOutlineClose} from 'react-icons/ai'
import Sidebar from "./Sidebar";
import SearchBox from "./SearchBox";
const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const fontStyle = { fontSize: "2.5rem", cursor: "pointer" };
  const sidebarShow = () => {
    setShowSidebar(!showSidebar);
  };
  const searchShow = () => {
    setShowSearch(!showSearch);
  };
  return (
    <>
      <nav className="bg-slate-100 h-28 flex items-center ">
        <div className="container mx-8 md:mx-auto">
          <div className="nav-wrapper flex justify-between items-center w-full ">
            <div className="left flex relative ">
              {showSidebar ? (<AiOutlineClose style={fontStyle} onClick={sidebarShow} />) : (<AiOutlineMenu style={fontStyle} onClick={sidebarShow} />)}
              <FiSearch className="ml-8" style={fontStyle} onClick={searchShow} />
              {showSearch ? (<SearchBox />) : null}
            </div>
            <div className="middle">
              <h1 className="text-5xl font-bold text-rose-800"><Link to='/' >প্রথমসংবাদ</Link></h1>
            </div>
            <div className="right">
              <img className="w-16 h-16 rounded-full " src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
            </div>
          </div>
        </div>
      </nav>
      <Sidebar show={showSidebar ? "block" :'hidden' }/>
    </>
  );
};

export default Navbar;
