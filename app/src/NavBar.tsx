import './NavBar.css'
import { NavLink as Link } from "react-router-dom"

function NavBar() {
  return (
    <div className="navbar">
      <Link className="navbar-link" to="/">Home</Link>
      <Link className="navbar-link" to="/about">About</Link>
      <Link className="navbar-link" to="/add">Add</Link>
    </div>
  )
}

export default NavBar;