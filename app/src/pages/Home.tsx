import './Home.css'
import flash from "../assets/csgo_flash.webp"
import nade from "../assets/csgo_nade.webp"
import smoke from "../assets/csgo_smoke.webp"
import mirage from "../assets/mirage.jpg"
import inferno from "../assets/inferno.jpg"
import overpass from "../assets/overpass.jpg"
import { NavLink as Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <img src={flash} alt="flash" />
      <img src={nade} alt="nade" />
      <img src={smoke} alt="smoke" />
      <>
        <h1>CS Nades</h1>
        <p>Interactive database for Counter-Strike nades</p>
      </>
      <div>
        <p>Scroll for maps</p>
        <p>|</p>
        <p>V</p>
      </div>
    </div>
  )
}

function Maps() {
  return (
    <div className="maps">
      <section>
        <h1>Maps</h1>
        <ul>
          <figure>
            <Link to="/maps/mirage">
              <img src={mirage} alt="mirage" />
            </Link>
            <figcaption>
              <Link to="/maps/mirage">Mirage</Link>
            </figcaption>
          </figure>
          <figure>
            <Link to="/maps/inferno">
              <img src={inferno} alt="inferno" />
            </Link>
            <figcaption>
              <Link to="/maps/inferno">Inferno</Link>
            </figcaption>
          </figure>
          <figure>
            <Link to="/maps/overpass">
              <img src={overpass} alt="overpass" />
            </Link>
            <figcaption>
              <Link to="/maps/overpass">Overpass</Link>
            </figcaption>
          </figure>
        </ul>
      </section>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <Header />
      <Maps />
    </div>
  )
}

export default Home
