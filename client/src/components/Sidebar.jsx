import { Link } from "react-router-dom";
import { useState } from "react";
import LoadingBar from 'react-top-loading-bar'
const Sidebar = ({ show, dashboard }) => {
  const [progress, setProgress] = useState(0)
  return (
    <>
    <LoadingBar
        color='#f11946'
        height='3px'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <section
        className={`sidebar mt-4 ${show} transition absolute bg-white z-10 p-8 `}
      >
        <div className="contianer mx-auto px-10 ">
          <div className="sidebar-wrapper w-96 flex flex-wrap justify-between ">
            <ul className="w-44">
              <Link onClick={() => setProgress(100)} to="/">
                <li>
                  <a>প্রচ্ছদ</a>
                </li>
              </Link>

              <Link onClick={() => setProgress(100)} to="রাজনীতি">
                <li>
                  <a>রাজনীতি</a>
                </li>
              </Link>

              <Link onClick={() => setProgress(100)} to="বিশ্ব">
                <li>
                  <a>বিশ্ব</a>
                </li>
              </Link>

              <Link onClick={() => setProgress(100)} to="মতামত">
                <li>
                  <a>মতামত</a>
                </li>
              </Link>

              <Link onClick={() => setProgress(100)} to="বিনোদন">
                <li>
                  <a>বিনোদন</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to="জীবনযাপন">
                <li>
                  <a>জীবনযাপন</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to="ফিচার">
                <li>
                  <a>ফিচার</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to="ধর্ম">
                <li>
                  <a>ধর্ম</a>
                </li>
              </Link>
            </ul>
            <ul className="w-44">
              <Link onClick={() => setProgress(100)} to="করোনাভাইরাস">
                <li>
                  <a>করোনাভাইরাস</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to="বাংলাদেশ">
                <li>
                  <a>বাংলাদেশ</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='বানিজ্য' >
                <li>
                  <a>বানিজ্য</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='খেলা' >
                <li>
                  <a>খেলা</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='লাইফস্টাইল' >
                <li>
                  <a>লাইফস্টাইল</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='স্বাস্থ্য' >
                <li>
                  <a>স্বাস্থ্য</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='শিক্ষা' >
                <li>
                  <a>শিক্ষা</a>
                </li>
              </Link>
              <Link onClick={() => setProgress(100)} to='চাকরি' >
                <li>
                  <a>চাকরি</a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
