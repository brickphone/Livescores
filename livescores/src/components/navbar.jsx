import { useEffect, useRef, useState } from "react";
import { FaBars } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null) // outside click reference point

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
    height: "100%", 
    position: "fixed",
    borderRadius: isOpen ? "0 20px 20px 0" : "0",
    top: 0,
    left: isOpen ? 0 : -300,
    backgroundColor: "#f1f5f9",
    overflowX: "hidden",
    transition: "all 1s ease-out",
    zIndex: 1,
  };

  // make the body appear "blurry"
  const overlayStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 2,
    
  }

  return (
    <main>
      <div style={overlayStyle}>
        <div className={"top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300"} ref={sidebarRef}>
        {isOpen && (
          <div className="sidebar-content flex flex-row">
            <ul>
              <GrClose className=""></GrClose>
            </ul>
          </div>
        )}
      </div>
    </div>
      
      <div className="flex custom-padding padding-left space-x-1 items-center">
        <div className="sidebar-button-container">
          <FaBars className="sidebar-button text-xl" onClick={toggleSidebar} />
        </div>
        <h1 className="font-bold text-xl">LIVESCORE</h1>
        <span id="football-emoji">⚽</span>
      </div>
      <div className="navbar-line mt-3">
      </div>
    </main>
  );
}

export default Navbar;
