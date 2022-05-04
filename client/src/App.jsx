import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllItems from "./pages/AllItems";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        {/* {user ? (
        ) : (
        )} */}
        {/* {user && <Route path="/profile" element={<Profile />} />}
        {!user && <Route path="/login" element={<Login />} />} */}
        <Route path="/register" element={<Register />} />
        <Route path="/allitems/:id" element={<AllItems />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
