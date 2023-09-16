import Navsvg from "../assets/navsvg";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <main>
      <div className="flex custom-padding padding-left space-x-1">
        <Navsvg onClick={toggleSidebar} />
        <h1 className="font-bold">LIVESCORE</h1>
        <span id="football-emoji">⚽</span>
      </div>
      <div className={`navbar-line mt-3 ${isOpen ? 'open' : ''}`}>
        {/* Content of your sidebar */}
        {isOpen && (
          <div className="sidebar-content">
            {/* Add your sidebar content here */}
          </div>
        )}
      </div>
    </main>
  );
}

export default Navbar;
