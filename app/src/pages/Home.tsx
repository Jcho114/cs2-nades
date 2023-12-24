import './Home.css'
import { NavLink as Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <img src="../../assets/csgo_flash.webp" alt="flash" />
      <img src="../../assets/csgo_nade.webp" alt="nade" />
      <img src="../../assets/csgo_smoke.webp" alt="smoke" />
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
              <img src="../../assets/mirage.jpg" alt="mirage" />
            </Link>
            <figcaption>
              <Link to="/maps/mirage">Mirage</Link>
            </figcaption>
          </figure>
          <figure>
            <Link to="/maps/inferno">
              <img src="../../assets/inferno.jpg" alt="inferno" />
            </Link>
            <figcaption>
              <Link to="/maps/inferno">Inferno</Link>
            </figcaption>
          </figure>
          <figure>
            <Link to="/maps/overpass">
              <img src="../../assets/overpass.jpg" alt="overpass" />
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
