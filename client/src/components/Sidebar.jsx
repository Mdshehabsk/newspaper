import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({show}) => {
  return (
    <>
      <section className={`sidebar mt-4 ${show} transition absolute bg-white z-10 `}>
        <div className="contianer mx-auto px-10 ">
          <div className="sidebar-wrapper columns-2  sm:max-w-3xl  px-4 py-8 ">
            <ul>
              <li>
                <a>প্রচ্ছদ</a>
              </li>

              <li>
                <a>বিশেষ সংবাদ</a>
              </li>

              <li>
                <a>রাজনীতি</a>
              </li>

              <li>
                <a>বিশ্ব</a>
              </li>

              <li>
                <a>মতামত</a>
              </li>

              <li>
                <a>বিনোদন</a>
              </li>
              <li>
                <a>জীবনযাপন</a>
              </li>
              <li>
                <a>ফিচার</a>
              </li>
              <li>
                <a>ধর্ম</a>
              </li>
              <li>
                <a>ই-পেপার</a>
              </li>
            </ul>
            <ul >
              <li>
                <a>সর্বশেষ সংবাদ</a>
              </li>
              <li>
                <a>করোনাভাইরাস</a>
              </li>
              <li>
                <a>বাংলাদেশ</a>
              </li>
              <li>
                <a>বানিজ্য</a>
              </li>
              <li>
                <a>খেলা</a>
              </li>
              <li>
                <a>লাইফস্টাইল</a>
              </li>
              <li>
                <a>স্বাস্থ্য</a>
              </li>
              <li>
                <a>শিক্ষা</a>
              </li>
              <li>
                <a>ছবি</a>
              </li>
              <li>
                <a>চাকরি</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
