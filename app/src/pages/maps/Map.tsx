import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const ICONS = {
  "smoke": new Icon({
    iconUrl: "../../../assets/csgo_smoke.webp",
    iconSize: [70, 50]
  }),
  "flash": new Icon({
    iconUrl: "../../../assets/csgo_flash.webp",
    iconSize: [65, 45]
  }),
  "nade": new Icon({
    iconUrl: "../../../assets/csgo_nade.webp",
    iconSize: [85, 60]
  })
}

function MiniMap({ map, mapping, markers }: {map: string, mapping: { [key: string]: number[] }, markers: { map: string; destination: string; type: string; embed: string; }[]}) {
  function renderMarkers() {
    let counter = 0, positions;
    return markers.map(
      (el: { map: string; destination: string; type: string; embed: string; }) => {
        positions = mapping[el.destination as keyof typeof mapping];
        return (
          <Marker
            key={counter++}
            position={[positions[0], positions[1]]}
            icon={ICONS[el.type as keyof typeof ICONS]}
          >
            <Popup className="popup">
              <iframe
                src={`https://www.youtube.com/embed/${el.embed}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </Popup>
          </Marker>
        );
      }
    );
  }
  return (
    <>
      <MapContainer
        className="minimap"
        center={[0, 0]}
        zoom={1.5}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; Valve'
          url={`../../../${map}/{z}/{x}/{y}.png`}
        />
        {renderMarkers()}
      </MapContainer>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Filters({ setType }: any) {
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

// Add it so that you store each coordinate as a list then use some sort of mini carousel
// current thought process is this (getting a little technical since I thought you might like to hear it)
// going to store destinations by name, but locations by coordinates
// when I click a destination, I will then get to see the locations, and choose one of those locations to get an embedded video
// this will help with duplicate nades without cluttering too much
function Map({ map, mapping }: {map: string, mapping: { [key: string]: number[] }}) {
  const [type, setType] = React.useState<string>("smoke");
  const [markers, setMarkers] = React.useState([]);
  const baseUrl: string = "http://localhost:1236";

  React.useEffect(() => {
    console.log(type);
    async function fetchData() {
      const data = await fetch(`${baseUrl}/nades?map=${map}&type=${type}`).then(res => res.json());
      console.log(data);
      setMarkers(data);
    }
    fetchData();
  }, [type, map]);

  return (
    <div className="map">
      <Filters setType={setType} />
      <MiniMap map={map} mapping={mapping} markers={markers} />
    </div>
  );
}

export default Map;