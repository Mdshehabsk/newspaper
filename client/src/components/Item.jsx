import React from "react";
import img from '../img/img.jpg'
const Item = ( {title,content,unique} ) => {
    const description = content
    const head = title
  return (
    <>
      <div className="item h-[40rem] p-8 flex flex-col justify-center shadow-lg overflow-y-hidden cursor-pointer ">
          <img src={img} alt="" className="h-2/4 w-full object-cover " />
          <div className="title mt-2 ">
              <h2 className="text-3xl font-bold" > {head.substring(1,50)}... </h2>
          </div>
          <div className="description">
              <h3 className="text-2xl font-medium" > {description.substring(1,100)}... </h3>
          </div>
          <div className="time mt-4 text-xl ">
            ১ ঘন্টা আগে
          </div>
      </div>
    </>
  );
};

export default Item;
