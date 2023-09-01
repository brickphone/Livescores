import Navsvg from "../assets/navsvg";


const Navbar = () => {
  return (
    <navbar className="flex custom-padding padding-left space-x-1">
      <Navsvg />
      <h1 className="font-bold">LIVESCORE</h1>
    </navbar>
  )
}

export default Navbar;