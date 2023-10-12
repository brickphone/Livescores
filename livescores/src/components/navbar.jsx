import { useEffect, useRef, useState } from "react";
import { FaBars } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { Drawer } from "@mui/material";
import Switch from '@mui/material/Switch';
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // outside click reference point
  const navigate = useNavigate();
  const { token } = useAuth();

  const toggleSidebar = (event) => {
    event.stopPropagation(); // prevent sidebar from not opening
    console.log("opening sidebar")
    setIsOpen(!isOpen);
  }

  const closeSidebar = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
      console.log("closing sidebar");
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeSidebar);

    return () => {
      document.removeEventListener("click", closeSidebar)
    };
  }, []);

  const sidebarStyle = {
    width: "300px",
    height: "100vh", 
    position: "fixed",
    borderRadius: isOpen ? "0 20px 20px 0" : "0",
    top: 0,
    left: isOpen ? 0 : -300,
    backgroundColor: "#f1f5f9",
    overflowX: "hidden",
    transition: "all 0.3s",
    zIndex: 1,
    boxShadow: isOpen ? "-10px 0px 10px rgba(0, 0, 0, 0.2)" : "none",
  };
  
  const drawer = (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <div style={sidebarStyle} ref={sidebarRef}>
        <div className="sidebar-content flex flex-row justify-center pt-4 pl-56 ">
          <GrClose onClick={toggleSidebar} className="close-button text-xl"></GrClose>
        </div>
        <ul className="flex flex-col pt-4 pl-4">
          <div className="flex items-center" id="list-item">
            <MdOutlineDarkMode className="text-xl"/>
            <h1 className="pl-1">Dark mode</h1>
            <Switch />
          </div>
          <div className="flex items-center" id="list-item">
            <AiOutlineQuestionCircle className="text-xl" />
            <h1 className="pl-2">FAQ</h1>
          </div>
        </ul>
      </div>
    </Drawer>
  );

  return (
    <nav className="bg-white sticky top-0 navbar-container">
      {drawer}
      <div className="flex custom-padding padding-left justify-between space-x-1 items-center">
        <div className="sidebar-button-container">
          <FaBars className="sidebar-button text-xl" onClick={toggleSidebar} />
        </div>
        <div className="name-container flex pl-6">
          <h1 className="font-bold text-xl">LIVESCORE</h1>
          <span id="football-emoji">⚽</span>
        </div>
        <div className="flex">
          {!token ? (
            <button onClick={() => {navigate("/signup")}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Sign Up</button>

            ) : <button onClick={() => {navigate("/logout")}} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log Out</button>
          }
        </div>
      </div>

      <div className="navbar-line mt-3"></div>
    </nav>
  );
}

export default Navbar;
