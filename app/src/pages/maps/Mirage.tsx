import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import React from "react";
import "./Mirage.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const smoke = new Icon({
  iconUrl: "../../../assets/csgo_smoke.webp",
  iconSize: [70, 50]
});

const flash = new Icon({
  iconUrl: "../../../assets/csgo_flash.webp",
  iconSize: [65, 45]
});

const nade = new Icon({
  iconUrl: "../../../assets/csgo_nade.webp",
  iconSize: [85, 60]
});

const ICONS = {
  "smoke": smoke,
  "flash": flash,
  "nade": nade
}

const MAP = {
  "market-door": [42,-117.5],
  "apartments": [74,25],
  "triple": [-65,0],
  "window": [17,-37],
  "a-ramp": [-45,73],
  "jungle": [-37,-25],
  "palace": [-67,51],
  "market": [23,-94],
  "connector": [0,0],
  "mid-boxes": [14,78],
  "under-palace": [-63,49],
  "top-mid": [30,50],
  "t-spawn": [45,136],
  "ct": [-72,-18],
  "t-ramp": [-20,100]
}

// 300x160
function Map({ markers }) {
  function renderMarkers() {
    let counter = 0;
    return markers.map((el: { map: string; destination: string; type: string; embed: string; }) =>
      <Marker key={counter++} position={MAP[el.destination as keyof typeof MAP]} icon={ICONS[el.type as keyof typeof ICONS]}>
        <Link to="/">
          <Popup className="popup">
            <iframe
              src={`https://www.youtube.com/embed/${el.embed}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Popup>
        </Link>
      </Marker>
    )
  }
  return (
    <>
      <MapContainer
        className="map"
        center={[0, 0]}
        zoom={1.5}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; Valve'
          url={"../../../Mirage/{z}/{x}/{y}.png"}
        />
        {renderMarkers()}
      </MapContainer>
    </>
  );
}

function Filters({ setType }) {
  return (
    <div className="filters">
      <div className="nade-filters">
        <img src="../../../assets/csgo_flash.webp" alt="flash" onClick={() => setType("flash")} />
        <img src="../../../assets/csgo_nade.webp" alt="nade" onClick={() => setType("nade")} />
        <img src="../../../assets/csgo_smoke.webp" alt="smoke" onClick={() => setType("smoke")} />
      </div>
    </div>
  )
}

function Mirage() {
  const [type, setType] = React.useState("smoke");
  const [markers, setMarkers] = React.useState([]);
  const baseUrl: string = "http://localhost:1236";

  React.useEffect(() => {
    console.log(type);
    async function fetchData() {
      const data = await fetch(`${baseUrl}/nades?map=mirage&type=${type}`).then(res => res.json());
      console.log(data);
      setMarkers(data);
    }
    fetchData();
  }, [type]);

  return (
    <div className="mirage">
      <Filters setType={setType} />
      <Map markers={markers} />
    </div>
  );
}

export default Mirage;
