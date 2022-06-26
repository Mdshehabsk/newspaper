import React from "react";
import img from '../img/img.jpg'
const Item = ( {title,description,image,unique} ) => {

  return (
    <>
      <div className="item  max-h-[40rem] py-2 px-4 flex flex-col justify-center shadow-lg overflow-y-hidden cursor-pointer ">
          <img src={image ? `/post/${image}`: img} alt="" className="h-2/4 w-full object-cover " />
          <div className="title mt-2 ">
              <h2 className="text-3xl font-bold" > {title.substring(0,50)}... </h2>
          </div>
          <div className="description">
              <h3 className="text-2xl font-medium" > {description.substring(0,100)}... </h3>
          </div>
          <div className="time mt-4 text-xl ">
            ১ ঘন্টা আগে
          </div>
      </div>
    </>
  );
};

export default Item;
