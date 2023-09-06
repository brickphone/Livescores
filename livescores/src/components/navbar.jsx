import Navsvg from "../assets/navsvg";


const Navbar = () => {
  return (
    <div className="flex custom-padding padding-left space-x-1">
      <Navsvg />
      <h1 className="font-bold">LIVESCORE</h1>
    </div>
  )
}

export default Navbar;