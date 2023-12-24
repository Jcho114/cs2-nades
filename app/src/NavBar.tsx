import './NavBar.css'
import { NavLink as Link } from "react-router-dom"

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default NavBar;