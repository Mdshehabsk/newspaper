import React,{useEffect,useState} from "react";
import moment from 'moment'
import 'moment/locale/bn-bd';
import {IoMdMore} from 'react-icons/io'
import { Link } from "react-router-dom";
// moment().locale('bn-bd')
import img from '../img/img.jpg'
import Modal from './Modal'
const Item = ( {title,description,image,unique,category,createdAt,_id,deletePost,admin} ) => {
  console.log(admin.admin)
 const [modalIsOpen,setModalIsOpen] = useState(false)
  return (
    <>

      <div className="item relative  h-[30rem] py-2 px-4 flex flex-col justify-center shadow-lg overflow-y-hidden cursor-pointer ">
         
          <Link  to={`/${category[Math.floor(Math.random() * category.length)]}/singlepost/${_id}`}  >
          <img src={image ? `${image[0]}`: img} alt="no image" className="h-2/4 w-full object-cover " />
          
          <div className="title mt-2 ">
              <h2 className="text-3xl font-bold" > {title.substring(0,50)}...</h2>
          </div>
          <div className="description">
              <h3 className="text-2xl font-medium" > {description.substring(0,100)}...</h3>
          </div>
          <div className="time mt-4 text-xl font-medium ">
            {moment(createdAt).fromNow()}
          </div>
          </Link>
          {
            admin.admin ? <IoMdMore className="text-4xl absolute right-0 bottom-4" onClick={()=>setModalIsOpen(true)} /> : null
          }
          <Modal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} postId={_id} deletePost={deletePost} > </Modal>
      </div>
    </>
  );
};

export default Item;
