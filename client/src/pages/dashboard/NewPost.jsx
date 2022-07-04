import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Checkbox from "../../components/Checkbox";
const NewPost = () => {
  const [check,setCheck] = useState({
    checkedArr:[]
  })
  const [image, setImage] = useState(null);
  const [value, setValue] = useState({
    title: "",
    description: "",
  });
  const inputChange = async (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const checkboxChange = (e) => {
    const {value,checked} = e.target
    const {checkedArr} = check
    if(checked){
      setCheck({
        checkedArr :[...checkedArr,value]
      })
    }else{
      setCheck({
        checkedArr : checkedArr.filter(e=>e !== value)
      })
    }
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append('category',check.checkedArr)
    const res = await axios.post("/api/v1/post/news", formData, {
      withCredentials: true,
    });
    const bg = res.status === 200 ? "#22b33c" : "red";
    toast(res.data.message, {
      duration: 3000,
      position: "top-center",
      // Styling
      style: {
        width: "250px",
        background: `${bg}`,
        color: "white",
        fontSize: "2rem",
      },
      className: "",
      // Custom Icon
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };
  const { title, description } = value;
  return (
    <>
      <div className="container mx-auto  border-t border-slate-900 p-4">
        <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto  ">
          <form onSubmit={formSubmit}>
            <div className="input-field flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 my-8 ">
              <label htmlFor="title" className="text-3xl md:w-[15rem]">
                Title :
              </label>
              <input
                value={title}
                onChange={inputChange}
                type="text"
                name="title"
                id="title"
                placeholder="Post Ttile"
                className="p-4 border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 text-3xl w-full "
              />
            </div>
            <div className="input-field flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 my-8 ">
              <label htmlFor="description" className="text-3xl md:w-[15rem]">
                Description :
              </label>
              <textarea
                value={description}
                onChange={inputChange}
                type="text"
                name="description"
                id="description"
                placeholder="Post Description"
                className="p-4 border border-gray-400 outline-none focus:ring-1 focus:ring-gray-500 text-3xl w-full h-[20rem] "
              ></textarea>
            </div>
            <div className="input-field flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 my-8 ">
              <label htmlFor="image" className="text-3xl md:w-[15rem]">
                Image :
              </label>
              <input
                type="file"
                name="postImage"
                id="image"
                className="text-3xl"
                onChange={imageUpload}
              />
            </div>
            <div className="input-field flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 my-8 ">
              <label htmlFor="category" className="text-3xl md:w-[15rem]">
                Category :
              </label>
              <div className="flex flex-wrap space-x-4 w-full">
                <Checkbox name="রাজনীতি" change={checkboxChange}   />
                <Checkbox name="বিনোদন" change={checkboxChange}   />
                <Checkbox name="করোনাভাইরাস" change={checkboxChange}   />
                <Checkbox name="বাংলাদেশ" change={checkboxChange}   />
                <Checkbox name="বিশ্ব" change={checkboxChange}   />
                <Checkbox name="বানিজ্য" change={checkboxChange}   />
                <Checkbox name="মতামত" change={checkboxChange}   />
                <Checkbox name="খেলা" change={checkboxChange}   />
                <Checkbox name="লাইফস্টাইল" change={checkboxChange}   />
                <Checkbox name="জীবনযাপন" change={checkboxChange}   />
                <Checkbox name="স্বাস্থ্য" change={checkboxChange}   />
                <Checkbox name="ফিচার" change={checkboxChange}   />
                <Checkbox name="শিক্ষা" change={checkboxChange}   />
                <Checkbox name="চাকরি" change={checkboxChange}   />
              </div>
            </div>
            <div className="input-field flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 my-8 ">
              <input
                type="submit"
                value="Create"
                className="text-3xl text-slate-50 w-full py-6 bg-green-700 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default NewPost;
