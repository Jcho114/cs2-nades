import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const ICONS = {
  "smoke": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_smoke.webp",
    iconSize: [70, 50]
  }),
  "flash": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_flash.webp",
    iconSize: [65, 45]
  }),
  "nade": new Leaflet.Icon({
    iconUrl: "../../../assets/csgo_nade.webp",
    iconSize: [85, 60]
  })
}

// disable double clicking zoom
function MiniMap({ map, mapping }: {
  map: string;
  mapping: { [key: string]: number[] };
}) {
  const [state, flipState] = React.useState<boolean>(false);
  const [destination, setDestination] = React.useState<string>("");
  const [type, setType] = React.useState<string>("smoke");
  const [markers, setMarkers] = React.useState([]);
  const baseUrl: string = "http://localhost:1236";

  function renderMarkers() {
    let counter = 0,
      positions;
    const list = state ? markers.filter((el: { destination: string }) => el.destination === destination) : markers;
    return list.map(
      (el: {
        map: string;
        location: string;
        destination: string;
        type: string;
        embed: string;
      }) => {
        positions = mapping[state ? el.location as keyof typeof mapping : el.destination as keyof typeof mapping];
        return (
          <Marker
            key={counter++}
            position={[positions[0], positions[1]]}
            icon={!state ? ICONS[el.type as keyof typeof ICONS] : new Leaflet.Icon.Default()}
            eventHandlers={{
              click: () => {
                if (!state) {
                  setDestination(el.destination);
                  flipState(!state);
                }
              }
            }}
          >
            {
              state ?
                (
                  <Popup className="popup">
                    <iframe
                      src={`https://www.youtube.com/embed/${el.embed}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </Popup>
                ) : <></>
            }
          </Marker>
        );
      }
    );
  }

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${baseUrl}/nades?map=${map}&type=${type}`).then(res => res.json());
      setMarkers(data);
    }
    fetchData();
    flipState(false);
  }, [type, map]);

  const corner1 = Leaflet.latLng(-90, -170)
  const corner2 = Leaflet.latLng(90, 170)
  const bounds = Leaflet.latLngBounds(corner1, corner2)
  
  return (
    <div className="map">
      <div className="filters">
        <div className="nade-filters">
          <img src="../../../assets/csgo_flash.webp" alt="flash" onClick={() => setType("flash")} />
          <img src="../../../assets/csgo_nade.webp" alt="nade" onClick={() => setType("nade")} />
          <img src="../../../assets/csgo_smoke.webp" alt="smoke" onClick={() => setType("smoke")} />
        </div>
      </div>
      <MapContainer
        className="minimap"
        center={[0, 0]}
        zoom={1.78}
        zoomSnap={0.15}
        scrollWheelZoom={false}
        zoomControl={false}
        touchZoom={false}
        doubleClickZoom={false}
        maxBounds={bounds}
        boundsOptions={{padding: [50, 50]}}
        maxBoundsViscosity={1.0}
        dragging={false}
      >
        <TileLayer
          attribution="&copy; Valve"
          url={`../../../${map}/{z}/{x}/{y}.png`}
        />
        {renderMarkers()}
      </MapContainer>
      {state ? <div className="map-return" onClick={() => flipState(!state)}>
          Return
      </div> : <></>}
    </div>
  );
}

function Map({ map, mapping }: {map: string, mapping: { [key: string]: number[] }}) {
  return (
    <MiniMap map={map} mapping={mapping} />
  );
}

export default Map;